import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';


const AddProduct = () => {

  const navigate = useNavigate();

  const userId = JSON.parse(localStorage.getItem("user"))._id;
  const { register, handleSubmit, formState: { errors } } = useForm();
  // console.log(userId);
  const addProductFun = async (data) => {
    let result = await fetch("http://localhost:5000/add-product", {
      method: "post",
      headers: {
        "Content-type": "application/json",
        authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
      },
      body: JSON.stringify({ ...data, userId })
    });

    result = await result.json();
    // console.log(result);
    navigate("/");

  }
  return (
    <div className='register'>
      <h1 className='headings'>Add Product</h1>

      <form onSubmit={handleSubmit(addProductFun)}>

        <div className='flexBox'>
          <label >
            Product Name:
            <input {...register("productName", { required: true })} className='inputBox' type="text" placeholder='Enter Product Name' />
          </label>
          <div className='errorsArea'>
            {errors.productName && <p>**Product Name is required**</p>}
          </div>
        </div>

        <div className='flexBox'>
          <label >
            Product Price:
            <input {...register("productPrice", { required: true })} className='inputBox' type="number" placeholder='Enter Product Price' />
          </label>
          <div className='errorsArea'>
            {errors.productPrice && <p>**Product Price is required</p>}
          </div>

        </div>

        <div className='flexBox'>
          <label >
            Product Catagory:
            <input {...register("productCatagory", { required: true })} className='inputBox' type="text" placeholder='Enter Product Catagory Eg: Mobile, Laptop Etc' />
          </label>
          <div className='errorsArea'>
            {errors.productCatagory && <p>**Product Catagory is required</p>}
          </div>
        </div>

        <div className='flexBox'>

          <label >
            Product Company:
            <input {...register("productCompany", { required: true })} className='inputBox' type="text" placeholder='Enter Product Company' />
          </label>
          <div className='errorsArea'>
            {errors.productCompany && <p>**Product Company is required</p>}
          </div>
        </div>

        <button className='btnStyle'>Add Product</button>
      </form>

    </div>
  )
}

export default AddProduct;