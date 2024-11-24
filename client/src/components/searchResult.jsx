import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import apiReq from "../../apiReq";
import Card from "./card";

function SearchResults() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const location = useLocation();
    const query = location.state?.query;
    useEffect(() => {
        const fetchResults = async () => {
            try {


                const response = await apiReq.get(`/api/post/search/${query}`);
                setResults(response.data);
                console.log(results);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (query) {
            fetchResults();
        }
    }, [query]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Search Results for</h1>
            {results.length > 0 ? (


                results.map((post) => (
                    <Card key={post._id} post={post} />
                ))


            ) : (
                <p className="text-gray-500">No results found.</p>
            )}
        </div>
    );
}

export default SearchResults;
