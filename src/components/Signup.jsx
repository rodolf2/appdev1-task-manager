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
      <div className="flex items-center justify-center min-h-screen bg-gray-100 rounded-md">
        <div className="bg-white p-6 rounded shadow-md w-96">
          <h1 className="text-xl text-center font-bold mb-4">Sign Up</h1>
          <input
            required
            type="email"
            placeholder="Enter Email"
            className="border border-gray-300 p-2 mb-4 w-full"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            required
            type="password"
            placeholder="Enter Password"
            className="border border-gray-300 p-2 mb-4 w-full"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleSignUp}
            className="bg-blue-500 text-white p-2 rounded w-full mb-2 hover:bg-blue-900"
          >
            Sign Up
          </button>
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          <p className="text-center mt-4">
            Already Have an Account?{" "}
            <Link to={"/signin"} className="text-blue-500  hover:text-blue-900">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
