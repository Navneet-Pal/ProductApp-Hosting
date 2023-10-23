import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AddProduct from './components/AddProduct';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { useState } from 'react';

function App() {

  const [token,settoken]= useState(function (){ return localStorage.getItem("token") ? localStorage.getItem("token") : null } );



  return (
    <div className="App min-w-screen min-h-screen overflow-x-hidden">
      
      <Navbar token={token} settoken={settoken} />

      <Routes>

        <Route path='/' element={<Home token={token} settoken={settoken} />} />
        <Route path='/addProduct' element={<AddProduct />}  />
        <Route path='/login' element={<Login token={token} settoken={settoken} />}  />
        <Route path='/signup' element={<SignUp token={token} settoken={settoken} />}  />
      
      </Routes>


    </div>
  );
}

export default App;
