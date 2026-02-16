import { createContext, useContext, useState } from "react";

//const API = "https://fsa-jwt-practice.herokuapp.com/";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState();
  const [location, setLocation] = useState("GATE");

  fetch('https://fsa-jwt-practice.herokuapp.com/signup', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: "angela222",
      password: "secretsecret",
    }),
  });

  fetch("https://fsa-jwt-practice.herokuapp.com/authenticate", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const value = { location };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
