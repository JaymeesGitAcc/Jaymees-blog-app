import React from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config.js";
import { FaUser } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";

function PostCard({ $id, $createdAt, title, featuredImage, author }) {
    const dateObj = new Date($createdAt);
    const addedOn = `${dateObj.getDate()}/${
        dateObj.getMonth() + 1
    }/${dateObj.getFullYear()}`;

    return (
        <article className="w-full bg-white my-4 overflow-hidden shadow-xl">
            <Link to={`/post/${$id}`}>
                <div className="relative w-full overflow-hidden sm:h-[260px]">
                    <img
                        src={appwriteService.getFilePreview(featuredImage)}
                        alt={title}
                        className="h-full w-full object-cover duration-300 scale-105 hover:scale-100"
                    />
                    <div className="absolute bottom-4 left-4 text-slate-100 font-semibold flex items-center gap-2">
                        <FaUser />
                        <h3>{author}</h3>
                        <FaCalendarAlt />
                        <h3>{addedOn}</h3>
                    </div>
                </div>
            </Link>

            <section className="p-4">
                <Link to={`/post/${$id}`}>
                    <h2 className="first-letter:uppercase text-xl font-semibold text-slate-700 mb-4 duration-300 hover:text-[#29ca8e]">
                        {title}
                    </h2>
                </Link>

                <Link
                    to={`/post/${$id}`}
                    className="block text-center p-1 text-[#29ca8e] border-[1px] border-[#29ca8e] rounded-xl duration-300 hover:text-white hover:bg-[#29ca8e]"
                >
                    Read More
                </Link>
            </section>
        </article>
    );
}

export default PostCard;
