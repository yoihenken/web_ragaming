import {Avatar, Col, Dropdown, Layout, Menu, Row, Space, Typography} from 'antd';
import {KeyOutlined, LogoutOutlined, UserOutlined} from "@ant-design/icons";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {setUser} from "../../reduxslice/userSlice";

const {Header} = Layout;
const {Title, Text} = Typography;

const HeaderWeb = () => {
    const auth = useSelector((state) => state.user)
    const user = auth == null ? {name: 'N'} : auth
    const router = useNavigate();
    const dispatch = useDispatch()
    const [hoverStyleUserBox, setHoverStyleUserBox] = useState(false)
    const handleHoverStyleUserBox = () => {
        setHoverStyleUserBox(!hoverStyleUserBox)
    }
    const styleUserBox = () => {
        if (hoverStyleUserBox) {
            return {
                backgroundColor: "white",
                paddingTop: '0px',
                paddingLeft: '10px',
                paddingRight: '10px',
                borderRadius: '15px',
                boxShadow: '2.5px 2.5px 1.5px #888888'
            }
        } else
            return {
                paddingLeft: '10px',
                paddingRight: '10px'
            }
    }
    const styleTitle = () => {
        if (hoverStyleUserBox) {
            return {
                color: 'black'
            }
        } else
            return {
                color: 'white'
            }
    }
    const logout = () => {
        localStorage.clear()
        dispatch(setUser(null))
        router("/login", { replace: true })
    }
    const cmdMenu = ({key}) => {
        switch (key) {
            case '2' :
                break;
            case '3' :
                console.log('click', key)
                logout()
                break;
        }
    }
    const menu = (
        <Menu
            style={{minWidth:'210px', borderRadius:'8px'}}
            onClick={cmdMenu}
            items={[
                {
                    label: (
                        <Space size={"small"} direction={'vertical'} align={"center"} style={{display: 'flex'}}>
                            <Avatar size={64} style={{color: '#FFFFFF', backgroundColor: '#1890FF'}}> {user.name[0].toUpperCase()} </Avatar>
                            <div style={{textAlign: 'center'}}>
                                <h3>{user.name}</h3>
                                <Text>{user.role}</Text>
                            </div>
                        </Space>),
                    key: '1',
                    style: {
                        paddingTop: '16px',
                        paddingBottom: '16px',
                        alignItems: 'center',
                        alignContent: 'center',
                        justifyContent: 'center'
                    },
                },
                {
                    type: 'divider'
                },
                {
                    label: 'Ubah Password',
                    key: '2',
                    style: {paddingTop: '8px', paddingBottom: '8px'},
                    icon: <KeyOutlined/>
                },
                {
                    label: 'Keluar',
                    key: '3',
                    danger: true,
                    style: {paddingTop: '8px', paddingBottom: '8px'},
                    icon: <LogoutOutlined/>
                },
            ]}
        />
    );

    return (
        <Header
            className="header"
            style={{
                paddingTop: '8px',
                paddingBottom: '8px',
                height: '80px'
            }}
        >
            <Row align={'end'}>
                <Col span={2.5} push={0.5}>
                    <Dropdown overlay={menu} trigger={["hover"]}>
                        <Space size={"small"} align={"baseline"} style={styleUserBox()}
                               onMouseEnter={handleHoverStyleUserBox} onMouseLeave={handleHoverStyleUserBox}>
                            {/*<Avatar size={32} icon={<UserOutlined/>}/>*/}
                            <Avatar size={32} style={{color: '#FFFFFF', backgroundColor: '#1890FF'}}> {user.name[0].toUpperCase()} </Avatar>
                            <Text strong={true} style={styleTitle()}>{user.name}</Text>
                        </Space>
                    </Dropdown>
                </Col>
            </Row>
        </Header>
    )
}

export default HeaderWeb;