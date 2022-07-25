const employeeColumn = [
    {
        title: "No",
        dataIndex: "",
        key: 'no',
        width: '5%',
        render: (text, record, index) => index + 1,
    },
    {
        title: "ID",
        dataIndex: "id",
        key: 'id',
        width: '5%',
    },
    {
        title: "Nama Karyawan",
        dataIndex: "name",
        key: 'name',
        width: '20%',
        sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
        title: "Email",
        dataIndex: "email",
        key: 'email',
        width: '20%',
        sorter: (a, b) => a.email.localeCompare(b.email),
        sortDirections: ['descend', 'ascend']
    },
    {
        title: "Role",
        dataIndex: "role",
        key: 'role',
        width: '20%',
        sorter: (a, b) => a.role.localeCompare(b.role),
        sortDirections: ['descend', 'ascend']
    }
]

export default employeeColumn