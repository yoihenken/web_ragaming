import {useEffect, useState} from "react";
import {Layout, Menu, Space} from 'antd';
import {UserOutlined, ShoppingOutlined} from '@ant-design/icons';
import {Link, useNavigate} from "react-router-dom";
import { ReactComponent as LogoIcon } from  '../../asset/logo.svg'
import {useSelector} from "react-redux";

const { Sider } = Layout;

const Navbar = () => {
    const router = useNavigate()
    const auth = useSelector((state) => state.user)
    const role = auth == null ? '' : auth.role
    const [menuItems, setMenuItems] = useState([])

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
                router("karyawan", {replace: true})
            }
        },
    ]

    useEffect(()=>{
        generateMenuByRole()
    }, [auth])

    const generateMenuByRole = () => {
        switch (role) {
            case 'SUPERADMIN' :
                setMenuItems( [items[0], items[1]])
                break;
            case 'ADMIN' :
                setMenuItems( [items[0], items[1]])
                break;
            case 'AUDIT' :
                setMenuItems( [items[0]])
                break;
            case 'OPERATOR' :
                setMenuItems( [items[0]])
                break;
            default :
                setMenuItems([])
                break;
        }
    }

    const [collapsed, setCollapsed] = useState(false)

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} breakpoint="lg" >
            <LogoIcon style={{paddingTop:'10px'}}/>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={menuItems} />
        </Sider>
    )
}

export default Navbar;