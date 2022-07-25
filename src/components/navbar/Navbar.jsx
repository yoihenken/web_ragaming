import {useEffect, useState} from "react";
import {Layout, Menu, Space} from 'antd';
import {UserOutlined, ShoppingOutlined} from '@ant-design/icons';
import {Link, useLocation, useNavigate} from "react-router-dom";
import { ReactComponent as LogoIcon } from  '../../asset/logo.svg'
import {useSelector} from "react-redux";

const { Sider } = Layout;

const Navbar = () => {
    const router = useNavigate()
    const location = useLocation()
    const auth = useSelector((state) => state.user)
    const role = auth == null ? '' : auth.role
    const [menuItems, setMenuItems] = useState([])
    const [currentMenu, setCurrentMenu] = useState(location.pathname)

    const items = [
        {
            key: '/barang',
            icon: <ShoppingOutlined />,
            label: 'Barang',
            onClick: () => {
                router("barang", {replace: true})
            }
        },
        {
            key : '/karyawan',
            icon : <UserOutlined />,
            label : 'Karyawan',
            onClick : () => {
                router("karyawan", {replace: true})
            }
        }
    ]

    useEffect(()=>{
        generateMenuByRole()
    }, [auth])

    useEffect(()=>{
        setCurrentMenu(location.pathname)
    }, [location])

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
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={menuItems} selectedKeys={currentMenu} />
        </Sider>
    )
}

export default Navbar;