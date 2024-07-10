import { NextRequest, NextResponse } from "next/server";
import vine, { errors } from "@vinejs/vine";
import { CustomErrorReporter } from "@/validator/customErrorReporter";
import { loginSchema } from "@/validator/authSchema";
import prisma from "@/db/db.config";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {

    try {
        const data = await req.json()
        vine.errorReporter = () => new CustomErrorReporter()
        const validator = vine.compile(loginSchema);
        const validatedData = await validator.validate(data)

        const user:User |null = await prisma.user.findUnique({
            where : {
                email:validatedData.email
            }
        })

        if(user == null){
            return NextResponse.json({
                status : 400,
                errors: {
                    email: "No account found with this email."
                }
            })
        }

        const isPasswordMatch:boolean = bcrypt.compareSync(validatedData.password , user?.password!);
        if(isPasswordMatch){
            return NextResponse.json({status : 200 , message : "user logged in succesfully"})
        }
    } catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            console.log(error.messages)

            return NextResponse.json({ status: 400, errors: error.messages });
        }

        return NextResponse.json({status : 400 , message: "Invalid Credentials"})
    }


}