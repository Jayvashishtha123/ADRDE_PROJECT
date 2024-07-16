// App.Js Page:-



import React, { useState, useEffect } from "react";
import Preloader from "./components/Pre";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Footer from "./components/Footer";
import Service1 from "./components/services/IT_Related";
import Service2 from "./components/services/safety_related";
import Service3 from "./components/services/lunch_booking";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./components/contexts/authContext";
import Login from "./components/Authentication/login_page";
import Register from "./components/Authentication/SignUp_page";
import DataDisplayIT from "./components/Admin/DataDisplayIT";
import DataDisplayLB from "./components/Admin/DataDisplayLB";
import DataDisplaySR from "./components/Admin/DataDisplaySR";
import MyrequestIT from "./components/MyRequest/MyrequestIT"
import UserData from "./components/User_History/userHistory"
import UserDataLB from "./components/User_History/userhistoryLB"
import UserDataIT from "./components/User_History/userhistoryIT"
import UserDataSR from "./components/User_History/userhistorySR"


function App() {
  const [load, updateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Preloader load={load} />

      <AuthProvider>
        <div className={`App ${load ? "no-scroll" : "scroll"}`} id={load ? "no-scroll" : "scroll"}>
          <Navbar />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/service1" element={<Service1 />} />
            <Route path="/service2" element={<Service2 />} />
            <Route path="/service3" element={<Service3 />} />
            <Route path="/DataDisplayIT" element={<DataDisplayIT/>} />
            <Route path="/DataDisplayLB" element={<DataDisplayLB/>} />
            <Route path="/DataDisplaySR" element={<DataDisplaySR/>} />
            <Route path="/MyrequestIT" element={<MyrequestIT/>} />
            <Route path="/UserDataLB" element={<UserDataLB/>} />
            <Route path="/UserDataIT" element={<UserDataIT/>} />
            <Route path="/UserDataSR" element={<UserDataSR/>} />

            <Route path="/UserData" element={<UserData/>} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
