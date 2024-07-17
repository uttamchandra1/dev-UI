import { postSchema } from "@/validator/postSchema";
import { NextRequest, NextResponse } from "next/server";
import vine, { errors } from "@vinejs/vine";
import { imagevalidator } from "@/validator/imageValidator";
import { CustomErrorReporter } from "@/validator/customErrorReporter";
import { join } from "path";
import { getRandomNumber } from "@/lib/utils";
import { writeFile } from "fs/promises";
import prisma from "@/db/db.config";
import { authOptions, CustomSession } from "../../auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";


export async function GET(request: NextRequest) {

    const session:CustomSession|null = await getServerSession(authOptions);

    if(!session){
        return NextResponse.json({
            status : 400 ,
            message : "Unauthorized Network call"
        })
    }

    const posts = await prisma.post.findMany({
        orderBy: {
            id: "desc"
        },
        include: {
            user: {
                select: {
                    name: true
                }
            }
        },

        where : {
            user_id : Number(session?.user?.id!),
        }
    })


    return NextResponse.json({
        status: 200, data: posts
    })
}

export async function POST(request: NextRequest) {

    try {
        const session:CustomSession|null = await getServerSession(authOptions);

    if(!session){
        return NextResponse.json({
            status : 400 ,
            message : "Unauthorized Network call"
        })
    }
    
        const formData = await request.formData();
        const file = formData.get("image") as Blob | null;

        const data = {
            title: formData.get("title"),
            description: formData.get("description"),
            image: file?.name,
            user_id: formData.get("user_id"),
        };



        // vine validation logic

        vine.errorReporter = () => new CustomErrorReporter();

        const validator = vine.compile(postSchema);
        const validateData = await validator.validate(data);
        const isImageNotValid: string | null = imagevalidator(file?.name, file?.size)

        if (isImageNotValid) {
            return NextResponse.json({
                status: 400,
                errors: {
                    image: isImageNotValid
                }
            })
        }


        // upload image 

        const buffer = Buffer.from(await file!.arrayBuffer());
        const relativeUploadDir = "/uploads"
        const uploadDir = join(process.cwd(), "public", relativeUploadDir)

        const uniqueName = Date.now() + "_" + getRandomNumber(1, 99999);
        const imgExt = file?.name.split(".")
        const filename = uniqueName + "." + imgExt?.[1]

        await writeFile(`${uploadDir}/${filename}`, buffer)

        await prisma.post.create({
            data: {
                title: validateData.title,
                description: validateData.description,
                user_id: Number(data.user_id),
                image: filename
            }
        })


        return NextResponse.json({ status: 200, message: "post Created Successfully" }, { status: 200 })
    } catch (error) {

        if (error instanceof errors.E_VALIDATION_ERROR) {
            console.log(error.messages)

            return NextResponse.json({ status: 400, errors: error.messages });
        }
    }
}