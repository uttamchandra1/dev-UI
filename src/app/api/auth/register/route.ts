import { NextRequest, NextResponse } from "next/server";

import vine, { errors } from '@vinejs/vine';
import { registerSchema } from "@/validator/authSchema";
import { CustomErrorReporter } from "@/validator/customErrorReporter";
import bcrypt from "bcryptjs";
import prisma from "@/db/db.config";

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        vine.errorReporter = () => new CustomErrorReporter()
        const validator = vine.compile(registerSchema);
        const validatedData = await validator.validate(data);

        // check if user already exist
        const user = await prisma.user.findUnique({
            where:{
                email:validatedData.email,

            },
        })

        if(user) {
            return NextResponse.json({status : 400 , errors:{
                email:"User already exist"
            }})
        }
        // Genrate salt
        const salt = bcrypt.genSaltSync(10)
        validatedData.password = bcrypt.hashSync(validatedData.password , salt)

        await prisma.user.create({
            data: validatedData
        })
        
        return NextResponse.json({ status: 200, data: validatedData })
    } catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            console.log(error.messages)

            return NextResponse.json({ status: 400, errors: error.messages });
        }
    }


}