import { useState } from "react";
import "./App.css";
import { SubmitHandler, useForm } from "react-hook-form";


type FormFields = {
  email: string,
  password: string
}

function App() {
  const { register, handleSubmit }  = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
  }

  return (
    <>
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Login Form</h2>
        <input {...register("email", {
          required: true
        })} type="text" name="email" id="email"/>
        <input {...register("password", {
          required: true
        })} type="password" name="password" id="password"/>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default App;
