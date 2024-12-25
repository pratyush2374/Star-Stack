import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard/page";
import SignUp from "./Sign up/page";

function App() {
  return (
    <>
     <Router>
                <Routes>
                    <Route path="/" element={<SignUp />}></Route>
                    <Route path="/dashboard" element={<Dashboard />}></Route>
                </Routes>
            </Router>
    </>
  )
}

export default App
