import React, { useState } from "react";
import { toast } from "react-toastify";

import { Register } from "../../components";
import api from "../../utils/api";

const RegisterContainer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const createAccount = async () => {
    const userObj = {
      email,
      password,
      name,
    };

    try {
      await api.post("signup", userObj);
      toast.success("Usuário cadastrado com sucesso!");
    } catch {
      toast.error("Erro ao cadastrar!");
    }
  };

  return (
    <Register
      {...{
        name,
        email,
        password,
        hasError: false,
        setEmail,
        setPassword,
        setName,
        createAccount,
      }}
    />
  );
};

export default RegisterContainer;
