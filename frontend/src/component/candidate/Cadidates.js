// import React, { useEffect, useState } from "react";
// import { getallCandidate } from "../../services/candidate";
// import { Empty, Spin } from "antd";

const Candidates = () =>{
    return <></>
//     const [loading, setLoading] = useState(true);
//     const [data, setData] = useState([])


//     const getAllCandidate = async () =>{
//         try{
//             const res = await getallCandidate();
//             if(res.status === 200){
//                 console.log(res.data);
//             }

//             setLoading(false)

//         }catch(e){
//             console.log("Error: ", e.message);
//         }
//     }

//     useEffect(() =>{
//         getAllCandidate()
//     }, [])


//     return (
//         <div className="wrraper">
//             {
//                 loading ? (
//                     <div className="flex-center">
//                         <Spin/>
//                     </div>
//                 ) : (
//                     <>
//                         {data.length > 0 ? (<>
//                             {
//                                 data.map((item , key ) => {
//                                     return (
//                                         <div key={key}>{item.name}</div>
//                                     )
//                                 })
//                             }
//                         </>) : (
//                             <div className="flex-center">
//                                 <Empty/>
//                             </div>
//                         )}
//                     </>
//                 ) 

//             }

//         </div>
//     )
}

export default Candidates