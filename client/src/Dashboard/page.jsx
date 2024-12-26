import { useState,useEffect } from "react";
import Navbar from "./dashboard-compoenents/Navbar.jsx";
import Overview from "./dashboard-compoenents/Overview.jsx";
import Reviews from "./dashboard-compoenents/Reviews.jsx";
import axios from "axios";

const Dashboard = ({ user }) => {
    const logout = () => {
        window.open(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, "_self");
    };

    const [reviewData, setReviewData] = useState([]);
    const [averageRating, setAverageRating] = useState(0);

    useEffect(() => {
        async function fetchData() {
            const googleId = user.googleId;

            try {
                const data = await axios.get(
                    "http://localhost:3001/user/get-reviews",
                    {
                        googleId: googleId,
                    }
                );

                setReviewData(data.data)
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (reviewData && reviewData.length > 0) {
            const totalRating = reviewData.reduce((acc, review) => acc + review.rating, 0);
            const avgRating = totalRating / reviewData.length;
            setAverageRating(avgRating);
        }
    }, [reviewData]);

    return (
        <>
            <Navbar />
            <Overview user={user} averageRating={averageRating} />
            <Reviews reviewData={reviewData} />
        </>
    );
};

export default Dashboard;
