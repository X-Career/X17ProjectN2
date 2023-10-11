import React from "react";
import { animated, useSpring } from '@react-spring/web'
import { Button } from "antd";
import { CaretRightOutlined } from '@ant-design/icons';

const contentStyle = {
    height: '100vh',
    width: '100%',
    color: '#fff',
    lineHeight: '160px',
    position: 'relative',
    objectFit: 'cover',
};
const HomeAfterLogin = () => {
    const top_text = useSpring({
        from: { opacity: 0, top: '100px' },
        to: { opacity: 1, top: '320px' },
        config: { duration: 700 }
    })

    const line = useSpring({
        from: { width: '0px', top: '450px' },
        to: { width: '400px' },
        config: { duration: 800 }
    })

    const bot_text = useSpring({
        from: { opacity: 0, bottom: '100px' },
        to: { opacity: 1, bottom: '390px' },
        config: { duration: 700 }
    })

    const opacity_img = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        config: { duration: 700 }
    })

    setTimeout(() => {
        var string = "Be all you can be.";
        var str = string.split("");
        var el = document.getElementById('str');
        (function animate() {
            str.length > 0 ? el.innerHTML += str.shift() : clearTimeout(running);
            var running = setTimeout(animate, 90);
        })();
    }, 800)

    return (
        <div className="home_main">
            <div className="home_icon">
                <img style={opacity_img} className="science" src="../images/science.png" />
            </div>
            <div className="home_icon">
                <img style={opacity_img} className="earth_globe" src="../images/earth-globe.png" />
            </div>
            <div className="home_icon">
                <img style={opacity_img} className="light_bulb" src="../images/light-bulb.png" />
            </div>
            <div className="home_icon">
                <img style={opacity_img} className="pencil" src="../images/pencil.png" />
            </div>
            <div className="home_icon">
                <img style={opacity_img} className="magnifying_glass" src="../images/magnifying-glass.png" />
            </div>
            <img style={contentStyle} src="../images/about-bg.jpg" />
            <div className="home_content">
                <animated.div style={top_text} class="text_box">
                    <div class="top">E-learning</div>
                    <div class="bottom" aria-hidden="true">E-learning</div>
                </animated.div>
                <animated.div style={line} className="home_line"></animated.div>
                <animated.div style={bot_text} class="small_box">
                    <h3>Metaverte</h3>
                </animated.div>
                <div className="play_box">
                    <div className="circle-container">
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                    </div>
                    <Button type="primary" shape="circle" className="play_button" icon={<CaretRightOutlined />} size={'large'} />
                </div>
                <animated.div className="flex-center">
                    <p id="str"></p>
                </animated.div>
            </div>
        </div>
    )
};
export default HomeAfterLogin;
