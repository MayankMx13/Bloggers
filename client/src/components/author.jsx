import { useEffect, useState } from "react";
import Card from "./card";
import { FaInstagramSquare, FaYoutube, FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import apiReq from "../../apiReq";
import { Link, Outlet } from "react-router-dom";

function Author() {
    const [posts, setPosts] = useState([]);
    const [author, setAuthor] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAuthorData = async () => {
            try {
                const loggedInUser = localStorage.getItem("user");

                if (loggedInUser) {
                    const userData = JSON.parse(loggedInUser);

                    const user = userData.user;
                    console.log(user);
                    setAuthor(user);


                    const userId = user._id;


                    const response = await apiReq.get(`/api/post/user/${userId}`);
                    setPosts(response.data);
                } else {
                    console.error("No user data found in localStorage.");
                }
            } catch (error) {
                console.error("Error fetching author or posts data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAuthorData();

    }, []);


    if (loading) {
        return <div>Loading...</div>;
    }

    if (!author) {
        return <div>No author information found. Please log in.</div>;
    }

    return (
        <>

            <div className="w-full h-full bg-[#F6F6F7] flex flex-col items-center justify-center p-4 rounded-md mt-10">
                <div className="w-full flex text-[#696A75] items-center justify-center mt-4 gap-3">
                    <div className="">
                        <img
                            src={author.image || "/profile.png"}
                            alt="Profile"
                            className="w-20 h-20 rounded-full object-cover"
                        />
                    </div>
                    <div className="leading-tight ">
                        <div className="font-bold">{author.name || "John Doe"}</div>
                        <div>{author.designation || "Author"}</div>
                    </div>
                </div>



                <div className="flex gap-4 mt-4">
                    <a href={author.instagram || "#"} target="_blank" rel="noopener noreferrer">
                        <FaInstagramSquare />
                    </a>
                    <a href={author.youtube || "#"} target="_blank" rel="noopener noreferrer">
                        <FaYoutube />
                    </a>
                    <a href={author.twitter || "#"} target="_blank" rel="noopener noreferrer">
                        <FaXTwitter />
                    </a>
                    <a href={author.facebook || "#"} target="_blank" rel="noopener noreferrer">
                        <FaFacebook />
                    </a>
                </div>

                <Link to="/authorpage/createpost" className="hover mt-4 py-2 px-3 bg-black text-white rounded-lg hover:bg-white hover:text-black hover:border-black ">
                    Create Post

                </Link>

            </div>

            <Outlet />


            <div className="md:mt-xl py-12 flex gap-2 sm:gap-3 md:gap-5 lg:gap-4 flex-wrap items-center justify-center">
                {posts.length > 0 ? (
                    posts.map((post) => <Card key={post._id} post={post} />)
                ) : (
                    <p className="text-center">No posts by this author yet.</p>
                )}
            </div>
        </>
    );
}

export default Author;
