import { useReducer } from "react";
import { createContext, useEffect } from "react";
import { getallCandidate } from "../services/candidate";

export const CandidateContext = createContext();

const initialState = {
    isLoading: false,
    isError: false,
    candidates: [],
    featureCandidate: [],
    isCandidateLoading: false,
    singleCandidate: {},
}

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_LOADING": 
            return {
                ...state,
                isLoading: true,
            };
        case "SET_API_DATA":
            const featureData = action.payload.filter((curElem) => {
                return curElem.featured === true;
            });
            return {
                ...state,
                isLoading: false,
                candidates: action.payload,
                featureCandidate: featureData,
            }
        case "API_ERROR":
            return {
                ...state,
                isLoading: false,
                isError: true,
            }
        case "SET_SINGLE_LOADING":
            return {
                ...state,
                isCandidateLoading: true,
            };
        case "SET_SINGLE_PRODUCT":
            return {
                ...state,
                isCandidateLoading: false,
                singleCandidate: action.payload,
            }
        case "SET_SINGLE_ERROR":
            return {
                ...state,
                isCandidateLoading: false,
                isError: true,
            }
        default:
            return state;
    }
}


const CandidateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const getCandidates = async () => {
        dispatch({ type: "SET_LOADING" })
        try {
            const response = await getallCandidate();
            const candidates = await response.data.candidate;
            dispatch({ type: "SET_API_DATA", payload: candidates });
        } catch (error) {
            dispatch({ type: "API_ERROR" })
        }

    }

    const getSingleCandidate = async () => {
        dispatch({ type: "SET_SINGLE_LOADING" });
        try {
            const response = await getallCandidate();
            const singleCandidate = await response.data.candidate;
            dispatch({ type: "SET_SINGLE_PRODUCT", payload: singleCandidate[0] });
        } catch (error) {
            dispatch({ type: "SET_SINGLE_ERROR" })
        }
    }

    useEffect(() => {
        getCandidates();
    }, [])

    return <CandidateContext.Provider value={{ ...state, getSingleCandidate }}>
        {children}
    </CandidateContext.Provider>
};


export default CandidateProvider