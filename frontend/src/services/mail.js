import axios from "axios";
import { url } from "./api"


export const sendMail = async (SendMail) => {
//   const token = localStorage.getItem('accessToken')
//   const config = {
//     headers: { Authorization: `Bearer ${token}` }
//   };

  return await axios.post(`${url}/mails/`, SendMail);   //khi phân quyền sẽ thêm config
};
