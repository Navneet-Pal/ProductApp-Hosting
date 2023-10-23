import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, Navigate, useNavigate } from 'react-router-dom';

function Navbar({token,settoken}) {

  const navigate = useNavigate();
  console.log(token)

  function logoutHandler(){
    localStorage.removeItem("token");
    settoken(null);
    toast.success("logout")
    navigate('/login');
  }

  return (
    <div className='bg-[#101333] text-white py-3  ' >
    
      <div className='w-10/12 mx-auto flex justify-between cursor-pointer font-semibold text-lg items-center '>

        <Link to="/"><div className=' hover:text-yellow-400 hover:scale-110'>Home</div></Link>

        {token!==null && <Link to='/addProduct'><div className='hover:text-yellow-400 hover:scale-110'>Add Product</div></Link>}

        <div >
        {
          token !==null ? (
            <button className='border-2 px-2 py-1 border-sky-700 rounded-md hover:text-yellow-400 hover:scale-110'
            onClick={logoutHandler}>Log Out</button>
          ):(
            <div className='flex gap-4'>
              <Link to='/login'><button className='border-2 px-2 py-1 border-sky-700 rounded-md hover:text-yellow-400 hover:scale-110'>Login</button></Link>
              <Link to='/signup'><button className='border-2 px-2 py-1 border-sky-700 rounded-md hover:text-yellow-400 hover:scale-110'>Sign Up</button></Link>
            </div>
          )
        }
            

        </div>

        </div>
    </div>
  )
}

export default Navbar