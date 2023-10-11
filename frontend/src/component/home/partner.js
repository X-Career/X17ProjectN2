import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
const SwiperPartner = () =>{
    return (
        <div className="flex-center">
            <div className="swiper_partner">
                <Swiper
                    slidesPerView={4}
                    centeredSlides
                    onSlideChange={() => console.log("slide change")}
                    onSwiper={swiper => console.log(swiper)}
                >
                    <SwiperSlide className="partner_item">
                        <img src="../images/Partner/scb.webp" width={150} />
                    </SwiperSlide>
                    <SwiperSlide className="partner_item">
                        <img src="../images/Partner/pnj.webp" width={150} />
                    </SwiperSlide>
                    <SwiperSlide className="partner_item">
                        <img src="../images/Partner/sabeco.webp" width={150} />
                    </SwiperSlide>
                    <SwiperSlide className="partner_item">
                        <img src="../images/Partner/vcsc.webp" width={150} />
                    </SwiperSlide>
                    <SwiperSlide className="partner_item">
                        <img src="../images/Partner/viet_a.png" width={150} />
                    </SwiperSlide>
                    <SwiperSlide className="partner_item">
                        <img src="../images/Partner/vitadairy.webp" width={150} />
                    </SwiperSlide>
                    <SwiperSlide className="partner_item">
                        <img src="../images/Partner/golden_gate.png" width={150} />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    )
}

export default SwiperPartner