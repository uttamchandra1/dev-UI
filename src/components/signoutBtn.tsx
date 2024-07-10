"use client"
import React from 'react'
import { Button } from './ui/button'
import { signOut } from 'next-auth/react'
export default function SignoutBtn ()  {

    const logout = () => {
      signOut({callbackUrl:"/login" , redirect:true})
    }

  return (
    <div>
      <Button variant="destructive" onClick={logout}>SignOut</Button>
    </div>
  )
}

