import HomeAfterLogin from "../component/home/home_after_login"
import Header from "../component/header"
import Footer from "../component/footer"
import SwiperPartner from "../component/home/partner"
import Service from "../component/home/service_home"

const Home = () => {
    return (
        <div className="home-box">
            <Header />
            <HomeAfterLogin />
            <Service/>
            <SwiperPartner/>
            <Footer/>
           
        </div>
    )
}

export default Home