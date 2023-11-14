import axios from "axios";
import { url } from "./api";


export const signUp = async (user) => {
  return await axios.post(`${url}/auth/signup/`, user);
};

export const signIn = async (user) => {
  return await axios.post(`${url}/auth/signin/`, user);
};

export const getUser = async (id) => {
  return await axios.get(`${url}/auth/getUser/${id}`);
};

export const editUser = async (id, user) => {
  return await axios.put(`${url}/auth/${id}`, user);
};

export const updateInfo = async (id, userInfo) => {
  return await axios.put(`${url}/auth/updateInfo/${id}`, userInfo);
};

export const updatePassword = async (id, passwordData) => {
  return await axios.put(`${url}/auth/updatePassword/${id}`, passwordData);
};


export const logOut = async (user) =>{
  return await axios.post(`${url}/auth/logout/`, user);
}