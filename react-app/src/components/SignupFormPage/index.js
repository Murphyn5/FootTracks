import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { signUp } from "../../store/session";
import "./SignupForm.css";
import { useEffect } from "react";
import background from "../../assets/SignUp.png";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [firstNameError, setFirstNameError] = useState("")
  const [lastNameError, setLastNameError] = useState("")
  const [birthdayError, setBirthdayError] = useState("")

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    setPasswordError("")
    setEmailError("")
    setFirstNameError("")
    setLastNameError("")
    setBirthdayError("")
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(
        signUp(firstName, lastName, email, gender, birthday, password)
      );
      if (data) {

        const validationErrors = data.join(",")
        if (validationErrors.includes('first_name : First name must be less than 24 characters.')) {
          setFirstNameError("max length 24")
        }
        if (validationErrors.includes('last_name : Last name must be less than 24 characters.')) {
          setLastNameError("max length 24")
        }
        if (validationErrors.includes('email : Email address is already in use.')) {
          setEmailError("Email address is already in use")
        }
        if (validationErrors.includes('Password must be at least 6 characters long.')) {
          setPasswordError("6 character minimum")
        }
        if (validationErrors.includes("Birthday can't be set beyond present date.")) {
          setBirthdayError("Invalid Date")
        }
      }
    } else {
      setPasswordError(
        "Passwords must match",
      );
    }
  };

  return (
    <div className="sign-up-page-wrapper" style={{ backgroundImage: `url(${background})` }}>
      <form className="sign-up-page-container" onSubmit={handleSubmit}>
        <h3 style={{ textAlign: "center", fontSize: "32px", marginTop: "0", fontWeight: "bold" }}>Join FootTracks today, it's Free.</h3>
        <div className="sign-up-page-names-labels">
          <div>
            First Name:
          </div>
          <div>
            Last Name:
          </div>
        </div>

        <div className="sign-up-page-names">
          <input
            type="text"

            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"

            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="sign-up-page-names-labels">
          {firstNameError ? <div><div className="signup-form-errors">{firstNameError}</div></div> : <div></div>}
          {lastNameError ? <div><div className="signup-form-errors">{lastNameError}</div></div> : null}
        </div>
        <div className="sign-up-page-names-labels">
          <div>
            Email:
          </div>
        </div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {emailError ? <><div className="signup-form-errors">{emailError}</div></> : null}

        <div className="sign-up-page-names-labels">
          <div>
            Gender:
          </div>
          <div>
            Birthday:
          </div>
        </div>
        <div className="sign-up-page-names">
          <select
            type="text"
            placeholder="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="" disabled={true}>--</option>
            <option value="male">Man</option>
            <option value="female">Woman</option>
            <option value="non-binary">Non-binary</option>
            <option value="prefer not to say">Prefer not to say</option>
          </select>
          <input
            type="date"
            placeholder="Birthday"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />
          <div></div>
          {birthdayError ? <><div className="signup-form-date-errors"><div className="col-span-2">{birthdayError}</div></div></> : null}
        </div>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {passwordError ? <><div className="signup-form-errors">{passwordError}</div></> : <><br></br></>}
        <div className="h-[35px]">
          <button className="signup-form-button" type="submit">
            Sign Up
          </button>
        </div>

        <div className="new-platepal-container">
          Already on FootTracks?{" "}
          <Link className="new-platepal-log-in" to="/login" >
            Log in
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignupFormPage;
