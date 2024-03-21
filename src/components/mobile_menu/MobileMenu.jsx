import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function MobileMenu({ menuItems = [], className = "", onClick }) {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();

    const handleClick = (path) => {
        onClick(false);
        navigate(path);
    };
    return (
        <nav className={`${className}`}>
            <ul className="space-y-5 my-[100px] mx-10">
                {menuItems.map((item) =>
                    item.active ? (
                        <li
                            key={item.name}
                            className="text-slate-800 font-semibold"
                        >
                            {item.name !== "Sign Up" ? (
                                <button
                                    onClick={() => handleClick(item.slug)}
                                    className="flex items-center gap-1 duration-300 active:text-[#29ca8e]"
                                >
                                    {item.icon ? item.icon : null}
                                    {item.name}
                                </button>
                            ) : null}
                        </li>
                    ) : null
                )}
                {authStatus && (
                    <li className="text-slate-800 font-semibold">
                        <button
                            onClick={() => handleClick("/profile")}
                            className="flex items-center gap-1"
                        >
                            <FaUserCircle />
                            My Profile
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    );
}

export default MobileMenu;
