import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOutUserSuccess } from "../store/userReducers";

export default function UserLogoutButton() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignOut = () => {
        dispatch(signOutUserSuccess()); // Clear user state
        navigate("/login"); // Redirect to login page
    };
  return (
    <div className="w-full">
      <button onClick={handleSignOut} className=" w-full text-white bg-red-600 py-2 font-semibold rounded-md uppercase hover:text-white transition duration-200">
        Log Out
      </button>
    </div>
  )
}
