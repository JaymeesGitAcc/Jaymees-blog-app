import React from "react";

function Loading({ className = "", ...props }) {
    return (
        <div className="relative min-h-screen flex items-center justify-center">
            <h1>loading...</h1>
        </div>
    );
}

export default Loading;
