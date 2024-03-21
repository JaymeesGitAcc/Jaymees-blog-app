import React from "react";
import { Login as LoginComponent } from "../components/index";
import Animate from "../components/Animate";

function Login() {
    return (
        <Animate className="md:py-8">
            <LoginComponent />
        </Animate>
    );
}

export default Login;
