import { useEffect, useState } from "react";
import Card from "./card"
import apiReq from "../../apiReq";

function Blogall() {

    const [data, setData] = useState([]);

    useEffect(() => {
        apiReq.get("api/post")
            .then((response) => {
                setData(response.data);
                console.log(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (<>
        <h2 className="font-bold justify-center items-center text-center flex text-xl
        mt-5">All Posts</h2>
        <div className="bottom  md:mt-xl py-12 flex gap-2 sm:gap-3 md:gap-5 lg:gap-4 flex-wrap items-center justify-center">


            {
                data.map((post) => (
                    <Card key={post._id} post={post} />
                ))}
        </div>
    </>
    )
}
export default Blogall