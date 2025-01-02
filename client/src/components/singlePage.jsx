import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiReq from "../../apiReq";


function SinglePage() {

    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [first, setFirst] = useState("");
    const [second, setSecond] = useState("");

    useEffect(() => {
        const fetchPost = async () => {
            try {
                // console.log(id);

                const response = await apiReq.get(`/api/post/${id}`);
                setPost(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching post:", error);
                setError("Error fetching post data. Please try again.");
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);



    useEffect(() => {
        if (post && post.content) {
            const mid = Math.floor(post.content.length / 2);
            setFirst(post.content.slice(0, mid));
            setSecond(post.content.slice(mid));
        }
    }, [post]);


    if (loading) {
        return <p>Loading...</p>;
    }


    if (error) {
        return <p>{error}</p>;
    }


    if (!post) {
        return <p>Post not found.</p>;
    }

    return (
        <div className="mt-4 mb-10 flex flex-col gap-5">
            <h2 className="text-white bg-blue-600 text-sm md:text-base font-medium p-2 rounded-md object-fit capitalize">{post.tag}</h2>

            <h1 className=" md:mt-3 font-bold lg:text-3xl capitalize">{post.title}</h1>

            <div className="flex gap-4 items-center justify-start md:mb-5">
                {post.author?.image && (
                    <img
                        src={post.author.image}
                        alt="Author's profile"
                        className="w-5 h-5 md:w-6 md:h-6 rounded-full"
                    />
                )}
                <span className=" text-sm md:text-[9px] lg:text-lg font-bold md:text-sm capitalize ">
                    {post.author?.name || "Unknown Author"}
                </span>
                <span className="text-sm text-gray-400 font-serif">{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>

            <div className="w-full h-[200px] md:h-[300px] flex align-center justify-center rounded-md ">

                <img className="w-full xl:w-1/2 xl:h-full object-fit rounded-md md:shadow-md" src={post.imageUrl} alt="" />

            </div>

            <div className="w-full h-full flex align-center justify-center" >
                <div className="text-xs md:w-full md:text-lg xl:w-1/2 xl:h-1/2 mt-5  text-justify ">{first}</div>
            </div>

            <div className="w-full h-full flex align-center justify-center rounded-md text-xl font-bold">

                BLOGGER

            </div>
            <div className="w-full h-full flex align-center justify-center">


                <div className="text-xs md:w-full md:text-lg xl:w-1/2 xl:h-1/2 mt-5  text-justify ">{second}</div>

            </div>


        </div>
    )
}
export default SinglePage