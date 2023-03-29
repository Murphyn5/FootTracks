import React from "react";
import "./Footer.css"
import logo from "../../assets/LittleFoot.png";

const Footer = () => {
    return (
        <>

            <div id="main-footer" className="main-footer">
                <div className="main-footer-container">
                    <img className="logo-image" src={logo} alt="logo"></img>
                    <div>© 2023 Nick Murphy</div>
                    <div className="main-footer-row">
                        <a href="https://github.com/Murphyn5">
                            <i className="fa-brands fa-github main-footer-icon"></i>
                        </a>

                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <a href="https://linkedin.com/in/nicholas-murphy-1167b226b">
                            <i className="fa-brands fa-linkedin main-footer-icon"></i>
                        </a>

                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <a href="https://discordapp.com/users/646099988429930502.">
                            <i className="fa-brands fa-discord main-footer-icon"></i>
                        </a>

                    </div>
                    <a href="https://nicklimurphy.netlify.app/" style={{ color: "rgb(0,0,0,.8)" }}>About the developer</a>
                </div>
            </div>
        </>
    )
}

export default Footer
