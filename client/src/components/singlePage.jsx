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
            <h2 className="text-white bg-[#4B6BFB] text-base font-medium p-1 rounded-md object-fit capitalize">{post.tag}</h2>

            <h1 className="mt-3 font-bold lg:text-3xl capitalize">{post.title}</h1>

            <div className="flex gap-4 items-center justify-start mb-5">
                {post.author?.image && (
                    <img
                        src={post.author.image}
                        alt="Author's profile"
                        className="w-6 h-6 rounded-full"
                    />
                )}
                <span className="text-[9px] md:text-sm">
                    {post.author?.name || "Unknown Author"}
                </span>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>

            <div className="w-full h-full flex align-center justify-center rounded-md ">

                <img className=" w-full xl:w-1/2 xl:h-full object-fill  rounded-md md:shadow-md" src={post.imageUrl} alt="" />

            </div>

            <div className="w-full h-full flex align-center justify-center" >
                <div className="xl:w-1/2 xl:h-1/2 mt-5 md:text-lg xl:text-xl text-justify font-serif capitalize">{first}</div>
            </div>

            <div className="w-full h-full flex align-center justify-center rounded-md text-xl font-bold">

                BLOGGER

            </div>
            <div className="w-full h-full flex align-center justify-center">


                <div className="md:w-full lg:text-lg   xl:w-1/2 xl:h-1/2 mt-5 xl:text-xl text-justify font-serif">{second}</div>

            </div>


        </div>
    )
}
export default SinglePage