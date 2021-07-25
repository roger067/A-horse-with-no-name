import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Login } from "../../components";
import api from "../../utils/api";

const LoginContainer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(false);
  const history = useHistory();

  const handleLogin = async () => {
    try {
      const request = await api.post("login", { email, password });
      const { user, token } = request.data;

      Object.keys(user).forEach((key) => {
        localStorage.setItem(`user:${key}`, user[key]);
      });

      localStorage.setItem("token", token);
      history.push("/");
    } catch {
      setHasError(true);
    }
  };

  return (
    <Login
      {...{
        email,
        password,
        setEmail,
        setPassword,
        hasError,
        handleLogin,
      }}
    />
  );
};

export default LoginContainer;
