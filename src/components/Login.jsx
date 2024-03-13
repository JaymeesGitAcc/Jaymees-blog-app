import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import Logo from "./Logo";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../store/authSlice";

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

function Login() {
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { register, handleSubmit } = useForm();

    const login = async (data) => {
        setError("");
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(authLogin({ userData }));
                }
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <main className="w-[95%] max-w-[1000px] mx-auto rounded-xl overflow-hidden shadow-md shadow-gray-400 md:flex md:min-h-[600px]">
            <div className="flex items-center py-6 md:w-[65%] md:py-6">
                <div className="w-full mx-auto md:w-[65%]">
                    <h2 className="text-center text-2xl text-[#29ca8e] font-bold leading-tight my-8 md:text-4xl">
                        Login to Your Account
                    </h2>
                    {error && (
                        <p className="text-red-600 my-4 text-center">{error}</p>
                    )}
                    <form onSubmit={handleSubmit(login)} className="px-10">
                        <div className="space-y-4">
                            <Input
                                type="email"
                                placeholder="Email"
                                className="rounded-full"
                                {...register("email", {
                                    required: true,
                                })}
                            />

                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="rounded-full"
                                    {...register("password", {
                                        required: true,
                                    })}
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowPassword(!showPassword);
                                    }}
                                    className="absolute z-10 right-4 bottom-3 text-slate-500"
                                >
                                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                                </button>
                            </div>
                            <Button
                                type="submit"
                                className="block w-full rounded-full max-w-[180px] text-sm py-3 mx-auto"
                                bgColor="bg-[#29ca8e] duration-300 hover:bg-[#156748]"
                            >
                                Sign in{" "}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="bg-[#29ca8e] text-white flex items-center bg-gradient-to-r from-[#26bc84] to-[#29ca8e] md:my-0 md:w-[35%]">
                <div className="text-center p-4">
                    <h1 className="text-2xl font-bold md:text-4xl">
                        New Here?
                    </h1>
                    <p className="my-6 text-xl">
                        Sign up and discover amazing blog posts and even write
                        your own!
                    </p>
                    <Link
                        to="/signup"
                        className="block w-full rounded-full max-w-[180px] text-sm py-3 mx-auto bg-white text-[#29ca8e] duration-300 hover:bg-[#156748] hover:text-white"
                    >
                        Sign up
                    </Link>
                </div>
            </div>
        </main>
    );
}

export default Login;
