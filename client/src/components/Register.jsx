import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiReq from "../../apiReq";

function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setProfileImage(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("email", email);
            formData.append("name", name);
            formData.append("password", password);

            if (profileImage) {
                formData.append("image", profileImage);
            }

            console.log(formData);

            // Send the form data directly
            const response = await apiReq.post("/api/user/createUser", formData);

            console.log(response);
            if (response.status === 400) {

                const errorMessage = response.data.message;
                alert(errorMessage || "An error occurred");
            }


            console.log("User registered successfully:", response.data);
            navigate("/login");
        } catch (error) {
            console.error("Error registering user:", error.response);
        }
    };


    return (
        <div className="w-full h-screen flex justify-center items-center relative">
            <div className="flex flex-col lg:w-1/4 lg:h-1/4 items-center gap-3 absolute">
                <h1 className="text-3xl font-bold">BloGGer</h1>
                <h2 className="font-bold">Create an Account</h2>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-10 py-3 border-2 border-black"
                />
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-10 py-3 border-2 border-black"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-10 py-3 border-2 border-black"
                />


                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full px-10 py-3 border-2 border-black"
                />

                <button
                    onClick={handleSubmit}
                    className="bg-black w-full px-10 py-3 text-white hover:bg-white hover:border-black hover:text-black hover:border-2"
                >
                    REGISTER
                </button>

                <Link to="/login">Already have an Account?</Link>
            </div>
        </div>
    );
}

export default Register;
