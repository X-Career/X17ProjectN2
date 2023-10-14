import { Button } from "antd";
import { useNavigate } from "react-router-dom"

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className="not_found_box column-center">
            <img src="https://res.cloudinary.com/dz96u1u2a/image/upload/v1697274486/dgD8X5jR9c_neamai.png" />
            <Button className="not_found_btn" onClick={() => navigate('/')}>Go to home</Button>
        </div>
    )
}


export default NotFound