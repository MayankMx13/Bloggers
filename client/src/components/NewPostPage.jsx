import { useState } from "react";

import apiReq from "../../apiReq";

function NewPostPage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tag, setTag] = useState("");
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {


            const loggedInUser = localStorage.getItem("user");

            if (loggedInUser) {
                const userData = JSON.parse(loggedInUser);

                const user = userData.user;
                console.log(user);
                const userId = user._id;

                const formData = new FormData();
                formData.append("title", title);
                formData.append("content", content);
                formData.append("tag", tag);
                formData.append("author", userId);
                if (image) {
                    formData.append("image", image);
                }

                const response = await apiReq.post("/api/post/create", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                console.log("Post created successfully:", response.data);

                alert("Post Created Successfully");

            }
        } catch (err) {
            console.error("Error creating post:", err);
            setError("Failed to create the post. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full  h-full mt-10 flex justify-center items-center">
            <form
                className="bg-whitep p-2 lg:p-6  rounded-lg shadow-md w-full lg:w-1/2 flex flex-col gap-4"
                onSubmit={handleSubmit}
            >
                <h1 className="text-2xl font-bold text-center">Create a New Post</h1>

                {error && <p className="text-red-500">{error}</p>}

                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="border-2 border-gray-300 rounded-md p-2 w-full"
                />

                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    rows="6"
                    className="border-2 border-gray-300 rounded-md p-2 w-full resize-none "
                ></textarea>

                <input
                    type="text"
                    placeholder="Tag (e.g., Technology, Lifestyle)"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    required
                    className="border-2 border-gray-300 rounded-md p-2 w-full"
                />

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="border-2 border-gray-300 rounded-md p-2 w-full"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className={`${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-700"
                        } text-white font-bold py-2 px-4 rounded`}
                >
                    {loading ? "Creating Post..." : "Create Post"}
                </button>
            </form>
        </div>
    );
}

export default NewPostPage;
