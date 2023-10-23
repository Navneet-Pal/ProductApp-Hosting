import {React,useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import '../App.css';

function SignUp({token,settoken}) {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
      });
    
      function handleChange(e){
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    
      function handleSubmit(e){
        e.preventDefault();
        console.log('Form data submitted:', formData);
        signupData();
        
        setFormData({name:"", email:'',password:''} );
      }

      const signupData = async (e) => {
        
        try {
          const {name,email,password} = formData;
          const response = await axios.post(`${process.env.REACT_APP_BASEURL}/api/signup`,{name,email,password});
          
          localStorage.setItem("token",JSON.stringify(response.data.token) )
          settoken(localStorage.getItem("token") ? (localStorage.getItem("token")) : (null))
          toast.success("signed up successfully")
          navigate('/')

        } catch (error) {
          console.error('Error during signup:', error);
          toast.error("problem occured")
        }
      };

     

  return (
    <div className='mt-32 w-11/12 mx-auto'>
    
        <div className="max-w-md mx-auto p-6 rounded-lg shadow-lg addpro">
            <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>
            <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-600 font-semibold">Name</label>
                <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-[#f5f4e8]"
                required
                />
            </div>
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
                className="w-full py-2 px-4 bg-red-400 text-white rounded hover:bg-red-500 font-bold text-lg"
            >
                Sign Up
            </button>
            </form>
        </div>
    
    
    </div>
  )
}

export default SignUp