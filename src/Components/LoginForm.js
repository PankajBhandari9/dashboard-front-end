import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';


const LoginForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const loginForm = async (data) => {
    let result = await fetch("http://localhost:5000/login", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data)
    });

    result= await result.json();
    // console.log(result);
    if(result.auth){
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth));
      navigate("/");
    }else{
      alert("Sorry type all the field correctly")
    }
  }

  return (
    <div className='register'>
      <h1>Login </h1>

      <form onSubmit={handleSubmit(loginForm)}>

        <label>
          E-mail:
          <input {...register("email")} type="email" className='inputBox' placeholder='abc@xyz.com' />
        </label>

        <label>
          Password:
          <input {...register("password")} type="password" className='inputBox' placeholder='Enter Password' />
        </label>

        <button className='btnStyle'>Log In</button>
      </form>
    </div>
  )
}

export default LoginForm;