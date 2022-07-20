import {Avatar, Col, Dropdown, Layout, Menu, Row, Space, Typography} from 'antd';
import {KeyOutlined, LogoutOutlined, UserOutlined} from "@ant-design/icons";
import {useState} from "react";

const {Header} = Layout;
const {Title, Text} = Typography;

const menu = (
    <Menu
        // onClick={handleMenuClick}
        mode={'inline'}

        items={[
            {
                label: (
                    <Space size={"small"} direction={'vertical'} align={"center"} style={{display: 'flex'}}>
                        {/*<Avatar size={64} icon={<UserOutlined/>}/>*/}
                        <Avatar size={64} style={{color: '#FFFFFF', backgroundColor: '#1890FF'}}> BB </Avatar>
                        <div style={{textAlign: 'center'}}>
                            <h3>BAGUS BAYU SASONGKO</h3>
                            <Text>SUPER ADMIN</Text>
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
                icon: <LogoutOutlined/>,
            },
        ]}
    />
);

const HeaderWeb = () => {

    const [hoverStyleUserBox, setHoverStyleUserBox] = useState(false)
    const handleHoverStyleUserBox = () => {
        console.log('hoyo', hoverStyleUserBox)
        setHoverStyleUserBox(!hoverStyleUserBox)
    }
    const styleUserBox = () => {
        if (hoverStyleUserBox) {
            return {
                backgroundColor: "white",
                paddingTop: '0px',
                paddingLeft: '10px',
                paddingRight: '10px',
                borderRadius: '15px'
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

    return (
        <Header
            className="header"
            style={{
                // padding: 0,
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
                            <Avatar size={32} style={{color: '#FFFFFF', backgroundColor: '#1890FF'}}> BB </Avatar>
                            <Text strong={true} style={styleTitle()}>BAGUS BAYU SASONGKO</Text>
                        </Space>
                    </Dropdown>
                </Col>
            </Row>
        </Header>
    )
}

export default HeaderWeb;