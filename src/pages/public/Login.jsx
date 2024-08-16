import React, { useEffect, useState } from "react";
//icons
import { IoArrowBack } from "react-icons/io5";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { useGoogleLogin } from "@react-oauth/google";
import FacebookLogin from "@greatsumini/react-facebook-login";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import path from "../../ultils/path";
import InputField from "components/elements/input-field";
import { apiLogin } from "../../apis/userApi";
import { login } from "../../redux/user/userSlice";
import swal from "sweetalert";
import axios from "../../axios";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //google
    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                console.log("Access Token:", tokenResponse);

                // Fetch user information from Google UserInfo API
                const response = await axios
                    .get(
                        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenResponse.access_token}`,
                        {
                            headers: {
                                Authorization: `Bearer ${tokenResponse.access_token}`,
                                Accept: "application/json",
                            },
                        }
                    )
                    .catch((err) => console.log(err));

                console.log("User Info:", response.data);
                const rs = await apiLogin({
                    email: response.data.email,
                    password: "123",
                    type: "google",
                });
                if (rs.message === "Account do not exist") {
                    navigate(`/${path.REGISTER_OAUTH}`, {
                        state: { email: response.data.email, type: "google" },
                    });
                } else {
                    dispatch(
                        login({
                            data: rs.data.data,
                            isLogin: true,
                            token: rs.data.accessToken,
                        })
                    );
                    await swal("Login", "Successfully!", "success", {
                        timer: 2000,
                        buttons: false,
                    });
                    navigate(`/${path.HOME}`);
                }
            } catch (error) {
                if (error.response) {
                    console.error("Error Status:", error.response.status);
                    console.error("Error Data:", error.response.data);
                } else {
                    console.error("Error Message:", error.message);
                }
            }
        },
        onError: (error) => console.log("Login Failed:", error),
        flow: "implicit",
        responseType: "token",
        scope: "openid email profile",
    });
    //facebook
    const onSuccess = async (response) => {
        console.log("User Info:", response);

    };
    const onFail = async (response) => {
        console.log(response);
    };
    const onProfileSuccess = async (response) => {
        try {
            console.log("User Info:", response);

            const rs = await apiLogin({
                email: response.email,
                password: "123",
                type: "google",
            });

            console.log("rs", rs);
            if (rs.message === "Account do not exist") {
                navigate(`/${path.REGISTER_OAUTH}`, {
                    state: { email: response.email, type: "google" },
                });
            } else {
                dispatch(
                    login({
                        data: rs.data.data,
                        isLogin: true,
                        token: rs.data.accessToken,
                    })
                );
                await swal("Login", "Successfully!", "success", {
                    timer: 2000,
                    buttons: false,
                });
                navigate(`/${path.HOME}`);
            }
        } catch (error) {
            if (error.response) {
                console.error("Error Status:", error.response.status);
                console.error("Error Data:", error.response.data);
            } else {
                console.error("Error Message:", error.message);
            }
        }
    };

    const handleRegister = () => {
        navigate(`/${path.REGISTER}`);
    };
    const handleForgotPassword = () => {
        navigate(`/${path.FORGOTPASSWORD}`);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleSubmit = async () => {
        if (email === "" || password === "") {
            swal("Please fill all the fields", "Please try again!", {
                icon: "warning",
            });
        } else {
            let data = {
                email,
                password,
                type: "normal",
            };
            const rs = await apiLogin(data);

            const { message, success } = rs;

            if (message === "Invalid password") {
                swal("Login failed!", "Invalid password", "error");
                setPassword("");
                return;
            } else if (message === "Account do not exist") {
                swal("Login failed!", "Account do not exist", "error");
                setEmail("");
                setPassword("");
                return;
            } else if (message === "Account is banned") {
                swal("Login failed!", "Account is banned", "error");
                setEmail("");
                setPassword("");
                return;
            }
            dispatch(
                login({
                    data: rs.data.data,
                    isLogin: true,
                    token: rs.data.accessToken,
                })
            );
            await swal("Login", "Successfully!", "success", {
                timer: 2000,
                buttons: false,
            });
            navigate(`/${path.HOME}`);
        }
    };
    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className=" fixed bottom-5 w-[300px] h-[150px] right-5 flex flex-col border border-green-500 justify-center items-center z-30 text-white">
                <span>Test Account</span>
                <span className="text-[15px]">Email: usd96011@tccho.com </span>
                <span className="text-[15px]">Password: 12 </span>
            </div>
            <div className="w-full h-full z-20 flex flex-row justify-center items-center bg-blue-200">
                <div className="flex p-[30px] z-30 w-[500px] h-[550px] bg-white md:rounded-l-[20px] flex-col justify-start items-center ">
                    <span className="font-main font-extrabold text-[40px] ">
                        Login
                    </span>

                    <div className="w-full flex flex-col justify-start items-center my-1 gap-1">
                        <span className="w-full font-main text-[15px]">
                            Email
                        </span>
                        <InputField
                            type={"email"}
                            value={email}
                            onChange={handleEmailChange}
                            placeholder={"Enter the email"}
                        />
                    </div>
                    <div className="w-full flex flex-col justify-start items-center my-1 gap-1">
                        <div className="flex flex-row justify-between items-center w-full">
                            <span className="font-main text-[15px]">
                                Password
                            </span>
                            <span
                                onClick={handleForgotPassword}
                                className="font-thin text-[15px] hover:text-blue-500"
                            >
                                Forgot your password?
                            </span>
                        </div>

                        <InputField
                            type={"password"}
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder={"Enter the password"}
                        />
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-500 hover:bg-blue-300 text-white p-3 my-3 rounded-md w-full"
                    >
                        Sign in
                    </button>
                    <span className="text-gray-700 font-medium mb-2">Or</span>

                    <button
                        onClick={handleGoogleLogin}
                        className=" w-[400px] h-[40px] relative border bg-white hover:bg-blue-300 text-white p-3 my-1 rounded-md flex flex-row items-center justify-center"
                    >
                        <FcGoogle className="absolute left-3 top-2 self-start text-[25px] text-blue-500 " />
                        <span className="text-gray-600 text-[15px] font-medium self-center hover:text-white">
                            Continue with Google
                        </span>
                    </button>
                    <FacebookLogin
                        appId="1581871805725739"
                        autoLoad={false}
                        initParams={{
                            version: "v10.0",
                            xfbml: true,
                        }}
                        dialogParams={{
                            response_type: "token",
                        }}
                        loginOptions={{
                            return_scopes: true,
                        }}
                        onSuccess={onSuccess}
                        onFail={onFail}
                        onFailure={(err) => console.error('Facebook login error:', err)}
                        onProfileSuccess={onProfileSuccess}
                        className="w-[400px] h-[40px] relative border bg-white hover:bg-blue-300 text-white p-3 my-1 rounded-md flex flex-row items-center justify-center"
                    >
                        <FaFacebook className=" absolute left-3 top-2 self-start text-[25px] text-blue-500 " />{" "}
                        <span className="text-gray-600 text-[15px] font-medium self-center hover:text-white">
                            Continue with Facebook
                        </span>
                    </FacebookLogin>

                    <div className="mt-5 flex flex-row justify-between items-center w-full my-1">
                        <button
                            onClick={() => navigate(`/${path.HOME}`)}
                            className=" bg-blue-500 w-auto h-auto text-[12px] text-white rounded-[30px] p-3 hover:bg-gray-500 flex flex-row justify-center items-center gap-2"
                        >
                            <IoArrowBack /> Back to home
                        </button>
                        <span className="text-blue-500">
                            Don't have an account?{" "}
                            <span
                                onClick={handleRegister}
                                className="text-blue-500 font-bold hover:text-main-text"
                            >
                                Register
                            </span>
                        </span>
                    </div>
                </div>
                <div className="w-[400px] h-[550px] hidden md:flex justify-center items-center rounded-r-[20px] relative">
                    <img
                        src={require("../../assets/bg1.jpg")}
                        alt="login"
                        className="w-full h-full object-cover rounded-r-[20px] absolute"
                    />
                    <div className=" text-[35px] flex flex-col font-extrabold font-main  text-white z-10">
                        <span className="text-[60px]">HELLO,</span>
                        <span>welcome back!</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
