import React from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config.js";
import { FaArrowRight, FaUser } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";

function PostCard({
    $id,
    $createdAt,
    title,
    featuredImage,
    genre,
    author,
    className = "",
    titleSize = "text-md",
    showArrow = true,
}) {
    const dateObj = new Date($createdAt);
    const addedOn = `${dateObj.getDate()}/${
        dateObj.getMonth() + 1
    }/${dateObj.getFullYear()}`;

    return (
        <article
            className={`w-full bg-white overflow-hidden shadow-lg shadow-slate-300 ${className}`}
        >
            <Link to={`/post/${$id}`}>
                <div className="group relative w-full h-full overflow-hidden after:absolute after:inset-0 after:bg-black after:opacity-40">
                    <img
                        src={appwriteService.getFilePreview(featuredImage)}
                        alt={title}
                        className="h-full w-full object-cover duration-300 scale-105 group-hover:scale-100"
                    />
                    <div className="absolute bottom-4 left-4 right-2 text-slate-100 font-semibold z-20">
                        <div className={`text-white my-2 ${titleSize}`}>
                            <h1>{title}</h1>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <FaUser />
                            <h3>{author}</h3>
                            <FaCalendarAlt />
                            <h3>{addedOn}</h3>
                        </div>
                    </div>
                    {showArrow && (
                        <div className="absolute h-8 w-8 z-20 bg-[#29ca8e] text-white rounded-full flex items-center justify-center top-[50%] opacity-0 right-10 duration-300 -translate-y-[50%] group-hover:opacity-100 group-hover:right-5">
                            <i>
                                <FaArrowRight />
                            </i>
                        </div>
                    )}
                </div>
            </Link>
        </article>
    );
}

export default PostCard;
