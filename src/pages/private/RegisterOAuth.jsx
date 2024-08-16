import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IoArrowBack } from "react-icons/io5";

import { registerAction } from "../../redux/user/userSlice";
import { apiRegister } from "../../apis/userApi";
import swal from "sweetalert";
import path from "../../ultils/path";
import InputField from "../../components/elements/input-field";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { LuLoader2 } from "react-icons/lu";

export default function RegisterOAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { email } = location.state || {};
    const [isLoading, setIsLoading] = useState(false);
    const handleBackToLogin = () => {
        navigate(`/${path.LOGIN}`);
    };
    const registerValidation = useFormik({
        initialValues: {
            password: "",
            confirmPassword: "",
            phone: "",
            firstName: "",
            lastName: "",
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .required("Password is required")
                .min(2, "Password must be at least 2 characters"),
            confirmPassword: Yup.string().required(
                "Confirm password is required"
            ),
            phone: Yup.string()
                .required("Phone number is required")
                .matches(
                    /^\d{10,}$/,
                    "Phone number must be at least 10 digits and contain only numbers"
                ),
            firstName: Yup.string().required("First name is required"),
            lastName: Yup.string().required("Last name is required"),
        }),
        onSubmit: async (values) => {
            setIsLoading(true);
            if (values.password !== values.confirmPassword) {
                swal(
                    "Please try again!",
                    "Password and confirm password are not the same!",
                    "warning"
                );
                return;
            }
            let data = {
                email: email,
                password: values.password,
                mobile: values.phone,
                firstName: values.firstName,
                lastName: values.lastName,
                type: "google",
            };
            try {
                const rs = await apiRegister(data);

                dispatch(
                    registerAction({
                        data: rs.data,
                        isLogin: true,
                        token: rs.data.token,
                    })
                );
                setIsLoading(false);
                swal(
                    "Register",
                    "Done! Please login to continue",
                    "success"
                ).then(() => {
                    navigate(`/${path.LOGIN}`);
                });
            } catch (error) {
                if (error) {
                    swal("Register failed!", "Account already exists", "error");
                    setIsLoading(false);
                }
            }
        },
    });
    return (
        <>
            {isLoading && (
                <div className="w-screen h-screen z-50 bg-blue-200 flex justify-center items-center">
                    <LuLoader2
                        variant="soft"
                        className="animate-spin text-30px"
                    />
                </div>
            )}
            <div className="w-screen h-screen flex items-center justify-center">
                <div className="fixed bottom-5 w-[300px] h-[150px] right-5 flex flex-col border border-green-500 justify-center items-center z-10 text-white">
                    <span>Test Account</span>
                    <span className="text-[15px]">
                        Email: usd96011@tccho.com{" "}
                    </span>
                    <span className="text-[15px]">Password: 12 </span>
                </div>
                .
                <div className="w-full h-full z-20 flex flex-row justify-center items-center bg-blue-200">
                    <div className="flex flex-row justify-center items-center w-2/3 h-[600px]">
                        <div className="flex p-[30px] z-30 w-1/2 h-full bg-white rounded-l-[20px] flex-col justify-start items-center relative">
                            <span className="font-main font-extrabold text-[40px] ">
                                Register
                            </span>

                            <form onSubmit={registerValidation.handleSubmit}>
                                <div className="flex flex-row justify-between items-center w-full my-1 gap-3">
                                    <div className="w-full flex flex-col justify-start items-center my-1 gap-1">
                                        <span className="w-full font-main text-[15px]">
                                            First name
                                        </span>
                                        <InputField
                                            name="firstName"
                                            type={"text"}
                                            value={
                                                registerValidation.values
                                                    .firstName
                                            }
                                            onChange={
                                                registerValidation.handleChange
                                            }
                                            placeholder={"Enter first name"}
                                        />
                                    </div>
                                    <div className="w-full flex flex-col justify-start items-center my-1 gap-1">
                                        <span className="w-full font-main text-[15px]">
                                            Last name
                                        </span>
                                        <InputField
                                            name="lastName"
                                            type={"text"}
                                            value={
                                                registerValidation.values
                                                    .lastName
                                            }
                                            onChange={
                                                registerValidation.handleChange
                                            }
                                            placeholder={"Enter last name"}
                                        />
                                    </div>
                                </div>
                                <div className="w-full flex flex-col justify-start items-center my-1 gap-1">
                                    <span className="w-full font-main text-[15px]">
                                        Phone number
                                    </span>
                                    <InputField
                                        name="phone"
                                        type={"text"}
                                        value={registerValidation.values.phone}
                                        onChange={
                                            registerValidation.handleChange
                                        }
                                        placeholder={"Enter the phone number"}
                                    />
                                </div>
                                <div className="w-full flex flex-col justify-start items-center my-1 gap-1">
                                    <span className="w-full font-main text-[15px]">
                                        Password
                                    </span>
                                    <InputField
                                        name="password"
                                        type={"password"}
                                        value={
                                            registerValidation.values.password
                                        }
                                        onChange={
                                            registerValidation.handleChange
                                        }
                                        placeholder={"Enter the password"}
                                    />
                                </div>
                                <div className="w-full flex flex-col justify-start items-center my-1 gap-1">
                                    <span className="w-full font-main text-[15px]">
                                        Confirm Password
                                    </span>
                                    <InputField
                                        name="confirmPassword"
                                        type={"password"}
                                        value={
                                            registerValidation.values
                                                .confirmPassword
                                        }
                                        onChange={
                                            registerValidation.handleChange
                                        }
                                        placeholder={
                                            "Enter the confirm password"
                                        }
                                    />
                                </div>

                                <div className="my-2 w-full flex flex-col justify-start items-center text-[13px]">
                                    {registerValidation.errors.firstName &&
                                    registerValidation.touched.firstName ? (
                                        <div className="w-full text-red-500">
                                            *{" "}
                                            {
                                                registerValidation.errors
                                                    .firstName
                                            }
                                        </div>
                                    ) : null}
                                    {registerValidation.errors.lastName &&
                                    registerValidation.touched.lastName ? (
                                        <div className="text-red-500 w-full">
                                            *{" "}
                                            {registerValidation.errors.lastName}
                                        </div>
                                    ) : null}
                                    {registerValidation.errors.phone &&
                                    registerValidation.touched.phone ? (
                                        <div className="w-full text-red-500">
                                            * {registerValidation.errors.phone}
                                        </div>
                                    ) : null}
                                    {registerValidation.errors.password &&
                                    registerValidation.touched.password ? (
                                        <div className="w-full text-red-500">
                                            *{" "}
                                            {registerValidation.errors.password}
                                        </div>
                                    ) : null}
                                    {registerValidation.errors
                                        .confirmPassword &&
                                    registerValidation.touched
                                        .confirmPassword ? (
                                        <div className="text-red-500 w-full">
                                            *{" "}
                                            {
                                                registerValidation.errors
                                                    .confirmPassword
                                            }
                                        </div>
                                    ) : null}
                                </div>

                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-300 text-white p-3 my-1 rounded-md w-full"
                                >
                                    Confirm
                                </button>
                                <div className="flex flex-row justify-between items-center w-full my-1">
                                    <span
                                        onClick={() =>
                                            navigate(`/${path.HOME}`)
                                        }
                                        className="text-blue-500 hover:text-main-text flex flex-row justify-center items-center gap-2"
                                    >
                                        <IoArrowBack /> Back to home
                                    </span>
                                    <span className="text-blue-500">
                                        Already have an account?{" "}
                                        <span
                                            onClick={handleBackToLogin}
                                            className="text-blue-500 font-bold hover:text-main-text"
                                        >
                                            Login
                                        </span>
                                    </span>
                                </div>
                            </form>
                        </div>
                        <div className="w-1/2 h-full flex justify-center items-center rounded-r-[20px] relative ">
                            <img
                                src={require("../../assets/bg1.jpg")}
                                alt="login"
                                className="w-full h-full object-cover rounded-r-[20px] absolute"
                            />
                            <div className=" text-[35px] flex flex-col font-extrabold font-main  text-white z-10">
                                <span className="text-[60px]">Almost</span>
                                <span>just a minute!</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
