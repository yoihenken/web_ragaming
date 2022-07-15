import {Button, Input, Layout, Space, Table} from "antd";
import goodsColumn from './GoodsColumn'
import {useEffect, useRef, useState} from "react";
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";

const {Content} = Layout;

const data = [
    {
        name : "Rinso",
        price : 15000,
        stock : 10,
        goodsIn : 7,
        goodsOut : 2,
    },{
        name : "Pensil",
        price : 2000,
        stock : 19,
        goodsIn : 2,
        goodsOut : 8,
    },{
        name : "Pen",
        price : 5000,
        stock : 6,
        goodsIn : 1,
        goodsOut : 5,
    },
]

function GoodsPage() {

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [dataTable, setDataTable] = useState()

    useEffect(() => {
        setDataTable(data)
    });

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps  = (dataIndex) => ({
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

    const column = goodsColumn.map(obj => {
        if (obj.key === 'name'){
            return {...obj, ...getColumnSearchProps('name')}
        }
        return obj
    })

    return (
        <Layout className="site-layout">
            <Content
                style={{margin: '0 16px'}}>
                <div
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        minHeight: 360,
                        backgroundColor : '#FFFFFF'
                    }}
                >
                    <Table columns={column} dataSource={dataTable}/>
                </div>
            </Content>
        </Layout>
    )

}

export default GoodsPage;