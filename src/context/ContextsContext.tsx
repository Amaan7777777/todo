// src/context/ContextsContext.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";
import { demoContexts } from "../data/demoContexts";

interface ContextsContextType {
  contexts: string[];
  setContexts: React.Dispatch<React.SetStateAction<string[]>>;
}

const ContextsContext = createContext<ContextsContextType | undefined>(
  undefined
);

export const ContextsContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [contexts, setContexts] = useState<string[]>(demoContexts);

  return (
    <ContextsContext.Provider value={{ contexts, setContexts }}>
      {children}
    </ContextsContext.Provider>
  );
};

export const useContextsContext = () => {
  const context = useContext(ContextsContext);
  if (!context) {
    throw new Error(
      "useContextsContext must be used within a ContextsContextProvider"
    );
  }
  return context;
};
