import { useNavigate } from "react-router-dom";

function Card({ post }) {
    const navigate = useNavigate();
    const handleClick = () => {

        navigate(`/singlePost/${post._id}`);
    };
    return (

        <div className=" p-8 w-[90%] h-[50%] md:w-[46%] lg:w-[30%] md:h-[45%] lg:h-[40%]  flex flex-col gap-3 border-2 border-[#E8E8EA] rounded-md" onClick={handleClick}>
            <div className="w-full h-full ">
                <img src={post.imageUrl} alt="" className="w-full h-full object-cover flex flex-col items-start" />
            </div>
            <span className="bg-blue-200 text-[#4B6BFB] font-medium p-1 rounded-md inline-block capitalize">
                {post.tag}
            </span>
            <h3 className="text-wrap font-medium lg:text-xl capitalize">{post.title}</h3>
            <div className="flex items-center justify-start gap-2">
                <img src={post.author?.image || "/profile.png"} alt="Author" className="w-4 h-4" />
                <span className="text-[9px] md:text-sm capitalize">{post.author?.name || "Unknown Author"}</span>

            </div>
        </div >

    )
}
export default Card