import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import Logo from "./Logo";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";

import { FaEye, FaLock, FaUser } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

function Signup() {
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();

    const create = async (data) => {
        setError("");
        try {
            const userData = await authService.createAccount(data);
            if (userData) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(login({ userData }));
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <main className="w-[95%] max-w-[1000px] mx-auto rounded-xl overflow-hidden shadow-md shadow-gray-400 md:flex md:min-h-[600px]">
            <div className="flex items-center bg-gradient-to-r from-[#26bc84] to-[#29ca8e] md:w-[35%]">
                <article className="w-full text-center p-4">
                    <h1 className="text-2xl text-white font-bold md:text-4xl">
                        Already Have an Account?
                    </h1>
                    <p className="my-6 text-white text-xl">
                        Login with your personal info.
                    </p>
                    <Link
                        to="/login"
                        className="block w-full rounded-full max-w-[180px] text-sm py-3 mx-auto bg-white text-[#29ca8e] duration-300 hover:bg-[#156748] hover:text-white"
                    >
                        Sign in
                    </Link>
                </article>
            </div>
            <div className="flex items-center p-4 md:w-[65%]">
                <div className="w-full mx-auto md:w-[60%]">
                    <h2 className="text-center text-[#26bc84] text-2xl font-bold leading-tight mb-4 md:text-4xl">
                        Create Account
                    </h2>

                    {error && (
                        <p className="text-red-600 mt-8 text-center">{error}</p>
                    )}
                    <form onSubmit={handleSubmit(create)}>
                        <div className="space-y-4">
                            <div className="relative">
                                <Input
                                    {...register("name", { required: true })}
                                    placeholder="Full name"
                                    className="rounded-full pl-10"
                                    required
                                />
                                <i className="absolute bottom-3 left-3 text-gray-400">
                                    <FaUser />
                                </i>
                            </div>

                            <div className="relative">
                                <Input
                                    type="email"
                                    {...register("email", {
                                        required: true,
                                    })}
                                    placeholder="Email"
                                    className="rounded-full pl-10"
                                    required
                                />
                                <i className="absolute bottom-3 left-3 text-gray-400">
                                    <MdEmail />
                                </i>
                            </div>
                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="rounded-full pl-10"
                                    {...register("password", {
                                        required: true,
                                    })}
                                    required
                                />
                                <i className="absolute bottom-3 left-3 text-gray-400">
                                    <FaLock />
                                </i>
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
                                Sign up
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}

export default Signup;
