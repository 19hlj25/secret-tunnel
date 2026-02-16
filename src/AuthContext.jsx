import { createContext, useContext, useState } from "react";

//const API = "https://fsa-jwt-practice.herokuapp.com/";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState();
  const [location, setLocation] = useState("GATE");

  async function register(username) {
    const response = await fetch(
      "https://fsa-jwt-practice.herokuapp.com/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "angela222",
        }),
      },
    );

    const fetchresult = await response.json();
    if (response.ok) {
      setToken(fetchresult.token);
      setLocation("TABLET");
    } else {
      throw new Error(fetchresult.message);
    }
  }

  async function authenticate() {
    const response = await fetch(
      "https://fsa-jwt-practice.herokuapp.com/authenticate",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const fetchresult = await response.json();
    if (response.ok){
      setLocation("TUNNEL");
      }
      else {
        throw new Error(fetchresult.message);
      }
  }

  const value = { location, register, authenticate };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
