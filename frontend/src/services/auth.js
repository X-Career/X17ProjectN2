import axios from "axios";
import { url } from "./api";


export const signUp = async (user) => {
  return await axios.post(`${url}/auth/signup/`, user);
};

export const signIn = async (user) => {
  return await axios.post(`${url}/auth/signin/`, user);
};

export const editUser = async (id, user) => {
  return await axios.put(`${url}/auth/${id}`, user);
};


export const logOut = async (user) =>{
  return await axios.post(`${url}/auth/logout/`, user);
}