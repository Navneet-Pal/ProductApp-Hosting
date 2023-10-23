import React, { useState } from 'react'
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import '../App.css';

function AddProduct() {

    const [productData,setProductData] = useState({productID:'',name:'',price:'',featured:false,company:''});
    const navigate = useNavigate();

    function handleChange(e){
        e.preventDefault();
        const {name,value,type,checked} = e.target;
        setProductData({...productData, [name]:type === 'checkbox' ? checked : value})
    }

    function submitHandler(e){
        e.preventDefault();
        console.log("new product data" , productData);
        add();
        setProductData({productID:'',name:'',price:'',featured:false,company:''})
    }

    const add = async (e) => {
        
        try {
          const {productID,name,price,featured,company} = productData;
          const response = await axios.post(`${process.env.REACT_APP_BASEURL}/api/addProduct`,{productID,name,price,featured,company});
          console.log('product added successful:', response);
            toast.success("product added successfully")
          navigate("/");
        } catch (error) {
          console.error('Error during adding product:', error);
          toast.error("product not added")
        }
    }

  return (
    <div className='mt-20 w-11/12 mx-auto'>

        <div className="max-w-md mx-auto p-6 rounded-lg shadow-lg addpro">
            <h2 className="text-2xl font-semibold mb-4 text-center">ADD NEW PRODUCT</h2>

            <form onSubmit={submitHandler}>

                <div className="mb-4">
                    <label htmlFor="productID" className="block text-gray-600 font-semibold">Product ID</label>
                    <input
                    type="text"
                    id="productID"
                    name="productID"
                    value={productData.productID}
                    onChange={handleChange}
                    className="w-full p-2 border rounded bg-[#f5f4e8]"
                    required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-600 font-semibold">Name</label>
                    <input
                    type="text"
                    id="name"
                    name="name"
                    value={productData.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded bg-[#f5f4e8]"
                    required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="block text-gray-600 font-semibold">Price</label>
                    <input
                    type="number"
                    id="price"
                    name="price"
                    value={productData.price}
                    onChange={handleChange}
                    className="w-full p-2 border rounded bg-[#f5f4e8]"
                    required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="company" className="block text-gray-600 font-semibold">Company</label>
                    <input
                    type="company"
                    id="company"
                    name="company"
                    value={productData.company}
                    onChange={handleChange}
                    className="w-full p-2 border rounded bg-[#f5f4e8]"
                    
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="featured" className="block text-gray-600 font-semibold">
                    <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={productData.featured}
                    onChange={handleChange}
                    
                    />   Featured</label>
                    
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 hover:text-grey-500 font-bold text-lg"
                >
                    Add Product
                </button>

            </form>

        </div>
        
  
    
    
    
    </div>
  )
}

export default AddProduct