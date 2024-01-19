import { useState } from "react";
import "./App.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

type FormFields = z.infer<typeof schema>;

function App() {
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } }  = useForm<FormFields>({
    defaultValues: {
      email: "test@gmail.com"
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      
      await new Promise((resolve) => { setTimeout(resolve, 1000); });

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
        <input {...register("email")} type="text" name="email" id="email"/>
        {errors.email && <span className="text-red">{errors.email.message}</span>}

        <input {...register("password")} type="password" name="password" id="password"/>
        {errors.password && <span className="text-red">{errors.password.message}</span>}

        <button disabled={isSubmitting} type="submit">{isSubmitting ? 'Submiting...': 'Submit'}</button>

        {errors.root && <span className="text-red">{errors.root.message}</span>}
      </form>
    </>
  );
}

export default App;
