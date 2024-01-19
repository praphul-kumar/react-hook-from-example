import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{email:string, password:string}>({
    email: "",
    password: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const error = {email: "", password: ""};
    setErrors(error);

    // manual Validation
    if (!email.includes("@")) {
      setErrors({...error, email: "Email must include @"});
      return;
    }

    if (password.length < 8) {
      setErrors({...error, password: "Password must atleat 8 chars long."});
      return;
    }

    // Form Submission
    console.log('Form Submitted');
  };

  return (
    <>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login Form</h2>
        <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        {errors.email && <div className="text-red">{errors.email}</div>}
        <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {errors.password && <div className="text-red">{errors.password}</div>}

        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default App;
