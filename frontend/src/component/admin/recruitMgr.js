import { Layout, Select, theme } from 'antd';
import { DeleteOutlined, EditOutlined, MailOutlined, SearchOutlined } from '@ant-design/icons';
import React, { useContext, useEffect, useRef, useState} from 'react';
import Highlighter from 'react-highlight-words';
import { Button, Input, Space, Table } from 'antd';
import { Form, InputNumber, Popconfirm, Typography } from 'antd';
import "./Admin.css"
import { useNavigate } from 'react-router-dom';
import { ActiveContext } from '../../context/active_menu';
import RecruitList from './RecruitList';
import RecruitContext from '../../context/recruit';
import { getCandidateOfRecruit } from '../../services/candidate';
import { CandidateContext } from '../../context/candidate';
const { Content } = Layout;

const RecruitMgr = () => {
    const navigate = useNavigate()
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const { setActive } = useContext(ActiveContext)
    const searchInput = useRef(null);
    const { recruit } = useContext(RecruitContext)
    const { setCandidate } = useContext(CandidateContext) 
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [dataSource, setDataSource] = useState([])

    const getCanddidateTable = async () => {
        try {
          
            const res = await getCandidateOfRecruit(String(recruit))
            setDataSource(res.data.data)

        } catch (error) {
            console.log('Error:', error.message);
        }
    }

    useEffect(() => {
        getCanddidateTable()
    }, [recruit])

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    // EDIT DATA
    const [form] = Form.useForm();
    const mailPage = () => {
        setActive("mail-manager")
        navigate("/admin/mail-manager")

    }

    const handleUpdateCandidate = (row) =>{
        setCandidate(row)
        navigate("/admin/info")
    }


    const statusOption = ['Applying', 'Testing', 'Interviewing', 'Rejected'];

    const columns = [
        {
            title: 'ID',
            width: 50,
            dataIndex: '_id',
            key: '_id',
            fixed: 'left',
            ...getColumnSearchProps('id'),
            editable: true,
        },
        {
            title: 'Full Name',
            width: 150,
            dataIndex: 'userId',
            key: 'firstName',
            fixed: 'left',
            ...getColumnSearchProps('fullname'),
            editable: true,
            render: (userId, record) => <span>{userId.firstName} {' '}{userId.lastName}</span>
        },
        {
            title: 'Age',
            width: 60,
            dataIndex: 'userId',
            key: 'age',
            fixed: 'left',
            ...getColumnSearchProps('age'),
            editable: true,
            render: (userId) => <span>{userId.age}</span>
        },
        {
            title: 'Email',
            dataIndex: 'userId',
            key: 'email',
            width: 150,
            ...getColumnSearchProps('email'),
            editable: true,
            render: (userId) => <span>{userId.email}</span>
        },
        {
            title: 'Phone',
            dataIndex: 'userId',
            key: 'phone',
            width: 150,
            ...getColumnSearchProps('phone'),
            editable: true,
            render: (userId) => <span>{userId.phone}</span>
        },
        {
            title: 'Point',
            dataIndex: 'point',
            key: 'point',
            width: 80,
            ...getColumnSearchProps('point'),
            editable: true,
            align: 'center',
            render: (point) => <span>{point ? point : ' - '}</span>
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 120,
            ...getColumnSearchProps('status'),
            editable: true,
            render: (status) => <Select style={{ width: '100%' }} defaultValue={status}>
                {statusOption.map((item, key) => (
                    <Select.Option key={key} value={item}>{item}</Select.Option>
                ))}
            </Select>
        },
        {
            title: 'Date to intern',
            dataIndex: 'datetoInter',
            key: 'datetoInter',
            width: 100,
            ...getColumnSearchProps('datetoInter'),
            editable: true,
            align: 'center',
            render: (datetoInter) => <span>{datetoInter ? datetoInter : ' - '}</span>
        },
        {
            title: 'Result intern',
            dataIndex: 'result',
            key: 'result',
            width: 100,
            align: 'center',
            ...getColumnSearchProps('result'),
            editable: true,
            render: (result) => <span>{result ? result : ' - '}</span>
        },
        {
            title: 'Date to getjob',
            dataIndex: 'datetoGetjob',
            key: 'datetoGetjob',
            width: 100,
            align: 'center',
            ...getColumnSearchProps('datetoGetjob'),
            editable: true,
            render: (datetoGetjob) => <span>{datetoGetjob ? datetoGetjob : ' - '}</span>
        },
        {
            title: 'Action',
            key: 'operation',
            dataIndex: 'operation',
            fixed: 'right',
            width: 80,
            render: (_, record) => {
                return <div style={{ gap: "12px", display: "flex" }}>
                    <EditOutlined style={{ cursor: "pointer" }} onClick={() => handleUpdateCandidate(record)}/>
                    <MailOutlined 
                    onClick={() => mailPage()} 
                    style={{ cursor: "pointer" }}>
                    </MailOutlined>
                </div>
            }

        },
    ];


    return (
        <Content
            style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
                background: colorBgContainer,
            }}
        >
            <div>
                <div className='Tittle'>Recruitment Management</div>
                <RecruitList/>
                <Form form={form} component={false}>
                    <Table
                        // components={{
                        //     body: {
                        //         cell: EditableCell,
                        //     },
                        // }}
                        bordered
                        columns={columns}
                        dataSource={dataSource}
                        rowClassName="editable-row"
                        scroll={{
                            x: 1500,
                            y: 800,
                        }}
                    />
                </Form>
            </div>
        </Content>
    );
}
export default RecruitMgr




