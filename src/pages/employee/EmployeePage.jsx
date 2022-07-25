import {useEffect, useRef, useState} from "react";
import {
    getEmployeeAll,
    postEmployeeChangePasswordAdmin,
    postEmployeeCreate,
    postEmployeeUpdate
} from "../../repository/employee";
import {Button, Col, Divider, Input, Layout, Modal, Row, Select, Space, Switch, Table, Typography} from "antd";
import {KeyOutlined, PlusOutlined, SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import employeeColumn from "./EmployeeColumn";
import {useSelector} from "react-redux";
import {Notification} from "../../components/notification/Notification";

const {Title} = Typography;
const {Content} = Layout;
const {Option} = Select;

function EmployeePage() {
    const auth = useSelector((state) => state.user)
    const user = auth == null ? {name: 'N'} : auth
    const searchInput = useRef(null);
    const [dataTable, setDataTable] = useState()
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [loading, setLoading] = useState(false);
    const [modalDetail, setModalDetail] = useState(false)
    const [modalAdd, setModalAdd] = useState(false)
    const [modalChangePassword, setModalChangePassword] = useState(false)
    const [selectedEmployee, setSelectedEmployee] = useState({})
    const [onEdit, setOnEdit] = useState(false)

    const roleUser = [
        {value: 'SUPERADMIN', label: 'SUPER ADMIN'},
        {value: 'ADMIN', label: 'ADMIN'},
        {value: 'AUDIT', label: 'AUDIT'},
        {value: 'OPERATOR', label: 'OPERATOR'}]

    const doGetEmployeeList = async () => {
        const {status, employee} = await getEmployeeAll()
        if (status) {
            setDataTable(employee)
        }
    }

    const cmdEmployeeCreate = async () => {
        setLoading(true)
        const {status, employee, message} = await postEmployeeCreate(selectedEmployee)
        if (status) {
            Notification('success', 'Berhasil ditambahkan !')
            doGetEmployeeList()
            setLoading(false)
            showModalAdd()
        } else {
            Notification('error', message)
            setLoading(false)
            showModalAdd()
        }
    }

    const cmdEmployeeUpdate = async () => {
        setLoading(true)
        const {status, employee, message} = await postEmployeeUpdate(selectedEmployee)
        if (status) {
            Notification('success', 'Berhasil diupdate !')
            doGetEmployeeList()
            setLoading(false)
            showModalDetail()
        } else {
            Notification('error', message)
            setLoading(false)
            showModalDetail()
        }
    }

    const cmdEmployeeChangePassword = async () => {
        setLoading(true)
        const {status, employee, message} = await postEmployeeChangePasswordAdmin(selectedEmployee)
        if (status) {
            Notification('success', `Password ${selectedEmployee.name} diubah !`)
            doGetEmployeeList()
            setLoading(false)
            showModalChangePassword()
        } else {
            Notification('error', message)
            setLoading(false)
        }
    }

    useEffect(() => {
        doGetEmployeeList();
    }, []);

    useEffect(() => {
        console.log('employ', selectedEmployee)
    }, [selectedEmployee]);

    const showModalDetail = () => {
        setModalDetail(!modalDetail)
        setOnEdit(false)
    }

    const showModalAdd = () => {
        setModalAdd(!modalAdd)
        setSelectedEmployee({})
    }

    const showModalChangePassword = () => {
        setModalChangePassword(!modalChangePassword)
    }

    const onChangeEmployee = (event, value, key) => {
        if (event == undefined) {
            setSelectedEmployee({
                ...selectedEmployee,
                [key]: value
            })
        } else {
            setSelectedEmployee({
                ...selectedEmployee,
                [event.target.name]: event.target.value
            })
        }
    }

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
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div
                style={{
                    padding: 8,
                }}
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
                        icon={<SearchOutlined/>}
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
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
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
    })

    const employeeCol = employeeColumn.map(obj => {
        if (obj.key === 'name') {
            return {...obj, ...getColumnSearchProps('name')}
        } else if (obj.key === 'email') {
            return {...obj, ...getColumnSearchProps('email')}
        } else if (obj.key === 'role') {
            return {...obj, ...getColumnSearchProps('role')}
        }
        return obj
    })

    const column = [...employeeCol, {
        title: 'Aksi',
        key: 'aksi',
        width: '20%',
        render: (text, record, index) => (
            <Space>
                <Button
                    onClick={() => {
                        setSelectedEmployee(record)
                        showModalDetail()
                    }}
                >
                    Detail
                </Button>
                <Button
                    type="primary"
                    style={{backgroundColor: '#13c2c2', borderColor: '#13c2c2'}}
                    icon={<KeyOutlined />}
                    onClick={() => {
                        setSelectedEmployee(record)
                        showModalChangePassword()
                    }}
                >
                    Ubah Password
                </Button>
                {/*<Popconfirm
                    title="Hapus data ini?"
                    onConfirm={cmdDeleteEmployee}
                    okText="Ya"
                    cancelText="Tidak"
                >
                    <Button
                        type="primary"
                        danger
                        onClick={() => {
                            setSelectedEmployee(record)
                        }}
                    >
                        Hapus
                    </Button>
                </Popconfirm>*/}
            </Space>
        )
    }]

    return (
        <>
            {/*Main Layout*/}
            <Layout className="site-layout">
                <Content
                    style={{margin: '0 16px'}}>
                    <div
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            minHeight: 360,
                            backgroundColor: '#FFFFFF'
                        }}
                    >
                        <Space direction={'vertical'} style={{display: 'flex'}} size={'small'}>
                            <Row align={'middle'}>
                                <Col flex={30}>
                                    <Title level={2}> Data Karyawan </Title>
                                </Col>
                                <Col flex={'auto'}>
                                    <Button
                                        type="primary"
                                        shape="round"
                                        icon={<PlusOutlined/>}
                                        size={'large'}
                                        onClick={showModalAdd}
                                    >
                                        Tambah Karyawan
                                    </Button>
                                </Col>
                                <Col span={24}>
                                    <Divider/>
                                </Col>
                            </Row>
                            <Table columns={column} dataSource={dataTable} scroll={{x: true}}/>
                        </Space>
                    </div>
                </Content>
            </Layout>
            {/*Detail*/}
            <Modal
                visible={modalDetail}
                title={`Detail - ${selectedEmployee.name}`}
                onCancel={showModalDetail}
                width={800}
                footer={[
                    <Button key="back" onClick={showModalDetail}>
                        Kembali
                    </Button>,
                    <>{onEdit && <Button key="submit" type="primary" loading={loading} onClick={cmdEmployeeUpdate}>
                        Simpan
                    </Button>}</>
                ]}
            >
                {/*turn on edit*/}
                {(user.role === 'SUPERADMIN' || user.role === 'ADMIN') &&
                <Row align={'end'}>
                    <Col span={2.5}>
                        <Switch
                            checked={onEdit}
                            checkedChildren="Edit Aktif"
                            unCheckedChildren="Edit Nonaktif"
                            onChange={() => {
                                setOnEdit(!onEdit)
                            }}
                        />
                    </Col>
                </Row>}
                {/*Form*/}
                <Row gutter={[8, 32]}>
                    <Col span={12}>
                        <Row gutter={[8, 16]}>
                            <Col span={24}>
                                <Space direction={'vertical'} style={{display: 'flex'}}>
                                    <h4>ID Karyawan</h4>
                                    <Input
                                        name={'id'}
                                        disabled={onEdit}
                                        readOnly={!onEdit}
                                        value={selectedEmployee.id}
                                    />
                                </Space>
                            </Col>
                            <Col span={24}>
                                <Space direction={'vertical'} style={{display: 'flex'}}>
                                    <h4>Nama Karyawan</h4>
                                    <Input
                                        name={'name'}
                                        readOnly={!onEdit}
                                        value={selectedEmployee.name}
                                        onChange={event => onChangeEmployee(event)}
                                    />
                                </Space>
                            </Col>
                            <Col span={24}>
                                <Space direction={'vertical'} style={{display: 'flex'}}>
                                    <h4>E-mail</h4>
                                    <Input
                                        name={'email'}
                                        readOnly={!onEdit}
                                        value={selectedEmployee.email}
                                        onChange={event => onChangeEmployee(event)}
                                    />
                                </Space>
                            </Col>
                            <Col span={24}>
                                <Space direction={'vertical'} style={{display: 'flex'}}>
                                    <h4>Role</h4>
                                    <Select
                                        style={{width: '100%'}}
                                        name={'role'}
                                        open={onEdit ? undefined : onEdit}
                                        value={selectedEmployee.role}
                                        onChange={value => onChangeEmployee(undefined, value, 'role')}
                                    >
                                        {roleUser.map((element) => (
                                            <Option key={element.value} value={element.value}>{element.label}</Option>
                                        ))}
                                    </Select>
                                </Space>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <Row gutter={[8, 16]}>
                            <Col span={24}>
                                <Space direction={'vertical'} style={{display: 'flex'}}>
                                    <h4>Dibuat Tanggal</h4>
                                    <Input
                                        name={'created_at'}
                                        disabled={onEdit}
                                        readOnly={!onEdit}
                                        value={selectedEmployee.created_at}
                                    />
                                </Space>
                            </Col>
                            <Col span={24}>
                                <Space direction={'vertical'} style={{display: 'flex'}}>
                                    <h4>Terakhir Diubah</h4>
                                    <Input
                                        name={'updated_at'}
                                        disabled={onEdit}
                                        readOnly={!onEdit}
                                        value={selectedEmployee.updated_at}
                                    />
                                </Space>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Modal>

            {/*Add*/}
            <Modal
                visible={modalAdd}
                title={'Tambah Karyawan'}
                onCancel={showModalAdd}
                width={800}
                footer={[
                    <Button key="back" onClick={showModalAdd}>
                        Kembali
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={cmdEmployeeCreate}>
                        Simpan
                    </Button>
                ]}
            >
                {/*Form*/}
                <Row gutter={[8, 32]}>
                    <Col span={12}>
                        <Row gutter={[8, 16]}>
                            <Col span={24}>
                                <Space direction={'vertical'} style={{display: 'flex'}}>
                                    <h4>Nama Karyawan</h4>
                                    <Input
                                        name={'name'}
                                        value={selectedEmployee.name}
                                        onChange={event => onChangeEmployee(event)}
                                    />
                                </Space>
                            </Col>
                            <Col span={24}>
                                <Space direction={'vertical'} style={{display: 'flex'}}>
                                    <h4>E-mail</h4>
                                    <Input
                                        name={'email'}
                                        value={selectedEmployee.email}
                                        onChange={event => onChangeEmployee(event)}
                                    />
                                </Space>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <Row gutter={[8, 16]}>
                            <Col span={24}>
                                <Space direction={'vertical'} style={{display: 'flex'}}>
                                    <h4>Role</h4>
                                    <Select
                                        style={{width: '100%'}}
                                        name={'role'}
                                        value={selectedEmployee.role}
                                        onChange={value => onChangeEmployee(undefined, value, 'role')}
                                    >
                                        {roleUser.map((element) => (
                                            <Option key={element.value} value={element.value}>{element.label}</Option>
                                        ))}
                                    </Select>
                                </Space>
                            </Col>
                            <Col span={24}>
                                <Space direction={'vertical'} style={{display: 'flex'}}>
                                    <h4>Password</h4>
                                    <Input
                                        name={'password'}
                                        value={selectedEmployee.password}
                                        onChange={event => onChangeEmployee(event)}
                                    />
                                </Space>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Modal>

            {/*Change Password*/}
            <Modal
                visible={modalChangePassword}
                title={`Ubah Password - ${selectedEmployee.name}`}
                onCancel={showModalChangePassword}
                width={400}
                footer={[
                    <Button key="back" onClick={showModalChangePassword}>
                        Kembali
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={cmdEmployeeChangePassword}>
                        Simpan
                    </Button>
                ]}
            >
                <Space direction={'vertical'} style={{display: 'flex'}}>
                    <h4>Password Baru</h4>
                    <Input
                        name={'password'}
                        value={selectedEmployee.password}
                        onChange={event => onChangeEmployee(event)}
                    />
                </Space>
            </Modal>
        </>
    )
}

export default EmployeePage