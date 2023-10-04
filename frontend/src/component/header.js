import { Row, Col, Button, Dropdown, Space } from "antd"
import { Link } from "react-router-dom";

const Header = () =>{
    const items = [
        {
            label: <link to="my-profile">My profile</link>,
            key: '0',
        },
        {
            label: <Link to="/login">Log out</Link>,
            key: '1',
        },
    
    ];
    return (
        <div className="w-100">
            <Row>
                <Col span={12}><img src="../images/logo.webp" style={{ width: '150px', marginBottom: '32px' }} /></Col>
                <Col span={12}>
                    <Button>Home</Button>
                    <Button>Job</Button>
                    <Button>About US</Button>
                    <Dropdown
                        menu={{
                            items,
                        }}
                        trigger={['click']}
                    >
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                <img src="https://res.cloudinary.com/dz96u1u2a/image/upload/v1683774881/d970d56d5350d2624041937de985370c_fzbyaf.jpg" style={{width: '100px', borderRadius: '100%'}} />
                            </Space>
                        </a>
                    </Dropdown>
                </Col>
            </Row>

        </div>
    )
}

export default Header