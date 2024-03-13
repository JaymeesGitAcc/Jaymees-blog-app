import React, { useEffect } from "react";
import appwriteService from "../appwrite/config.js";
import { Link } from "react-router-dom";

import { FaCalendar, FaUser } from "react-icons/fa";

import parse from "html-react-parser";

function Card({
    $id,
    $createdAt,
    title,
    featuredImage,
    author,
    className = "flex items-center md:block",
    widthFull = true,
}) {
    const dateObj = new Date($createdAt);
    const addedOn = `${dateObj.getDate()}/${
        dateObj.getMonth() + 1
    }/${dateObj.getFullYear()}`;

    return (
        <Link to={`/post/${$id}`}>
            <article
                className={`bg-white shadow-lg overflow-hidden duration-300 hover:-translate-y-1 hover:shadow-xl ${className}`}
            >
                <div
                    className={`w-[30%] ${widthFull ? "md:w-full" : undefined}`}
                >
                    <img
                        src={appwriteService.getFilePreview(featuredImage)}
                        alt={title}
                        className="block object-cover w-full h-[110px] md:h-auto"
                    />
                </div>

                <div
                    className={`w-[70%] p-4 ${
                        widthFull ? "md:w-full" : undefined
                    }`}
                >
                    <h3 className="text-sm font-semibold text-slate-800 mb-1 md:text-xl">
                        {title}
                    </h3>

                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                        <FaUser />
                        <p>{author}</p>
                        <FaCalendar />
                        <p>{addedOn}</p>
                    </div>
                </div>
            </article>
        </Link>
    );
}

export default Card;
