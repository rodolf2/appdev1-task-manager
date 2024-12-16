import React, { useState } from "react";
import { Link } from "react-router";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router";
import { googleProvider } from "../firebase";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignIn = async () => {
    if (!email || !password) {
      setError("Please fill in both fields");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setError(`Error: ${error}`);
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (error) {
      setError(`Error: ${error}`);
    }
  };

  return (
    <>
      <h1>Sign In</h1>
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
      <button onClick={handleSignIn}>Sign In</button>
      {" or "}
      <button onClick={handleSignInWithGoogle}>Sign in with Google</button>
      {error && <p>{error}</p>}
      <p>
        Don't Have an Account? <Link to={"/signup"}>Sign Up</Link>
      </p>
    </>
  );
};

export default Signin;
