import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth.js";
import { logout } from "../../store/authSlice.js";
import { MdLogout } from "react-icons/md";

function LogoutBtn({ className = "" }) {
    const dispatch = useDispatch();

    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout());
        });
    };
    return (
        <button className={className} onClick={logoutHandler}>
            <MdLogout />
            Logout
        </button>
    );
}

export default LogoutBtn;
