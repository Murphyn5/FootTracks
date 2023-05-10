import React from "react";
import "./Footer.css"
import logo from "../../assets/LittleFootWhite.png";

const LoginSignupFooter = () => {
    return (
        <>
            <div id="login-footer" className="login-footer">
                <div className="login-footer-container">
                    <div className="login-footer-row">
                        <div className="h-[50px]" style={{ display: "flex", alignItems: "center", color: "#ea547f" }}>
                            <img className="h-[50px] logo-image" src={logo} alt="logo"></img>
                        </div>
                        &nbsp;&nbsp;
                        <div>© 2023 Nick Murphy</div>
                    </div>
                    <br></br>
                    <div className="login-footer-row">
                        <a
                            className="social-icon"
                            href="https://www.linkedin.com/in/nicholas-murphy-1167b226b/"
                        >
                            <i className="fab fa-linkedin-in login-footer-icon"></i>
                        </a>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <a className="social-icon" href="https://github.com/Murphyn5">
                            <i className="fab fa-github login-footer-icon"></i>
                        </a>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <a className="social-icon" href="https://murphyn5.github.io/">
                            <i className="fas fa-user-circle login-footer-icon"></i>
                        </a>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <a className="social-icon" href="mailto:nlimurphy@gmail.com">
                            <i className="fa-solid fa-envelope login-footer-icon"></i>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginSignupFooter
