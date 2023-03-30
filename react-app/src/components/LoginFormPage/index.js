import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, Redirect } from "react-router-dom";
import "./LoginForm.css";
import { useEffect } from "react";
import background from "../../assets/LoginBackRoundLeft.webp";
import background2 from "../../assets/LoginBackRoundRight.webp";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [loginError, setLoginError] = useState("")

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError("")
    const data = await dispatch(login(email, password));
    if (data) {

      setLoginError("Invalid Login")
    }
  };

  const demoSignIn = async (e) => {
    e.preventDefault();
    const data = await dispatch(login("marnie@aa.io", "password"));
    if (data) {
      setLoginError("Invalid Login")
    }

  };

  return (
    <div className="login-page-wrapper">
      <div className="background-image" style={{ backgroundImage: `url(${background2})` }}></div>
      <form className="login-page-container" onSubmit={handleSubmit}>
        <br></br>
        <h1>Log In</h1>

        {/* <ul className="login-form-errors">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul> */}

        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br></br>
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {loginError ? <div className="error">{loginError}</div> : <br></br>}
        <div className="new-platepal-container">
          New to FootTracks?{" "}
          <Link className="new-platepal-sign-up" to="/signup">
            Sign up
          </Link>
        </div>

        <br></br>
        <button
          className="login-form-button"
          type="submit"
        >
          Log In
        </button>
        <button
          className="demo-user-button"
          type="submit"
          onClick={(e) => demoSignIn(e)}
        >
          Continue with Demo User
        </button>
        <br></br>
        <br></br>
      </form>
      <div className="background-image" style={{ backgroundImage: `url(${background})` }}></div>
    </div>
  );
}

export default LoginFormPage;
