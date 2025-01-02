import { useNavigate } from "react-router-dom";

function Card({ post }) {
    const navigate = useNavigate();


    const handleClick = () => {

        navigate(`/singlePost/${post._id}`);
    };
    return (

        <div className="mt-5 md:mt-0 pb-5 md:p-6 w-[90%] h-fit md:w-[46%] lg:w-[30%] flex  flex-col gap-3 sm:border-b-2 sm: border-black md:border-0 rounded-md" onClick={handleClick}>
            <div className="w-full sm:h-[40%]  ">
                <img src={post.imageUrl} alt="" className="w-full h-[70px] md:w-full md:h-full lg:h-[40%] object-cover flex flex-col items-start" />
            </div>
            <span className="bg-blue-200 text-[#4B6BFB] text-sm md:font-bold p-1 rounded-md inline-block capitalize">
                {post.tag}
            </span>
            <h3 className="text-wrap font-medium text-lg  lg:text-xl capitalize">{post.title}</h3>
            <span className="text-xs text-[#989898]" >{post.content.slice(0, 60) + ".."}</span>
            <div className="flex items-center justify-start gap-2 ">
                <img src={post.author?.image || "/profile.png"} alt="Author" className="w-5 h-5 rounded-lg" />
                <span className="text-[15px] md:text-sm capitalize">{post.author?.name || "Unknown Author"}</span>

            </div>
        </div >

    )
}
export default Card