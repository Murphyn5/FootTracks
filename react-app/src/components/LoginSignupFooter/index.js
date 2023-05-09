import React from "react";
import "./Footer.css"
import logo from "../../assets/LittleFootWhite.png";

const LoginSignupFooter = () => {
    return (
        <>
            <div className="login-footer">

                <div className="login-footer-container">
                <br></br>
                <br></br>
                <br></br>
                    <img className="logo-image h-[80px]" src={logo} alt="logo"></img>
                    <div>© 2023 Nick Murphy</div>
                    <div className="login-footer-row">
                        <a href="https://github.com/Murphyn5">
                            <i className="fa-brands fa-github login-footer-icon"></i>
                        </a>

                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <a href="https://linkedin.com/in/nicholas-murphy-1167b226b">
                            <i className="fa-brands fa-linkedin login-footer-icon"></i>
                        </a>

                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <a href="https://discordapp.com/users/646099988429930502.">
                            <i className="fa-brands fa-discord login-footer-icon"></i>
                        </a>

                    </div>
                    <a className="login-footer-link" href="https://nicklimurphy.netlify.app/" style={{ color: "rgb(0,0,0,.8)" }}>About the developer</a>
                </div>
            </div>
        </>
    )
}

export default LoginSignupFooter
