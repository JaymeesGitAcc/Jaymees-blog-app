import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";
import { FaBookReader, FaEdit, FaRegClock } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function FlexCard({ title, featuredImage, $id, onDelete, getNumberOfDays }) {
    return (
        <div
            key={featuredImage}
            className="flex items-center my-4 shadow-md shadow-gray-300 overflow-hidden rounded-lg"
        >
            <div className="w-[20%] h-full overflow-hidden">
                <img
                    src={appwriteService.getFilePreview(featuredImage)}
                    alt={title}
                    className="block w-full h-full"
                />
            </div>

            <div className="w-[80%] p-4 space-y-1">
                <Link
                    to={`/post/${$id}`}
                    className="font-bold text-slate-800 duration-300 hover:text-[#29ca8e] sm:text-lg md:text-xl"
                >
                    {title}
                </Link>

                <div className="flex items-center gap-1 text-slate-500">
                    <FaRegClock />
                    <h2 className="text-sm">{getNumberOfDays()} days ago</h2>
                </div>

                <div className="flex items-center gap-4 font-semibold text-sm">
                    <div className="group">
                        <Link
                            to={`/post/${$id}`}
                            className="flex items-center gap-1 text-[#29ca8e] duration-300 group-hover:text-[#187552]"
                        >
                            <FaBookReader className="text-[#29ca8e] duration-300 group-hover:text-[#187552]" />
                            Read Post
                        </Link>
                    </div>

                    <div className="flex items-center overflow-hidden">
                        <button
                            className="inline-block rounded-md group flex items-center border border-[#ff1000] p-2 duration-300 hover:bg-[#ff1000] hover:text-white"
                            onClick={onDelete}
                        >
                            <MdDelete className="text-[#ff1000] text-md group-hover:text-white font-semibold" />
                        </button>
                    </div>

                    <Link to={`/edit-post/${$id}`}>
                        <div className="flex items-center rounded-md border border-green-500 p-2 group duration-300 hover:bg-green-500">
                            <FaEdit className="text-[#29ca8e] text-md duration-300 group-hover:bg-green-500 group-hover:text-white" />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default FlexCard;
