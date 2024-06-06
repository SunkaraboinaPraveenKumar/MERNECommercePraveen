import React, { useContext } from 'react'
import AppContext from '../../context/AppContext'
const Profile = () => {
    const {user}=useContext(AppContext);
  return (
    <>
    <div className="container text-center my-5">
        <h1 className='text-white'>Welcome, {user?.name}</h1>
        <h3 className='text-white'>{user?.email}</h3>
    </div>
    </>
  )
}

export default Profile