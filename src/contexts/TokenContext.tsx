"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface TokenContextType {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export function TokenProvider({ children }: { children: ReactNode }) {
  const [token, setTokenState] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("github_token");
    }
    return null;
  });

  const setToken = (newToken: string) => {
    setTokenState(newToken);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("github_token", newToken);
    }
  };

  const clearToken = () => {
    setTokenState(null);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("github_token");
    }
  };

  return <TokenContext.Provider value={{ token, setToken, clearToken }}>{children}</TokenContext.Provider>;
}

export function useToken() {
  const context = useContext(TokenContext);
  if (context === undefined) {
    throw new Error("useToken must be used within a TokenProvider");
  }
  return context;
}
