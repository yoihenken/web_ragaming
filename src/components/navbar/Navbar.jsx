import {useState} from "react";
import {Layout, Menu, Space} from 'antd';
import {UserOutlined, ShoppingOutlined} from '@ant-design/icons';
import {Link, useNavigate} from "react-router-dom";
import { ReactComponent as LogoIcon } from  '../../asset/logo.svg'

const { Sider } = Layout;

const Navbar = () => {
    const router = useNavigate()

    const items = [
        {
            key: '1',
            icon: <ShoppingOutlined/>,
            label: 'Barang',
            onClick: () => {
                console.log('clicked barang')
                router("barang", {replace: true})
            }
        },
        {
            key : '2',
            icon : <UserOutlined />,
            label : 'Karyawan',
            onClick : () => {
                console.log('clicked karyawan')
                router("barang", {replace: true})
            }
        },
    ]

    const [collapsed, setCollapsed] = useState(false)

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} breakpoint="lg" >
            <LogoIcon style={{paddingTop:'10px'}}/>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
        </Sider>
    )
}

export default Navbar;