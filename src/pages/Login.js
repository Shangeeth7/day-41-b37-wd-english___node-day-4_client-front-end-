import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const loginUser = async () => {
    const userObj = {
      password,
      email,
    };
    try {
      toast.loading("Loading...");
      const response = await axios.post(
        "https://deployment-practicee.herokuapp.com/api/auth/login",
        userObj
      );
      toast.dismiss();
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("user", response.data.data);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[400px] flex space-y-5 flex-col shadow-lg border border-gray-300">
        <h1 className="font-semibold text-2xl text-white bg-primary p-5 rounded-b-full text-center">
          Welcome Back !!
        </h1>

        <div className="flex flex-col space-y-5 p-5">
          <input
            type="text"
            className="py-1 px-3 border-2 border-secondary focus:outline-none w-full"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            className="py-1 px-3 border-2 border-secondary focus:outline-none w-full"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button
            className="py-1 px-5 text-white bg-primary"
            onClick={loginUser}
          >
            LOGIN
          </button>
          <div className="flex justify-between items-end">
            <div className="flex space-x-10">
              <Link className="underline text-primary" to="/register">
                Click Here To Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
