import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard/page";
import SignUp from "./Sign up/page";

import { useEffect, useState } from "react";
import axios from "axios";

function App() {
    const [user, setUser] = useState(null);

    const getUser = async () => {
        try {
            const url = "http://localhost:3001/auth/login/success";
            const { data } = await axios.get(url, { withCredentials: true });
            setUser(data.user);
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
                    <Route
                        path="/dashboard"
                        element={user ? <Dashboard user={user} /> : <Navigate to="/" />}
                    ></Route>
                    <Route
                        path="/"
                        element={user ? <Navigate to="/dashboard" /> : <SignUp />}
                    ></Route>
                </Routes>
            </Router>
        </>
    );
}

export default App;
