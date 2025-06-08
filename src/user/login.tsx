import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast, Toaster } from "sonner"
import Navbar from "../common/navbar";
import { useNavigation } from "react-router";


const login = () => {
  const [click, setClick] = useState(false);
  const [term, setTerm] = useState(false);
  
  const handleTerm = () => {
    setTerm(!term);
  };

  const handleClick = () =>{
    setClick(!click)
    if(term !== true)
    {
        toast.warning("Check the Checkbox First",{
            description: "Does not checked",
            position: "top-right",
            closeButton: true,
            

            
        })
    }
    else
  {  
    toast.success("Successfully logged in",{
        description: "Welcome back!",
        duration: 2000,
        position: "top-right",
    })
    navigation("/medicine")
}
    console.log("clicked")
  }

  return (
    <div>
      <Navbar />
      <div className="justify-center items-center flex h-screen mt-20">
      <Toaster/>
        <div className="w-1/2 h-screen hidden lg:block">
          <img
            src="https://img.freepik.com/fotos-premium/imagen-fondo_910766-187.jpg?w=826"
            alt="imgBG1/20"
            className="w-full h-full object-cover "
          />
        </div>
        <div className="w-full lg:w-1/2 h-screen col-3  justify-center items-center lg:p-36 md:p-24 sm:20 p-8 w-full lg:w-1/2">
          <h1 className="text-4xl font-bold mb-5 text-center ">Sign In</h1>
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-xl py-4 px-4 focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
              autoComplete="off"
            />
          </div>
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-bold mb-2 ">
              Password
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-xl py-4 px-4 focus:outline-none focus:border-blue-500"
              placeholder="Enter your password "
              autoComplete="off"
            />
          </div>
          <div className="flex items-center mb-6">
            <Checkbox
              id="remember"
              className="mr-2 bg-black text-white"
              onClick={() => handleTerm()}
            />
            <label
              htmlFor="remember"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 hover:underline hover:underline-offset-4"
            >
              Accept terms and conditions
            </label>
          </div>
          <div className="flex items-center mb-6">
            <label className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 hover:underline hover:underline-offset-4">
              Forgot Password?
            </label>
          </div>
          <div className="flex items-center justify-between mb-5 justify-center">
            <Button
              onClick={() => handleClick()}
              className="py-6 px-21    bg-black text-white hover:bg-white hover:text-black hover:border rounded-3xl "
            >
              {" "}
              Login{" "}
            </Button>
          </div>
          <div className="flex items-center justify-between mb-5 justify-center">
            <label className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 hover:underline hover:underline-offset-2">
              Sign Up
            </label>
          </div>
        </div>
      </div>

    </div>
  );
};

export default login;
