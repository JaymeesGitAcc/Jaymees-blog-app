import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./store/authSlice";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import authService from "./appwrite/auth";

import { AnimatePresence } from "framer-motion";
import Loading from "./components/Loading";
import ScrollToTop from "./components/ScrollToTop";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const location = useLocation();

    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        authService
            .getCurrentUser()
            .then((userData) => {
                if (userData) {
                    dispatch(login({ userData }));
                } else {
                    dispatch(logout());
                }
            })
            .finally(() => setLoading(false));
    }, [authStatus, dispatch]);

    function showSuccessMessage() {
        toast.success("You are logged in!", {
            position: "bottom-right",
        });
    }

    function logoutSuccessfulMessage() {
        toast.success("You are Logged out!", {
            position: "bottom-right",
        });
    }

    useEffect(() => {
        console.log("checking authStatus");
        console.log(authStatus);

        if (authStatus !== null) {
            if (authStatus) {
                showSuccessMessage();
            } else {
                logoutSuccessfulMessage();
            }
        }
    }, [authStatus]);

    return !loading ? (
        <>
            <AnimatePresence>
                <div className="min-h-screen">
                    <Header />
                    <main location={location} key={location.pathname}>
                        <Outlet />
                    </main>
                    <div className="w-full block">
                        <Footer />
                    </div>
                    <ScrollToTop />
                </div>
            </AnimatePresence>
            <ToastContainer />
        </>
    ) : (
        <Loading />
    );
}

export default App;
