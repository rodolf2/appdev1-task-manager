import React, { useState } from "react";
import { Link } from "react-router";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router";
import { googleProvider } from "../firebase";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineMail } from "react-icons/md";
import { CiLock } from "react-icons/ci";

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
      <div className="flex items-center justify-center min-h-screen bg-gray-100 rounded-md">
        <div className="bg-white p-6 rounded shadow-md w-96">
          <h1 className="text-xl text-center font-bold mb-4">Sign In</h1>
          <div className="flex items-center border border-gray-300 p-2 mb-4 rounded">
            <MdOutlineMail className="text-gray-500 mr-2" />
            <input
              required
              type="email"
              placeholder="Enter Email"
              className="border-none outline-none w-full"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex items-center border border-gray-300 p-2 mb-4 rounded">
            <CiLock className="text-gray-500 mr-2" />
            <input
              required
              type="password"
              placeholder="Enter Password"
              className="border-none outline-none w-full"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            onClick={handleSignIn}
            className="bg-blue-500 text-white p-2 rounded w-full mb-2 hover:bg-blue-900"
          >
            Sign In
          </button>
          <div className="text-center mb-2">or</div>
          <button
            onClick={handleSignInWithGoogle}
            className="bg-red-500 text-white p-2 rounded w-full flex items-center justify-center hover:bg-red-900"
          >
            <FcGoogle className="text-2xl mr-3" /> Sign in with Google
          </button>
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          <p className="text-center mt-4">
            Don't Have an Account?{" "}
            <Link to={"/signup"} className="text-blue-500 hover:text-blue-900">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signin;
