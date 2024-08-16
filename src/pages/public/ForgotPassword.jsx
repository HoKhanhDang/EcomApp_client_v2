import React from "react";
import { apiResetPassword } from "../../apis/userApi";
import InputField from "../../components/elements/input-field";
import swal from "sweetalert";

export default function ForgotPassword() {
    const [email, setEmail] = React.useState("");
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleBack = () => {
        window.history.back();
    };
    const setAllNull = () => {
        setEmail("");
    };
    const handleSubmitForgotPassword = async () => {
        if (email === "") {
            swal("Please fill all the fields", "Please try again!", {
                icon: "warning",
            });
        } else {
            const data = { email };
            const rs = await apiResetPassword(data);

            swal(
                "Almost there!",
                "Please check your email to verify!",
                "success"
            );
            setAllNull();
        }
    };
    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="fixed bottom-5 w-[300px] h-[150px] right-5 flex flex-col border border-green-500 justify-center items-center z-10 text-white">
                <span>Test Account</span>
                <span className="text-[15px]">Email: usd96011@tccho.com </span>
                <span className="text-[15px]">Password: 12 </span>
            </div>
            <div className="w-full h-full relative flex justify-center items-center bg-slate-200">
                <div className="flex p-[30px] absolute w-[500px] h-auto bg-white rounded-[15px] flex-col justify-start items-center ">
                    <span className="font-main font-extrabold text-[35px] ">
                        Forgot password
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
                    <div className="w-full flex flex-row justify-start items-center my-1 gap-2">
                        <button
                            onClick={handleBack}
                            className="bg-blue-500 hover:bg-blue-300 text-white p-3 my-1 rounded-md w-full"
                        >
                            Back
                        </button>
                        <button
                            onClick={handleSubmitForgotPassword}
                            className="bg-blue-500 hover:bg-blue-300 text-white p-3 my-1 rounded-md w-full"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
