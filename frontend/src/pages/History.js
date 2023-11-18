import React from "react";
import Header from "../component/header";
import Footer from "../component/footer";
import MyApply from "../component/history/myApply";
const History = () =>{
    return (
        <div className="wraper">
            <Header />
            <MyApply />
            <Footer />
        </div>
    )
}

export default History