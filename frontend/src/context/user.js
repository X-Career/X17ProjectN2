import { createContext, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const {lastName, role} = user;
    return (
        <UserContext.Provider value={{ active, setActive }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;