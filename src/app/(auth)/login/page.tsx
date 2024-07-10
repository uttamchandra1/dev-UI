"use client"

import React from 'react'
import { Label } from "@/components/ui/label"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import axios from 'axios';
import { signIn } from 'next-auth/react';

const Login = () => {
    const [authState , setAuthState] = useState({
        email:"",
        password:""
    })

    const [errors , setErrors] = useState<AuthErrorType>({})

    const submit = () => {
        axios.post("/api/auth/login" ,authState)
        .then((res) => {
            const response = res.data
            if(response.status == 200){
                signIn("credentials" , {
                    email:authState.email,
                    password:authState.password,
                    callbackUrl:"/",
                    redirect:true
                })

            } else if(response.status == 400 ){
                setErrors(response.errors)
            }
        })
        .catch((err) => console.log("the error is :" , err))
    }
    return (
        <div className='h-[100vh]'>
            <div className='flex flex-col justify-center items-center h-full'>
                <div>
                    <Label htmlFor="email">Your email address</Label>
                    <Input placeholder='Enter your email' id='email' type='email' onChange={(e) => setAuthState({...authState , email:e.target.value })} />
                </div>

                <div>
                    <Label htmlFor="passworrd">Your password</Label>
                    <Input placeholder='Enter your password' id='password' type='password' onChange={(e) => setAuthState({...authState , password:e.target.value})} />
                </div>

                <div>
                    <Button onClick={submit}>Login</Button>
                </div>
            </div>
        </div>
    )
}

export default Login;
