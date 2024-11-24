import { useEffect, useState } from "react"
import Card from "./card"
import apiReq from "../../apiReq";

function HomePage() {
    const [data, setData] = useState([]);

    useEffect(() => {
        apiReq.get("/api/post")
            .then((response) => {
                setData(response.data);
                console.log(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <>
            <div className="w-full px-0 lg:px-6 pt-10  ">
                <div className="top  bg-cover relative w-full h-1/2 shadow-md items-center ">
                    <div className="w-52 md:w-1/2 h-30 sm:h-42 md:h-1/2 lg:h-42 xl:h-[300px] absolute bg-white rounded-xl top-[78%] md:top-[60%] left-4 md:left-[10%] p-2 md:p-4 flex flex-col justify-between items-start gap-1 md:gap-5 shadow-md ">
                        <span className="text-[6px] md:text-base bg-[#4B6BFB] text-white p-[4px] rounded-sm md:rounded-md">Technology</span>
                        <h2 className="text-[10px] md:text-sm xl:text-3xl font-medium">The Impact of Technology on the Workplace: How Technology is Changing</h2>
                        <div className="flex items-center justify-start gap-2">
                            <img src="/profile.png" alt="" className=" w-4 md:w-8 h-4 md:h-8" />
                            <span className="text-[9px] md:text-lg">Jason Francisco</span>
                        </div>
                    </div>
                    <img src="/Image.png" alt="" className=" w-full h-full object-cover" />
                </div>
                <h2 className="font-bold block mt-32 mx-6">Latest Post</h2>
                <div className="bottom  md:mt-xl py-12 flex gap-2 sm:gap-3 md:gap-5 lg:gap-4 flex-wrap items-center justify-center">
                    {
                        data.map((post) => (
                            <Card key={post._id} post={post} />
                        ))}
                </div>
            </div>


        </>
    )
}
export default HomePage


