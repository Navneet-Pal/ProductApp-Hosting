import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';


function Home({token,settoken}) {

    const [products,setProducts] = useState();
    console.log(process.env.REACT_APP_BASEURL)

    function buttonHandler(){

    }
    

      const getProducts = async () => {
        
        try {
          const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/get-all-products`);
          console.log('fetched all products successful:', response);
          const data = await response.data.data;
          setProducts(data);
          
        } catch (error) {
          console.error('Error during fetching products:', error);
        }
      };

      useEffect( ()=>{
        getProducts();
      },[])

      console.log(products)

  return (
    <div className='w-11/12 mx-auto'>
    {
      token !==null? (
        <div className="container mx-auto p-4 text-white ">
          <h2 className="text-4xl font-semibold mb-4 text-center text-black">PRODUCT LIST</h2>
          <table className="w-full">
            <thead className='font-bold text-lg'>
              <tr className="bg-[#bedaa1]">
                <th className="border border-[#0c0e27] p-2">Product ID</th>
                <th className="border border-[#0c0e27] p-2">Name</th>
                <th className="border border-[#0c0e27] p-2">Price</th>
                <th className="border border-[#0c0e27] p-2">Company</th>
              </tr>
            </thead>
            <tbody className='font-semibold text-md text-gray-100'>
              { !products ? (<div>NO DATA</div>):
              (products.map( (item,index)=> (
                <tr key={index}>
                  <td className="border border-[#0c0e27] p-2">{item.productID}</td>
                  <td className="border border-[#0c0e27] p-2">{item.name}</td>
                  <td className="border border-[#0c0e27] p-2">${item.price}</td>
                  <td className="border border-[#0c0e27] p-2">{item.company}</td>
                </tr>
              )))
                
              }
            </tbody>
          </table>
        </div>

      ):(
        <Link to={"/login"} className='flex justify-center mt-60'>
          <button className='bg-yellow-400 py-4 px-4 text-gray-100 font-semibold text-2xl rounded-xl mx-auto
          hover:scale-110 hover:bg-yellow-500'
          onClick={buttonHandler}>
          Click for Product List</button> 
        </Link>
      )
    }
    
    </div>
  )
}

export default Home