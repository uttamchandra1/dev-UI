
import AddPost from '@/components/AddPost';
import Navbar from '@/components/navbar';
import SignoutBtn from '@/components/signoutBtn';
import React from 'react'

const Profile = () => {
  return (
    <div>
        <Navbar/>
      Profile
      <div>
      <AddPost/>
      <SignoutBtn/>
      </div>
    </div>
  )
}

export default Profile;
