import React from "react";
import logo from "../Logo/BlissFulBlogger.png";

function Logo({ width = "100%", className = "" }) {
    return (
        <div className={className}>
            <h1>BlissFulBlogger</h1>
        </div>
    );
}

export default Logo;
