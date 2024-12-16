import React, { useState } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setError(`Error: ${error}`);
    }
  };
  return (
    <>
      <div>
        <h1>Sign Up</h1>
        <input
          required
          type="email"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          required
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSignUp}>Sign Up</button>
        {error && <p>{error}</p>}
        <p>
          Already Have an Account? <Link to={"/signin"}>Sign In</Link>
        </p>
      </div>
    </>
  );
};

export default SignUp;
