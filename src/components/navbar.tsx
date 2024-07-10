"use client"

import React from 'react'
import Link from 'next/link'
import { Button } from './ui/button'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'

const Navbar = () => {
    const Pathame:String = usePathname()
    const {data : session , status} = useSession()
  return (
    <div className='flex justify-center items-center'>
      <Link href='/'><Button variant="link" className={`text-md lg:text-lg ${Pathame == "/" ? "font-bold" : ""}`}>Home</Button></Link>
      <Link href='/explore'><Button variant="link" className={`text-md lg:text-lg ${Pathame == "/explore" ? "font-bold" : ""}`}>Explore</Button></Link>
      {status == "authenticated" ? <Link href='/profile'><Button variant="link" className={`text-md lg:text-lg ${Pathame == "/profile" ? "font-bold" : ""}`}>Profile</Button></Link>
      
    : 
    <Link href='/login'><Button variant="link" className={`text-md lg:text-lg `}>Login</Button></Link>
    }
    </div>
  )
}

export default Navbar;
