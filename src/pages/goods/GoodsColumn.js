const goodsColumn = [
    {
        title: "No",
        dataIndex: "",
        key: 'no',
        width: '5%',
        render: (text, record, index) => index + 1,
    },
    {
        title: "Nama Barang",
        dataIndex: "name",
        key: 'name',
        width: '20%',
    },
    {
        title: "Harga",
        dataIndex: "price",
        key: 'price',
        width: '15%',
        sorter: (a, b) => a['price'] - b['price'],
        sortDirections: ['descend', 'ascend']

    },
    {
        title: "Stok",
        dataIndex: "stock",
        key: 'stock',
        width: '10%',
        sorter: (a, b) => a['stock'] - b['stock'],
        sortDirections: ['descend', 'ascend']
    },
    {
        title: "Barang Masuk",
        dataIndex: "goodsIn",
        key: 'goodsIn',
        width: '15%',
        sorter: (a, b) => a['goodsIn'] - b['goodsIn'],
        sortDirections: ['descend', 'ascend'],
        render: (text, record, index) => "+ " + text
    },
    {
        title: "Barang Keluar",
        dataIndex: "goodsOut",
        key: 'goodsOut',
        width: '15%',
        sorter: (a, b) => a['goodsOut'] - b['goodsOut'],
        sortDirections: ['descend', 'ascend'],
        render: (text, record, index) => "- " + text
    }
]

export default goodsColumn