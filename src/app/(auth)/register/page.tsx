"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import { useState } from 'react'
import { useRouter } from 'next/navigation';
const Register = () => {
    const router = useRouter()
    const [authState , setAuthState] = useState({
        name:"",
        email:"",
        password:"",
        password_confirmation:""
    })
    const [errors , setErrors] = useState<AuthErrorType>({})

    const submit = () => {
        axios.post("/api/auth/register" , authState)
        .then((res) => {
            const response = res.data;
            if (response.status == 200){
                router.push(`/login?message=${response.message}`)
            } else if (response.status == 400){
                setErrors(response.errors)
            }
        })
        .catch((err) => console.log("the error is :" , err))
    }
    return (
        <div className='h-[100vh]'>
            <div className='flex flex-col justify-center items-center h-full'>
            <div>
                    <Label htmlFor="Name">Name</Label>
                    <Input placeholder='Enter your email' id='name' type='text' onChange={(e) => setAuthState({...authState , name:e.target.value })} />
                    <span className='text-red-400 font-bold'>{errors.name}</span>
                </div>
                <div>
                    <Label htmlFor="email">Your email address</Label>
                    <Input placeholder='Enter your email' id='email' type='email' onChange={(e) => setAuthState({...authState , email:e.target.value })} />
                    <span className='text-red-400 font-bold'>{errors.email}</span>
                </div>

                <div>
                    <Label htmlFor="passworrd">Your password</Label>
                    <Input placeholder='Enter your password' id='password' type='password' onChange={(e) => setAuthState({...authState , password:e.target.value})} />
                    <span className='text-red-400 font-bold'>{errors.password}</span>
                </div>

                <div>
                    <Label htmlFor="confirm password">Password Confirmation</Label>
                    <Input placeholder='Enter your confirm password' id='confirmpassword' type='password' onChange={(e) => setAuthState({...authState , password_confirmation:e.target.value})} />
                </div>

                <div>
                    <Button onClick={submit}>Register</Button>
                </div>
            </div>
        </div>
    )
}

export default Register;
