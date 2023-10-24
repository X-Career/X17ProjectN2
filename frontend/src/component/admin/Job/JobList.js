import React, { useEffect, useState } from 'react';
import { Button, Layout, theme, message, Modal, Table, Row} from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import PopupCreate from './PopupCreate';
import { getallJob } from '../../../services/job';
const { Content } = Layout;


const JobMgr = () => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false);

    const getAllJob = async() =>{
        setLoading(true)
        try {
            const res = await getallJob();
            setData(res.data.datas.docs)
            setLoading(false)
        } catch (e) {
            console.log("Error: ", e.message);
        }
    }

    useEffect(() =>{
        getAllJob();
    }, [])

    const columns = [
        {
            title: '#',
            dataIndex: 'index',
            key: 'index',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: ' name',
        },
        {
            title: 'Position',
            dataIndex: 'position',
            key: 'position',
        },
        {
            title: 'Salary',
            dataIndex: 'salary',
            key: 'salary',
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
        },
        {
            title: 'Requirement',
            dataIndex: 'req',
            key: 'requirement',
            render: (req) => <span className='text-column'>{req}</span>
        },
        {
            title: 'Description',
            dataIndex: 'des',
            key: 'description',
            render: (des) => <span className='text-column'>{des}</span>
        },
    ];
  
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const toggleOpen = () =>{
        setOpen(!open)
    }
    return (
        <Content
            style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: '80vh',
                background: colorBgContainer,
            }}
        >
            <div>
                <Row justify='space-between' style={{marginBottom: '15px'}}>
                    <h2>JOB LIST</h2>
                    <Button onClick={toggleOpen} icon={<PlusCircleOutlined/>}>Create</Button>
                </Row>
                <Table 
                dataSource={data} 
                columns={columns} 
                loading={loading}
                />

                {open && <PopupCreate handleClose={toggleOpen} refresh={getAllJob}/>}
            </div>
        </Content>
    );
}
export default JobMgr



