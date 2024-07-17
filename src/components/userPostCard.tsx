import React from 'react'

const UserPostCard = ({post} : {post : PostType}) => {
  return (
    <div className='text-left'>
      <div className='w-[500px] h-[500px] shadow-md rounded-md'>
         <div className='p-5 flex justify-between flex-col'>
             <div>
                <h1 className='text-2xl font-bold'>{post.user.name}</h1>
                <p>{post.created_at}</p>
                
             </div>
             <img src={`http://localhost:3000/uploads/${post.image}`}
             width="50"
             height={50}
             className='w-full h-[300px] object-cover'
             alt='post Image'
             />
         </div>
      </div>
    </div>
  )
}

export default UserPostCard
