import { createContext, useState } from "react";

export const ActiveContext = createContext(null);

export const ActiveProvider = ({ children }) => {
    const [active, setActive] = useState("profile-admin");

    return (
        <ActiveContext.Provider value={{ active, setActive }}>
            {children}
        </ActiveContext.Provider>
    );
};

export default ActiveProvider;