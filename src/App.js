import React from "react";

const App = () => {
  return (
    <div className="form-container">
      <legend className="caption">Login/Signup form:</legend>
      <form className="login-form">
        <label className="form-label">Username :</label>
        <input
          type="text"
          name="username"
          placeholder="Enter your user name"
          className="form-field"
        />
        <br />
        <br />
        <label className="form-label">Password :</label>
        <input
          type="text"
          name="password"
          placeholder="Enter your password"
          className="form-field"
        />
        <br />
        <br />
        <button type="submit" className="form-btn">
          Log In
        </button>
        <button type="submit" className="form-btn">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default App;
