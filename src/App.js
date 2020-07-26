import React, { useState, useEffect } from "react";
import api from "./api";

const App = () => {
  const [appState, setAppState] = useState({
    display: "hide",
    isLoggedIn: false,
    user: null,
    loading: false,
  });
  const [formState, setFormState] = useState({
    username: "",
    password: "",
    display: "show",
  });

  useEffect(() => {
    (async () => {
      setAppState({ ...appState, loading: true });
      let accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        try {
          const res = await api.getProtected();
          console.log(res.data);
          setAppState({
            ...appState,
            display: "show",
            isLoggedIn: true,
            user: res.data.user,
            loading: false,
          });
          setFormState({ ...formState, display: "hide" });
        } catch (error) {
          console.error(error);
          alert(error.response.data.error);
          setAppState({ ...appState, loading: false });
        }
      }
    })();
  }, []);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      setAppState({ ...appState, loading: true });
      switch (e.target.name) {
        case "Login":
          res = await api.login(formState);
          break;
        case "Signup":
          res = await api.signup(formState);
          break;
      }
      let { accessToken, refreshToken } = res.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      window.location.reload();
    } catch (error) {
      console.error(error);
      setAppState({ ...appState, loading: false });
      alert(error.response.data.error);
    }
  };

  const handleLogout = async () => {
    try {
      setAppState({ ...appState, loading: true });
      let refreshToken = localStorage.getItem("refreshToken");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      await api.logout(refreshToken);
      window.location.reload();
    } catch (error) {
      console.error(error);
      setAppState({ ...appState, loading: false });
      alert(error.response.data.error);
    }
  };

  return (
    <div className="App">
      <div className={`${formState.display} form-container`}>
        <legend className="caption">Login/Signup form:</legend>
        <form className="login-form">
          <label className="form-label">Username :</label>
          <input
            type="text"
            name="username"
            value={formState.username}
            onChange={(e) => handleChange(e)}
            placeholder="Enter your user name"
            className="form-field"
            autoComplete="off"
          />
          <br />
          <br />
          <label className="form-label">Password :</label>
          <input
            type="password"
            name="password"
            value={formState.password}
            onChange={(e) => handleChange(e)}
            placeholder="Enter your password"
            className="form-field"
            autoComplete="off"
          />
          <br />
          <br />
          <button
            type="submit"
            className="form-btn"
            name="Login"
            onClick={(e) => handleSubmit(e)}
          >
            Log In
          </button>
          <button
            type="submit"
            className="form-btn"
            name="Signup"
            onClick={(e) => handleSubmit(e)}
          >
            Sign Up
          </button>
        </form>
      </div>
      {!appState.loading && (
        <div className={`${appState.display} user-info`}>
          <p>Logged in user:</p>
          <h4>{appState.isLoggedIn && appState.user.username}</h4>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      )}
    </div>
  );
};

export default App;
