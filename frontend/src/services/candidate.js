import axios from "axios";
import { url } from "./api"

export const getallCandidate = async (id, recruitId) => {
  id = id || "";
  recruitId = recruitId || "";
  return await axios.get(`${url}/candidates/?id=${id}&recruitId=${recruitId}`);
};


export const getallCandidate2 = async (id, recruitId) => {
  id = id || "";
  recruitId = recruitId || "";
  return await axios.get(`${url}/candidates/${id}`);
};



export const getCandidateOfRecruit = async (recruitId) =>{
  return await axios.get(`${url}/candidates/get-candidate-of-recruit/${recruitId}`);
}

export const getMyHistory = async (userId) => {
  return await axios.get(`${url}/candidates/get-my-history/${userId}`);
}



export const addCandidate = async (Candidate) => {
//   const token = localStorage.getItem('accessToken')
//   const config = {
//     headers: { Authorization: `Bearer ${token}` }
//   };

  return await axios.post(`${url}/candidates/`, Candidate);   //khi phân quyền sẽ thêm config
};

export const editCandidate= async (id, Candidate) => {
  return await axios.put(`${url}/candidates/${id}`, Candidate);
};

export const deleteCandidate = async (id) => {
  return await axios.delete(`${url}/candidates/${id}`);
};