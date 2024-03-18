import React, { createContext, useContext, useReducer, useState } from "react";

export const UpdateContext = createContext();

export const UpdateProvider = ({ children }) => {
  const [flag, setFlag] = useState(false);
  return (
    <UpdateContext.Provider value={{ flag, setFlag }}>
      {children}
    </UpdateContext.Provider>
  );
};

export const useUpdateFlag = () => useContext(UpdateContext);
