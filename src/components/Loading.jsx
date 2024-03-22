import React from "react";
import { CgSpinner } from "react-icons/cg";

function Loading({ className = "" }) {
    return (
        <div
            className={`relative min-h-screen flex items-center justify-center ${className}`}
        >
            <div className="animate-spin">
                <CgSpinner className="text-4xl" />
            </div>
        </div>
    );
}

export default Loading;
