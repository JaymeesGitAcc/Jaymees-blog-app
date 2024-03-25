import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";
import { useSelector } from "react-redux";
import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaTwitter,
} from "react-icons/fa6";

function Footer() {
    const date = new Date();
    const currentYear = date.getFullYear();

    const authStatus = useSelector((state) => state.auth.status);

    const footerLinks = [
        {
            name: "Home",
            path: "/",
            active: true,
        },
        {
            name: "All Blogs",
            path: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            path: "/add-post",
            active: authStatus,
        },
        {
            name: "See Profile",
            path: "/profile",
            active: authStatus,
        },
        {
            name: "Login",
            path: "/login",
            active: !authStatus,
        },
        {
            name: "Create Account",
            path: "/signup",
            active: !authStatus,
        },
    ];

    const socialLinks = [
        {
            name: "facebook",
            path: "/",
            icon: <FaFacebookF />,
        },
        {
            name: "instagram",
            path: "/",
            icon: <FaInstagram />,
        },
        {
            name: "twitter",
            path: "/",
            icon: <FaTwitter />,
        },
        {
            name: "linkedin",
            path: "/",
            icon: <FaLinkedinIn />,
        },
    ];
    return (
        <footer className="p-4 bg-[#0c1a33]">
            <section className="w-[95%] max-w-[1200px] mx-auto">
                <div className="space-y-6 md:space-y-0 md:flex md:justify-between md:gap-4 md:my-4">
                    <article>
                        <Link to="/" className="inline-block">
                            <Logo className="text-green-500" />
                        </Link>
                        <p className="text-white text-sm">
                            Explore and create amazing blog posts!
                        </p>
                    </article>

                    <article>
                        <nav>
                            <h2 className="text-white font-bold text-lg border-l-[4px] border-[#2a59ae] pl-4">
                                Quick Links
                            </h2>
                            <ul className="my-4">
                                {footerLinks.map((item) =>
                                    item.active ? (
                                        <Link key={item.name} to={item.path}>
                                            <li className="text-gray-400 duration-300 hover:text-gray-300 px-4 py-2">
                                                {item.name}
                                            </li>
                                        </Link>
                                    ) : null
                                )}
                            </ul>
                        </nav>
                    </article>

                    <article>
                        <nav>
                            <h2 className="text-white font-bold text-lg border-l-[4px] border-[#2a59ae] pl-4">
                                Socials
                            </h2>
                            <h2 className="text-white font-semibold text-sm my-2">
                                Follow on Social Media
                            </h2>
                            <ul className="flex gap-4 my-4">
                                {socialLinks.map((item) => (
                                    <div key={item.name} className="group">
                                        <Link
                                            to="/"
                                            className="inline-block border rounded-lg p-2 duration-300 group-hover:bg-white"
                                        >
                                            <i className="text-white duration-300 group-hover:text-[#0c1a33]">
                                                {item.icon}
                                            </i>
                                        </Link>
                                    </div>
                                ))}
                            </ul>
                        </nav>
                    </article>
                </div>

                <div>
                    <p className="text-gray-600">
                        <span>&copy;</span>
                        {currentYear} BlissFulBlogger. All rights reserved.
                    </p>
                </div>
            </section>
        </footer>
    );
}

export default Footer;
