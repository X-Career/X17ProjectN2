import { Layout, Select, theme } from 'antd';
import { DeleteOutlined, EditOutlined, MailOutlined, SearchOutlined } from '@ant-design/icons';
import React, { useContext, useRef, useState} from 'react';
import Highlighter from 'react-highlight-words';
import { Button, Input, Space, Table } from 'antd';
import { Form, InputNumber, Popconfirm, Typography } from 'antd';
import "./Admin.css"
import { useNavigate } from 'react-router-dom';
import { ActiveContext } from '../../context/active_menu';
import RecruitList from './RecruitList';
import RecruitContext from '../../context/recruit';
import { getallCandidate } from '../../services/candidate';
const { Content } = Layout;

const originData = [];  //Lấy dữ liệu từ trên sever xuống
for (let i = 0; i < 20; i++) {
    originData.push({
        key: i.toString(),
        id: i.toString(),
        fullname: `Tài ${i}`,
        age: 32,
        email: `taiboi${i}@gmail.com`,
        phone: `0${i}0151`,
        point: i.toString(),
        status: `Applying`,
        datetointern: `2023-10-0${i}`,
        resultintern: `Pass`,
        datetogetjob: `2023-10-0${i}`,
    });
}
const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};



const RecruitMgr = () => {
    const navigate = useNavigate()
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const {active, setActive} = useContext(ActiveContext)
    const searchInput = useRef(null);
    const { recruit } = useContext(RecruitContext)
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };



    const getAllCanddidate = async() =>{
        try {
            const res = await getallCandidate(recruit)
            console.log(res);
        } catch (error) {
            console.log('Error:', error.message);
        }
    }
 

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
    const [data, setData] = useState(originData);
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.key === editingKey;
    const edit = (record) => {
        form.setFieldsValue({
            fullname: "",
            age: "",
            email: "",
            phone: "",
            point: "",
            status: "",
            datetointern: "",
            resultintern: "",
            datetogetjob: "",
            ...record,
        });
        setEditingKey(record.key);
    };
    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    // Delete Candidate
    const onDelete = id => {  //Xóa candidate
        const remove = [...data].filter(candidate => candidate.id !== id);
        setData(remove)
    }

    // Link to mail page
    const mailPage = () => {
        setActive('MailMgr')
        navigate("/Admin/MailMgr")

    }

    const statusOption = ['Applying', 'Testing', 'Interviewing', 'Rejected'];

    const columns = [
        {
            title: 'ID',
            width: 50,
            dataIndex: 'id',
            key: 'id',
            fixed: 'left',
            ...getColumnSearchProps('id'),
            editable: true,
        },
        {
            title: 'Full Name',
            width: 150,
            dataIndex: 'fullname',
            key: 'fullname',
            fixed: 'left',
            ...getColumnSearchProps('fullname'),
            editable: true,
        },
        {
            title: 'Age',
            width: 60,
            dataIndex: 'age',
            key: 'age',
            fixed: 'left',
            ...getColumnSearchProps('age'),
            editable: true,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 150,
            ...getColumnSearchProps('email'),
            editable: true,
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            width: 150,
            ...getColumnSearchProps('phone'),
            editable: true,
        },
        {
            title: 'Point',
            dataIndex: 'point',
            key: 'point',
            width: 80,
            ...getColumnSearchProps('point'),
            editable: true,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 120,
            ...getColumnSearchProps('status'),
            editable: true,
            render: (status) => <Select style={{ width: '100%' }} defaultValue={status}>
                {statusOption.map((item, key) =>(
                    <Select.Option key={key} value={item}>{item}</Select.Option>
                ))}
           </Select>
        },
        {
            title: 'Date to intern',
            dataIndex: 'datetointern',
            key: 'datetointern',
            width: 100,
            ...getColumnSearchProps('datetointern'),
            editable: true,
        },
        {
            title: 'Result intern',
            dataIndex: 'resultintern',
            key: '6',
            width: 100,
            ...getColumnSearchProps('resultintern'),
            editable: true,
        },
        {
            title: 'Date to getjob',
            dataIndex: 'datetogetjob',
            key: '7',
            width: 100,
            ...getColumnSearchProps('datetogetjob'),
            editable: true,
        },
        {
            title: 'Action',
            key: 'operation',
            dataIndex: 'operation',
            fixed: 'right',
            width: 80,
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => save(record.key)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>

                ) : (<div style={{ gap: "12px", display: "flex" }}>
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        <EditOutlined />
                    </Typography.Link>
                    <div onClick={() => onDelete(record.id)} style={{ color: "#e8d207", cursor: "pointer" }}>
                        <DeleteOutlined />
                    </div>
                    <MailOutlined onClick={() => mailPage()} style={{ cursor: "pointer" }}>
                    </MailOutlined>
                </div>)
            }

        },
    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === '' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });
    // console.log(data.filter (data=>data.id ==="1"))

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
                        components={{
                            body: {
                                cell: EditableCell,
                            },
                        }}
                        bordered
                        columns={mergedColumns}
                        dataSource={data}
                        rowClassName="editable-row"
                        scroll={{
                            x: 1500,
                            y: 800,
                        }}
                        pagination={{
                            onChange: cancel,
                        }}
                    />
                </Form>
            </div>
        </Content>
    );
}
export default RecruitMgr




