//App.js
import axios from "axios";
import "./style/App.css";
import React, { useState, useEffect } from "react";
import Login from "./Login";
import Landing from "./Landing";
import { useTheme } from "@chakra-ui/react";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const theme = useTheme();

  const apiCallTest = () => {
    axios
      .get("http://localhost:8080")
      .then((response) => {
        const data = response.data;
        console.log(data);
      })
      .catch((error) => {
        console.error("Error making API call:", error);
      });
  };

  const apiCallDataBase = () => {
    const credentials = { username: "guest", password: "password" };
    axios
      .post("http://localhost:8080/getUser", credentials)
      .then((response) => {
        const data = response.data;
        console.log(data);
        setUsername(data.username);
        setPassword(data.password);
      })
      .catch((error) => {
        console.error("Error making API call:", error);
      });
  };

  const showCurrentUserNameAndPassword = () => {
    console.log("Current User:", username);
    console.log("Current Password:", password);
  };

  const handleSuccessfulLogin = () => {
    const loginData = {
      //TODO: when we add auth token tables & set up token tables in db
      //token: 'your-auth-token',
      expiration: Date.now() + 3600000, //expires in 1 hour
    };
    localStorage.setItem("loginData", JSON.stringify(loginData));
    setLoggedIn(true);
  };

  const handleSuccessfulLogout = () => {
    localStorage.removeItem("loginData");
    setLoggedIn(false);
  };

  const checkLoginStatus = () => {
    const loginData = JSON.parse(localStorage.getItem("loginData"));

    if (loginData && loginData.expiration > Date.now()) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {loggedIn ? (
          <Landing onLogout={handleSuccessfulLogout}></Landing>
        ) : (
          // <button onClick={apiCallTest}>Make API Call</button>
          // <button onClick={apiCallDataBase}>Get Database</button>
          // <button onClick={showCurrentUserNameAndPassword}>
          //   Show Current User and Password
          // </button>
          <Login onLogin={handleSuccessfulLogin} />
        )}
      </header>
    </div>
  );
}

export default App;
