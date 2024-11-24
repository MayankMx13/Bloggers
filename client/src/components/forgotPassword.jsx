import { useNavigate } from "react-router-dom";
import apiReq from "../../apiReq";
import { useState } from "react";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await apiReq.post("/api/user/forgot", { email });
            console.log(response.data.message);
            setStatus(response.data.message);
            navigate("/login");
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Something went wrong!";
            console.log("Error:", errorMessage);
            setStatus(errorMessage);
        }
    };

    return (
        <div className="w-full h-screen flex justify-center items-center relative">
            <div className="flex flex-col lg:w-1/4 lg:h-1/4 items-center gap-3 absolute">
                <h1 className="text-3xl font-bold">BloGGer</h1>
                <h2 className="font-bold">Reset Password</h2>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-10 py-3 border-2 border-black"
                />
                <button
                    onClick={handleSubmit}
                    className="bg-black w-full px-10 py-3 text-white hover:bg-white hover:border-black hover:text-black hover:border-2"
                >
                    SEND
                </button>
                {status && <p className="mt-3">{status}</p>}
            </div>
        </div>
    );
};

export default ForgotPassword;
