import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import authService from "./appwrite/auth";

import { AnimatePresence } from "framer-motion";
import Loading from "./components/Loading";

function App() {
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        setLoading(true);
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
    }, [dispatch]);

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
                </div>
            </AnimatePresence>
        </>
    ) : (
        <Loading />
    );
}

export default App;
