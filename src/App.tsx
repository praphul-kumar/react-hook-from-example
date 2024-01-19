import { useState } from "react";
import "./App.css";
import { SubmitHandler, useForm } from "react-hook-form";


type FormFields = {
  email: string,
  password: string
}

function App() {
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } }  = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      
      await new Promise((resolve) => { setTimeout(resolve, 1000); });
      throw new Error("Something went wrong");

      console.log(data);
    } catch(error) {
      setError("root", {
        message: "This email is already taken"
      });
    }
  }

  return (
    <>
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Login Form</h2>
        <input {...register("email", {
          required: "Email is required",
          validate: (value) => {
            if (!value.includes('@')) {
              return "Email must contain @.";
            }

            return true;
          },
        })} type="text" name="email" id="email"/>
        {errors.email && <span className="text-red">{errors.email.message}</span>}

        <input {...register("password", {
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must contain 8 letters"
          }
        })} type="password" name="password" id="password"/>
        {errors.password && <span className="text-red">{errors.password.message}</span>}

        <button disabled={isSubmitting} type="submit">{isSubmitting ? 'Submiting...': 'Submit'}</button>

        {errors.root && <span className="text-red">{errors.root.message}</span>}
      </form>
    </>
  );
}

export default App;
