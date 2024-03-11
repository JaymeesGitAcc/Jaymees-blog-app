import React from "react";
import Container from "../container/Container";
import Logo from "../Logo";
import { Link, NavLink } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";
import { useSelector } from "react-redux";

function Header() {
    const authStatus = useSelector((state) => state.auth.status);

    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true,
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All blogs",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
    ];

    return (
        <header className="sticky top-0 left-0 w-full shadow z-20 bg-white">
            <Container>
                <nav className="flex items-center min-h-[80px] max-w-[1200px] mx-auto">
                    <div>
                        <Link to="/">
                            <Logo />
                        </Link>
                    </div>
                    <ul className="hidden gap-10 ml-auto md:flex">
                        {navItems.map(
                            (item) =>
                                item.active ? (
                                    <li
                                        key={item.name}
                                        className="duration-200 text-slate-800 font-semibold hover:text-[#29ca8e]"
                                    >
                                        <NavLink
                                            to={item.slug}
                                            className={({ isActive }) =>
                                                isActive
                                                    ? "text-[#29ca8e]"
                                                    : undefined
                                            }
                                        >
                                            {item.name}
                                        </NavLink>
                                    </li>
                                ) : null
                            // hover:bg-[#29ca8e] hover:text-white p-4
                        )}
                        {authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    );
}

export default Header;
