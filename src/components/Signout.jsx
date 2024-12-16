import React from "react";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const SignOut = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/signin");
  };
  return (
    <button
      className="bg-red-700 text-white p-2 rounded hover:bg-red-600 flex items-center"
      onClick={handleSignOut}
    >
      <CiLogout className="mr-1" />
      Sign Out
    </button>
  );
};

export default SignOut;
