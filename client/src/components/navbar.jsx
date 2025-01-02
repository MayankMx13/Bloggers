import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


function Navbar() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        console.log(token);
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {

        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        setIsLoggedIn(false);
    };

    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();


    const handleSearch = () => {
        if (!searchQuery.trim()) {
            alert("Please enter a search query.");
            return;
        }

        console.log(searchQuery);
        navigate(`/search-results`, { state: { query: searchQuery } });
    };


    return (
        <div className="w-full pt-8 md:mt-6 flex flex-col lg:flex-row justify-between items-center">
            <div className="left mb-4 md:mb-0">
                <h1 className="text-2xl md:text-3xl font-bold">BloGGer</h1>
            </div>

            <div className="middle flex justify-between items-center gap-3 md:gap-5 mb-4 md:mb-0 md:ml-8 lg:ml-24 lg:mr-10">
                <input
                    type="text"
                    className="border-4 border-none rounded-2xl p-2 w-[200px] text-sm sm:w-[300px] md:w-[350px] bg-[#F4F4F5]"
                    placeholder="Search by Title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="text-gray-500" onClick={handleSearch}>
                    <FaSearch />
                </button>
            </div>

            <div className="right ">
                <ul className="flex gap-2 sm:gap-3 md:mt-6 lg:mt-0   md:gap-4 font-medium items-center justify-center rounded-3xl text-[11px]">
                    <Link><li className="  md:text-lg">Home</li></Link>
                    <Link to="/blogall"><li className="md:text-lg">Blog</li></Link>
                    <Link><li className=" md:text-lg">Contact</li></Link>


                    {isLoggedIn ? (
                        <>
                            <Link to="/authorpage">
                                <li className="md:text-lg cursor-pointer text-blue-500">
                                    Author's Section                                </li>
                            </Link>

                            <li
                                onClick={handleLogout}
                                className="md:text-lg cursor-pointer bg-blue-500
                                text-white p-2"
                            >
                                Logout
                            </li>
                        </>

                    ) : (
                        <Link to="/login">
                            <li className="md:text-lg bg-blue-600 text-white p-2">Login</li>
                        </Link>
                    )}


                </ul>
            </div>
        </div>
    );
}

export default Navbar;
