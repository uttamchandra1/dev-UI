
import AddPost from '@/components/AddPost';
import Navbar from '@/components/navbar';
import SignoutBtn from '@/components/signoutBtn';
import React from 'react'
import { authOptions, CustomSession } from '../api/auth/[...nextauth]/authOptions';
import { getServerSession } from 'next-auth';
import { headers } from 'next/headers';
import UserPostCard from '@/components/userPostCard';


async function getUserPosts() {
  const res = await fetch(`${process.env.APP_URL}/api/user/post`, {
    headers: headers()
  })

  if (!res.ok) {
    throw new Error("something went wrong")
  }

  const respone = await res.json()
  return respone?.data;

  
}



export default async function Profile() {
  const session: CustomSession | null = await getServerSession(authOptions);
  const posts = await getUserPosts();
  console.log(posts)

  return (
    <div>
      <Navbar />
      Hii , {session?.user?.name}
      <div>
        <AddPost user_id={session?.user?.id!} />
        <SignoutBtn />
      </div>
      <div className='flex justify-center items-center mt-10'>

        {Array.isArray(posts) ? (
          posts.map((item: PostType) => <UserPostCard post={item} key={item.id} />)
        ) : (
          <div>No posts</div>
        )}
      </div>
    </div>
  )
}


