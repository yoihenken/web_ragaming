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
        dataIndex: "goods_name",
        key: 'goods_name',
        width: '20%',
    },
    {
        title: "Harga",
        dataIndex: "price",
        key: 'price',
        width: '15%',
        sorter: (a, b) => a['price'] - b['price'],
        sortDirections: ['descend', 'ascend'],
        render: (text => `${text}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','))

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
        dataIndex: "goods_in",
        key: 'goods_in',
        width: '15%',
        sorter: (a, b) => a['goods_in'] - b['goods_in'],
        sortDirections: ['descend', 'ascend'],
        render: (text, record, index) => (<div style={{color:"#73d13d"}}>+ {text}</div>)
    },
    {
        title: "Barang Keluar",
        dataIndex: "goods_out",
        key: 'goodsOut',
        width: '15%',
        sorter: (a, b) => a['goods_out'] - b['goods_out'],
        sortDirections: ['descend', 'ascend'],
        render: (text, record, index) => (<div style={{color:"#ff7875"}}>- {text}</div>)
    }
]

export default goodsColumn