import axios from "axios";
import { url } from "./api"

export const getallJob= async () => {
  return await axios.get(`${url}/jobs`);
};

export const getJobsOfRecruit = async (recruitId) => {
  return await axios.get(`${url}/jobs/get-job-of-recruit/${recruitId}`);
}

export const addJob = async (Job) => {
//   const token = localStorage.getItem('accessToken')
//   const config = {
//     headers: { Authorization: `Bearer ${token}` }
//   };

  return await axios.post(`${url}/jobs/`, Job);   //khi phân quyền sẽ thêm config
};

export const editJob = async (id, Job) => {
  return await axios.put(`${url}/jobs/${id}`, Job);
};

export const deleteJob = async (id) => {
  return await axios.delete(`${url}/jobs/${id}`);
};

