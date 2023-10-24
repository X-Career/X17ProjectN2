import axios from "axios";
import { url } from "./api"

export const getallRecruitMgr = async (id) => {
  id = id || "";
  return await axios.get(`${url}/recruitmgrs/${id}`);
};

export const addRecruitMgr = async (RecruitMgr) => {
//   const token = localStorage.getItem('accessToken')
//   const config = {
//     headers: { Authorization: `Bearer ${token}` }
//   };

  return await axios.post(`${url}/recruitmgrs/`, RecruitMgr);   //khi phân quyền sẽ thêm config
};

export const editRecruitMgr= async (id, RecruitMgr) => {
  return await axios.put(`${url}/recruitmgrs/${id}`, RecruitMgr);
};

export const deleteRecruitMgr = async (id) => {
  return await axios.delete(`${url}/recruitmgrs/${id}`);
};