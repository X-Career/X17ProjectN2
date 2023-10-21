import React from "react";
import JobList from "../component/job/jobs";
import Header from "../component/header";
import Footer from "../component/footer";

const Job = () =>{
    return (
        <div className="wraaper">
            <Header/>
            <JobList/>
            <Footer/>
        </div>
    )
}

export default Job