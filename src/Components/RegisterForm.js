import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const userRkey = "user";
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate('/');
    }
  })

  const submitForm = async (data) => {
    // console.log(data);
    let result = await fetch("http://localhost:5000/signup", {
      method: "Post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    result = await result.json();
    // console.log(result);
    localStorage.setItem(userRkey, JSON.stringify(result.user));
    localStorage.setItem("token", JSON.stringify(result.auth));
    if (result) {
      navigate('/');
    }
  }

  return (
    <div className='register'>
      <h1>Register Form</h1>
      
      <form onSubmit={handleSubmit(submitForm)}>

        <div>
          <label>
            Name:
            <input className='inputBox' {...register("name")} type="text" name="name" placeholder="Full Name" />
          </label>
        </div>

        <div>
          <label>
            E-mail:
            <input className='inputBox' {...register("email")} type="email" name="email" placeholder="abc@xyz.com" />
          </label>
        </div>

        <div>
          <label>
            Password:
            <input className='inputBox' {...register("password")} type="password" name="password" placeholder="Password" />
          </label>
        </div>
        
          <input className='btnStyle' type="submit" value="Submit" />
          <input className='btnStyle' type="reset" value="Reset" />

      </form>
    </div>
  )
}

export default RegisterForm;