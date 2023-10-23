import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import '../App.css';

function Login({token,settoken}) {

  const navigate= useNavigate();

  const [formData,setFromData] = useState({ email:'', password:''});

  function handleChange(e){
    e.preventDefault();
    const {name,value} = e.target;
    setFromData({...formData,
        [name]:value 
    });
  }

  function handleSubmit(e){
    e.preventDefault();

    loginData();
    
    setFromData({email:'',password:''})
  }

  const loginData = async (e) => {
        
    try {
      const {email,password} = formData;
      const response = await axios.post(`${process.env.REACT_APP_BASEURL}/api/login`,{email,password});
      console.log('login successful:', response);
      
      localStorage.setItem("token",JSON.stringify(response.data.token) )
      settoken(localStorage.getItem("token") ? (localStorage.getItem("token")) : (null))
      toast.success("logged in successfully")
      navigate('/')

    } catch (error) {
      console.error('Error during login:', error);
      toast.error("error while login")
    }
  };


  return (
    <div className='mt-32 w-11/12 mx-auto'>
    
        <div className="max-w-md mx-auto p-6 rounded-lg shadow-lg addpro">

            <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>

            <form onSubmit={handleSubmit}>
            
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-600 font-semibold">Email</label>
                    <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded bg-[#f5f4e8]"
                    required
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-600 font-semibold">Password</label>
                    <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-2 border rounded bg-[#f5f4e8]"
                    required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-yellow-500 text-white rounded hover:bg-yellow-600 font-bold text-lg"
                >
                    Login
                </button>
            
            </form>
        </div>
    
    
    </div>
  )
}

export default Login