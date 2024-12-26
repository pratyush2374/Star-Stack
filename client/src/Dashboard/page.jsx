import Navbar from "./dashboard-compoenents/Navbar.jsx";
import Overview from "./dashboard-compoenents/Overview.jsx";
import Reviews from "./dashboard-compoenents/Reviews.jsx";

const Dashboard = (userDetails) => {
  const user = userDetails.user;
  const logout = () => {
    window.open(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, "_self");
  }
  return (
    <>
      <Navbar />
      <Overview />
      <Reviews />
    </>
  );
}

export default Dashboard;