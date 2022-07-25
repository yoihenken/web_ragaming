import {
    Button,
    Col,
    Divider,
    Input,
    InputNumber,
    Layout,
    Modal,
    Popconfirm,
    Row,
    Space,
    Switch,
    Table,
    Typography
} from "antd";
import goodsColumn from './GoodsColumn'
import {useEffect, useRef, useState} from "react";
import {FileExcelOutlined, PlusOutlined, SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import {useSelector} from "react-redux";
import {
    getGoodsAll,
    getGoodsExport,
    postGoodsDelete,
    postGoodsInsert,
    postGoodsUpdateAll,
    postGoodsUpdateGoodsIn,
    postGoodsUpdateGoodsOut
} from '../../repository/goods'
import {Notification} from "../../components/notification/Notification";

const {Title} = Typography;
const {Content} = Layout;

function GoodsPage() {
    const auth = useSelector((state) => state.user)
    const user = auth == null ? {name: 'N'} : auth
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [dataTable, setDataTable] = useState()
    const [loading, setLoading] = useState(false);
    const [modalAdd, setModalAdd] = useState(false);
    const [modalDetail, setModalDetail] = useState(false);
    const [modalGoodsIn, setModalGoodsIn] = useState(false);
    const [modalGoodsOut, setModalGoodsOut] = useState(false);
    const [selectedGoods, setSelectedGoods] = useState({})
    const [onEdit, setOnEdit] = useState(false)

    const doGetGoodsList = async () => {
        const {status, goods} = await getGoodsAll()
        if (status) {
            setDataTable(goods)
        }
    }

    const cmdGoodsInsert = async () => {
        setLoading(true)
        const {status, goods, message} = await postGoodsInsert(selectedGoods)
        if (status) {
            doGetGoodsList()
            Notification('success', 'Berhasil ditambahkan !')
        } else {
            Notification('error', message)
        }
        setLoading(false)
        showModalAdd()
    }

    const cmdGoodsUpdateAll = async () => {
        setLoading(true)
        const {status, goods, message} = await postGoodsUpdateAll({...selectedGoods, updated_by: user.name})
        if (status) {
            Notification('success', 'Berhasil diupdate !')
            doGetGoodsList()
            setLoading(false)
            showModalDetail()
        } else {
            Notification('error', message)
            setLoading(false)
            showModalDetail()
        }
    }

    const cmdDeleteGoods = async () => {
        setLoading(true)
        const {status, message} = await postGoodsDelete(selectedGoods.id)
        if (status) {
            setTimeout(() => {
                Notification('success', 'Berhasil dihapus !')
                doGetGoodsList()
                setLoading(false)
            }, 1000)
        } else {
            Notification('error', message)
            setLoading(false)
        }
    }

    const cmdGoodsIn = async () => {
        setLoading(true)
        const {status, message} = await postGoodsUpdateGoodsIn(selectedGoods)
        if (status) {
            setTimeout(() => {
                Notification('success', 'Berhasil diupdate !')
                doGetGoodsList()
                setLoading(false)
            }, 1000)
        } else {
            Notification('error', message)
            setLoading(false)
        }
    }

    const cmdGoodsOut = async () => {
        setLoading(true)
        const {status, message} = await postGoodsUpdateGoodsOut(selectedGoods)
        if (status) {
            setTimeout(() => {
                Notification('success', 'Berhasil diupdate !')
                doGetGoodsList()
                setLoading(false)
            }, 1000)
        } else {
            Notification('error', message)
            setLoading(false)
        }
    }

    const cmdExportToExcel = async () => {
        setLoading(true)
        const {status, message} = await getGoodsExport()
        if (status) {
            setTimeout(() => {
                Notification('success', 'Berhasil didownload !')
                setLoading(false)
            }, 1000)
        } else {
            Notification('error', message)
            setLoading(false)
        }
    }

    useEffect(() => {
        doGetGoodsList();
    }, []);

    const showModalDetail = () => {
        setModalDetail(!modalDetail);
        setOnEdit(false)
    };

    const showModalAdd = () => {
        setModalAdd(!modalAdd);
        setSelectedGoods({
            goods_in: 0,
            goods_out: 0,
            total_goods_in: 0,
            total_goods_out: 0,
            created_by: user.name,
            updated_by: user.name,
        })
    };

    const showModalGoodsIn = () => {
        setModalGoodsIn(!modalGoodsIn);
    };

    const showModalGoodsOut = () => {
        setModalGoodsOut(!modalGoodsOut);
    };

    const onChangeGoods = (event, value, key) => {
        if (event == undefined) {
            let validValue = Number(value)
            if (validValue) {
                setSelectedGoods({
                    ...selectedGoods,
                    [key]: validValue
                })
            }
        } else {
            setSelectedGoods({
                ...selectedGoods,
                [event.target.name]: event.target.value
            })
        }
    }

    const onChangeGoodsIn = (value) => {
        setSelectedGoods({
            ...selectedGoods, addGoodsIn: value
        })
    }

    const onChangeGoodsOut = (value) => {
        setSelectedGoods({
            ...selectedGoods, addGoodsOut: value
        })
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

    const goodsCol = goodsColumn.map(obj => {
        if (obj.key === 'goods_name') {
            return {...obj, ...getColumnSearchProps('goods_name')}
        }
        return obj
    })

    const column = [...goodsCol, {
        title: "Aksi",
        key: "aksi",
        width: '20%',
        render: (text, record, index) => (
            <Space>
                {(user.role === 'SUPERADMIN' || user.role === 'ADMIN') &&
                <Button
                    onClick={() => {
                        setSelectedGoods(record)
                        showModalGoodsIn()
                    }}
                >
                    Barang Masuk
                </Button>}
                {(user.role === 'SUPERADMIN' || user.role === 'ADMIN' || user.role === 'AUDIT') &&
                <Button
                    onClick={() => {
                        setSelectedGoods(record)
                        showModalGoodsOut()
                    }}
                >
                    Barang Keluar
                </Button>
                }
                <Button
                    onClick={() => {
                        setSelectedGoods(record)
                        showModalDetail()
                    }}
                >
                    Detail
                </Button>
                {(user.role === 'SUPERADMIN' || user.role === 'ADMIN') &&
                <Popconfirm
                    title="Hapus data ini?"
                    onConfirm={cmdDeleteGoods}
                    okText="Ya"
                    cancelText="Tidak"
                >
                    <Button
                        type="primary"
                        danger
                        onClick={() => {
                            setSelectedGoods(record)
                        }}
                    >
                        Hapus
                    </Button>
                </Popconfirm>}
            </Space>
        ),
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
                            <Row align="middle">
                                <Col flex={30}>
                                    <Title level={2}> Data Barang </Title>
                                </Col>
                                <Col flex={'auto'}>
                                    <Space>
                                        <Button
                                            style={{
                                                color: '#73d13d',
                                                borderColor: '#73d13d'
                                            }}
                                            shape="round"
                                            icon={<FileExcelOutlined/>}
                                            size={'large'}
                                            onClick={cmdExportToExcel}
                                        >
                                            Export ke Excel
                                        </Button>
                                        {(user.role === 'SUPERADMIN' || user.role === 'ADMIN') &&
                                        <Button
                                            type="primary"
                                            shape="round"
                                            icon={<PlusOutlined/>}
                                            size={'large'}
                                            onClick={showModalAdd}
                                        >
                                            Tambah Barang
                                        </Button>}
                                    </Space>
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

            {/*Goods In*/}
            <Modal
                visible={modalGoodsIn}
                title={`Barang Masuk - ${selectedGoods.goods_name}`}
                onCancel={showModalGoodsIn}
                width={500}
                footer={[
                    <Button key="back" onClick={showModalGoodsIn}>
                        Kembali
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={cmdGoodsIn}>
                        Simpan
                    </Button>
                ]}
            >
                <Space align="baseline" size={"middle"}>
                    <h4>Jumlah Barang Masuk : </h4>
                    <InputNumber
                        min={0}
                        keyboard={true}
                        value={selectedGoods.addGoodsIn}
                        defaultValue={0}
                        onPressEnter={cmdGoodsIn}
                        onChange={onChangeGoodsIn}/>
                </Space>
            </Modal>

            {/*Goods Out*/}
            <Modal
                visible={modalGoodsOut}
                title={`Barang Keluar - ${selectedGoods.goods_name}`}
                onCancel={showModalGoodsOut}
                width={500}
                footer={[
                    <Button key="back" onClick={showModalGoodsOut}>
                        Kembali
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={cmdGoodsOut}>
                        Simpan
                    </Button>
                ]}
            >
                <Space align="baseline" size={"middle"}>
                    <h4>Jumlah Barang Keluar : </h4>
                    <InputNumber
                        min={0}
                        keyboard={true}
                        value={selectedGoods.addGoodsOut}
                        defaultValue={0}
                        onPressEnter={cmdGoodsOut}
                        onChange={onChangeGoodsOut}/>
                </Space>
            </Modal>

            {/*Detail*/}
            <Modal
                visible={modalDetail}
                title={`Detail - ${selectedGoods.goods_name}`}
                onCancel={showModalDetail}
                width={800}
                footer={[
                    <Button key="back" onClick={showModalDetail}>
                        Kembali
                    </Button>,
                    <>{onEdit && <Button key="submit" type="primary" loading={loading} onClick={cmdGoodsUpdateAll}>
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
                                    <h4>ID Barang</h4>
                                    <Input
                                        name={'id'}
                                        disabled={onEdit}
                                        readOnly={!onEdit}
                                        value={selectedGoods.id}
                                    />
                                </Space>
                            </Col>
                            <Col span={24}>
                                <Space direction={'vertical'} style={{display: 'flex'}}>
                                    <h4>Nama Barang</h4>
                                    <Input
                                        name={'goods_name'}
                                        readOnly={!onEdit}
                                        placeholder="Masukkan nama barang"
                                        status={""}
                                        value={selectedGoods.goods_name}
                                        onChange={(event => onChangeGoods(event))}
                                    />
                                </Space>
                            </Col>
                            <Col span={24}>
                                <Space direction={'vertical'} style={{display: 'flex'}}>
                                    <h4>Stok</h4>
                                    <InputNumber
                                        style={{width: '100%'}}
                                        name={'stock'}
                                        readOnly={!onEdit}
                                        placeholder="Masukkan jumlah stok barang"
                                        status={""}
                                        value={selectedGoods.stock}
                                        onChange={(value => onChangeGoods(undefined, value, 'stock'))}
                                    />
                                </Space>
                            </Col>
                            <Col span={24}>
                                <Space direction={'vertical'} style={{display: 'flex'}}>
                                    <h4>Harga</h4>
                                    <InputNumber
                                        style={{width: '100%'}}
                                        name={'price'}
                                        readOnly={!onEdit}
                                        placeholder="Masukkan harga barang"
                                        status={""}
                                        prefix={"Rp"}
                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                        value={selectedGoods.price}
                                        onChange={(value => onChangeGoods(undefined, value, 'price'))}
                                    />
                                </Space>
                            </Col>
                            <Col span={24}>
                                <Space direction={'vertical'} style={{display: 'flex'}}>
                                    <h4>Barang Masuk (Hari ini)</h4>
                                    <InputNumber
                                        style={{width: '100%'}}
                                        name={'goods_in'}
                                        readOnly={!onEdit}
                                        placeholder="Masukkan jumlah barang masuk hari ini"
                                        status={""}
                                        value={selectedGoods.goods_in}
                                        onChange={(value => onChangeGoods(undefined, value, 'goods_in'))}
                                    />
                                </Space>
                            </Col>
                            <Col span={24}>
                                <Space direction={'vertical'} style={{display: 'flex'}}>
                                    <h4>Barang Keluar (Hari ini)</h4>
                                    <InputNumber
                                        style={{width: '100%'}}
                                        name={'goods_out'}
                                        readOnly={!onEdit}
                                        placeholder="Masukkan jumlah barang keluar hari ini"
                                        status={""}
                                        value={selectedGoods.goods_out}
                                        onChange={(value => onChangeGoods(undefined, value, 'goods_out'))}
                                    />
                                </Space>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <Row gutter={[8, 16]}>
                            <Col span={24}>
                                <Space direction={'vertical'} style={{display: 'flex'}}>
                                    <h4>Total Barang Masuk</h4>
                                    <InputNumber
                                        style={{width: '100%'}}
                                        name={'total_goods_in'}
                                        readOnly={!onEdit}
                                        placeholder="Masukkan total barang masuk"
                                        status={""}
                                        value={selectedGoods.total_goods_in}
                                        onChange={(value => onChangeGoods(undefined, value, 'total_goods_in'))}
                                    />
                                </Space>
                            </Col>
                            <Col span={24}>
                                <Space direction={'vertical'} style={{display: 'flex'}}>
                                    <h4>Total Barang Keluar</h4>
                                    <InputNumber
                                        style={{width: '100%'}}
                                        name={'total_goods_out'}
                                        readOnly={!onEdit}
                                        placeholder="Masukkan total jumlah barang keluar"
                                        status={""}
                                        value={selectedGoods.total_goods_out}
                                        onChange={(value => onChangeGoods(undefined, value, 'total_goods_out'))}
                                    />
                                </Space>
                            </Col>
                            <Col span={24}>
                                <Space direction={'vertical'} style={{display: 'flex'}}>
                                    <h4>Input oleh</h4>
                                    <Input
                                        name={'created_by'}
                                        disabled={onEdit}
                                        readOnly={!onEdit}
                                        value={selectedGoods.created_by}
                                    />
                                </Space>
                            </Col>
                            <Col span={24}>
                                <Space direction={'vertical'} style={{display: 'flex'}}>
                                    <h4>Input Pada</h4>
                                    <Input
                                        name={'created_at'}
                                        disabled={onEdit}
                                        readOnly={!onEdit}
                                        value={selectedGoods.created_at}
                                    />
                                </Space>
                            </Col>
                            <Col span={24}>
                                <Space direction={'vertical'} style={{display: 'flex'}}>
                                    <h4>Ubah Oleh</h4>
                                    <Input
                                        name={'updated_by'}
                                        disabled={onEdit}
                                        readOnly={!onEdit}
                                        value={selectedGoods.updated_by}
                                    />
                                </Space>
                            </Col>
                            <Col span={24}>
                                <Space direction={'vertical'} style={{display: 'flex'}}>
                                    <h4>Ubah Pada</h4>
                                    <Input
                                        name={'updated_at'}
                                        disabled={onEdit}
                                        readOnly={!onEdit}
                                        value={selectedGoods.updated_at}
                                    />
                                </Space>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Modal>

            {/*Tambah barang*/}
            <Modal
                visible={modalAdd}
                title={'Tambah Barang'}
                onCancel={showModalAdd}
                width={800}
                footer={[
                    <Button key="back" onClick={showModalAdd}>
                        Kembali
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={cmdGoodsInsert}>
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
                                    <h4>Nama Barang</h4>
                                    <Input
                                        name={'goods_name'}
                                        placeholder="Masukkan nama barang"
                                        status={""}
                                        value={selectedGoods.goods_name}
                                        onChange={(event => onChangeGoods(event))}
                                    />
                                </Space>
                            </Col>
                            <Col span={24}>
                                <Space direction={'vertical'} style={{display: 'flex'}}>
                                    <h4>Stok</h4>
                                    <InputNumber
                                        style={{width: '100%'}}
                                        name={'stock'}
                                        placeholder="Masukkan jumlah stok barang"
                                        status={""}
                                        value={selectedGoods.stock}
                                        onChange={(value => onChangeGoods(undefined, value, 'stock'))}
                                    />
                                </Space>
                            </Col>
                            <Col span={24}>
                                <Space direction={'vertical'} style={{display: 'flex'}}>
                                    <h4>Harga</h4>
                                    <InputNumber
                                        style={{width: '100%'}}
                                        name={'price'}
                                        placeholder="Masukkan harga barang"
                                        status={""}
                                        prefix={"Rp"}
                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                        value={selectedGoods.price}
                                        onChange={(value => onChangeGoods(undefined, value, 'price'))}
                                    />
                                </Space>
                            </Col>
                            <Col span={24}>
                                <Space direction={'vertical'} style={{display: 'flex'}}>
                                    <h4>Barang Masuk (Hari ini)</h4>
                                    <InputNumber
                                        style={{width: '100%'}}
                                        name={'goods_in'}
                                        placeholder="Masukkan jumlah barang masuk hari ini"
                                        status={""}
                                        defaultValue={0}
                                        value={selectedGoods.goods_in}
                                        onChange={(value => onChangeGoods(undefined, value, 'goods_in'))}
                                    />
                                </Space>
                            </Col>
                            <Col span={24}>
                                <Space direction={'vertical'} style={{display: 'flex'}}>
                                    <h4>Barang Keluar (Hari ini)</h4>
                                    <InputNumber
                                        style={{width: '100%'}}
                                        name={'goods_out'}
                                        placeholder="Masukkan jumlah barang keluar hari ini"
                                        status={""}
                                        defaultValue={0}
                                        value={selectedGoods.goods_out}
                                        onChange={(value => onChangeGoods(undefined, value, 'goods_out'))}
                                    />
                                </Space>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <Row gutter={[8, 16]}>
                            <Col span={24}>
                                <Space direction={'vertical'} style={{display: 'flex'}}>
                                    <h4>Total Barang Masuk</h4>
                                    <InputNumber
                                        style={{width: '100%'}}
                                        name={'total_goods_in'}
                                        placeholder="Masukkan total barang masuk"
                                        status={""}
                                        defaultValue={0}
                                        value={selectedGoods.total_goods_in}
                                        onChange={(value => onChangeGoods(undefined, value, 'total_goods_in'))}
                                    />
                                </Space>
                            </Col>
                            <Col span={24}>
                                <Space direction={'vertical'} style={{display: 'flex'}}>
                                    <h4>Total Barang Keluar</h4>
                                    <InputNumber
                                        style={{width: '100%'}}
                                        name={'total_goods_out'}
                                        placeholder="Masukkan total jumlah barang keluar"
                                        status={""}
                                        defaultValue={0}
                                        value={selectedGoods.total_goods_out}
                                        onChange={(value => onChangeGoods(undefined, value, 'total_goods_out'))}
                                    />
                                </Space>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Modal>
        </>
    )

}

export default GoodsPage;