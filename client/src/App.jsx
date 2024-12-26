import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard/page";
import SignUp from "./Sign up/page";

import { useEffect, useState } from "react";
import axios from "axios";

function App() {
    const [user, setUser] = useState(null);

    const getUser = async () => {
        try {
            const url = `${
                import.meta.env.VITE_BACKEND_URL
            }/auth/login/success`;
            const { data } = await axios.get(url, { withCredentials: true });
            setUser(data.user._json);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUser();
    }, []);
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<SignUp />}></Route>
                    <Route path="/dashboard" element={<Dashboard />}></Route>
                    <Route exact path="/" element={user ? <Dashboard user={user} /> : <SignUp />}></Route>
                </Routes>
            </Router>
        </>
    );
}

export default App;
