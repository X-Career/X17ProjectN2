import React from 'react';
import { Layout, theme} from 'antd';

const { Content } = Layout;


const JobMgr = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    JobMgr
                </Content>
    );
}
export default JobMgr



