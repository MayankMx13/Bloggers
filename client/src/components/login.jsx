import { Link, useNavigate } from "react-router-dom";
import apiReq from "../../apiReq";
import { useState } from "react";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await apiReq.post(
            "/api/user/login",
            { email, password },
            { withCredentials: true }
        );
        console.log("Login Successful:", response.data);

        const userData = response.data;

        localStorage.setItem("user", JSON.stringify(userData));

        localStorage.setItem("authToken", response.data.token);

        navigate("/");
    };

    return (
        <div className="w-full h-screen flex justify-center items-center relative">
            <div className="flex flex-col lg:w-1/4 lg:h-1/4  items-center gap-3 absolute ">
                <h1 className="text-3xl font-bold">BloGGer</h1>
                <h2 className="font-bold">Login to Your Acoount</h2>
                <input
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-10 py-3 border-2 border-black"
                />
                <input
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-10 py-3 border-2 border-black"
                />
                <button
                    onClick={handleSubmit}
                    className="bg-black w-full px-10 py-3 text-white hover:bg-white hover:border-black hover:text-black hover:border-2"
                >
                    LOGIN
                </button>
                <Link to="/register">New User,Create Account?</Link>
                <Link to="/forgotPass">Forgot Password?</Link>
            </div>
        </div>
    );
}
export default Login;
