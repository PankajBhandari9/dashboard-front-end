import React from 'react'
import Footer from './Components/Footer';
import HeaderNav from './Components/HeaderNav';
import "./App.css";
import "./Components/FormStyle.css";
import { Routes, Route } from 'react-router-dom';
import RegisterForm from "./Components/RegisterForm";
import PrivateComponent from './Components/PrivateComponent';
import LoginForm from './Components/LoginForm';
import AddProduct from './Components/AddProduct';
import ProductList from './Components/ProductList';
import UpdateProduct from './Components/UpdateProduct';

const App = () => {
  return (
    <div className='wholeApp'>
      <HeaderNav />
      <Routes>

        <Route element={<PrivateComponent />}>

          <Route path='/' element={<ProductList/>} />
          <Route path='/add-product' element={<AddProduct/>} />
          <Route path='/update/:id' element={<UpdateProduct/>} />
          <Route path='/about' element={<h1>about</h1>} />
          <Route path='/profile' element={<h1>Your Profile</h1>} />
        </Route>
        
        <Route path='/signup' element={<RegisterForm />} />
        <Route path='/login' element={<LoginForm />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App;