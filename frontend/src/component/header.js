import { Row, Col, Button, Dropdown, Space } from "antd"
import { Link } from "react-router-dom";

const Header = () =>{
    const items = [
        {
            label: <b>Quyên Nguyễn</b>,
            key: '0',
        },
        {
            label: <p className="font-14">Member</p>,
            key: '1',
        }
        ,
        {
            type: 'divider',
        },
        {
            label: <a style={{marginTop: '3rem'}} href="my-profile">My profile</a>,
            key: '2',
        },
        {
            label: <a href="/login">Log out</a>,
            key: '3',
        },

    ];
    return (
        <div className="w-100 header_box">
            <Row justify="space-evenly">
                <Col span={8}><Link style={{ alignItems: 'center', display: 'flex', height: '100%'}} to={'/'}><img src="../images/logo.webp" style={{ width: '120px' }} /></Link></Col>
                <Col span={8} style={{display: 'flex', alignItems: 'center'}}>
                    <Button className="header_btn">Home</Button>
                    <Button className="header_btn">Job</Button>
                    <Button className="header_btn">About US</Button>
                    <Dropdown
                        menu={{
                            items,
                        }}
                        trigger={['click']}
                    >
                        <a onClick={(e) => e.preventDefault()} style={{ marginLeft: '2rem'}}>
                            <Space>
                                <img src="https://res.cloudinary.com/dz96u1u2a/image/upload/v1683774881/d970d56d5350d2624041937de985370c_fzbyaf.jpg" style={{width: '50px', borderRadius: '100%'}} />
                            </Space>
                        </a>
                    </Dropdown>
                </Col>
            </Row>

        </div>
    )
}

export default Header