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

    return (
        <div className="bottom  md:mt-xl py-12 flex gap-2 sm:gap-3 md:gap-5 lg:gap-4 flex-wrap items-center justify-center">
            {
                data.map((post) => (
                    <Card key={post._id} post={post} />
                ))}
        </div>
    )
}
export default Blogall