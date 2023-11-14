import { createContext, useState } from "react";

export const CandidateContext = createContext(null);

export const CanidateProvider = ({ children }) => {
    const [candidate, setCandidate] = useState({});

    return (
        <CandidateContext.Provider value={{ candidate, setCandidate }}>
            {children}
        </CandidateContext.Provider>
    );
};

export default CanidateProvider;