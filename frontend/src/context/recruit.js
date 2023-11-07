import { createContext, useState } from "react";

export const RecruitContext = createContext(null);

export const RecruitProvider = ({ children }) => {
    const [recruit, setRecruit] = useState({})
    return (
        <RecruitContext.Provider value={{ recruit, setRecruit }}>
            {children}
        </RecruitContext.Provider>
    );
};

export default RecruitContext;