import {Alert, Button, Col, Input, Row, Space, Spin} from "antd";
import {ReactComponent as LogoIcon} from '../../asset/logo.svg'
import {useState} from "react";
import {Notification} from "../../components/notification/Notification"
import Const from "../../constant";
import {login} from '../../repository/auth'
import {useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setUser} from "../../reduxslice/userSlice";
import {useNavigate} from "react-router";

function LoginPage() {
    let location = useLocation();
    const router = useNavigate();
    const [stateLogin, setStateLogin] = useState({})
    const [errorFieldLogin, setErrorFieldLogin] = useState({})
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const handleLogin = (event) => {
        setStateLogin(
            {
                ...stateLogin,
                [event.target.name]: event.target.value
            }
        )
    }

    const AlertError = () => {
        if (errorFieldLogin.email != null) {
            return <Alert message={errorFieldLogin.email} type="error" showIcon closable
                          style={{width: '240px', textAlign: 'start'}}/>
        } else if (errorFieldLogin.password != null) {
            return <Alert message={errorFieldLogin.password} type="error" showIcon closable
                          style={{width: '240px', textAlign: 'start'}}/>
        }
    }

    const cmdLogin = async () => {
        setLoading(true)
        if (!stateLogin.email.includes('@')) {
            setErrorFieldLogin({email: 'Bukan format email !'})
        } else if (stateLogin.password.length < 8) {
            setErrorFieldLogin({password: 'Minimal 8 karakter !'})
        } else setErrorFieldLogin({})

        if (errorFieldLogin.email == undefined && errorFieldLogin.password == undefined) {
            const {status, message, token, employee} = await login(stateLogin.email, stateLogin.password)
            if (status) {
                localStorage.setItem(Const.STORAGE_KEY.USER_INFO, JSON.stringify(employee))
                localStorage.setItem(Const.STORAGE_KEY.TOKEN, token)
                dispatch(setUser(employee))
                let from = location.state?.from?.pathname || "/barang";
                router(from, {replace: true});
                Notification('success', message)
            } else {
                Notification('error', message)
            }
        }
        setLoading(false)
    }


    return (
        <Row justify={"center"} style={{paddingTop: '100px'}}>
            <Col span={5}>
                <Spin spinning={loading}>
                    <Space direction={'vertical'} align={"center"} style={{
                        width: '350px',
                        paddingTop: '50px',
                        paddingBottom: '50px',
                        display: 'flex',
                        borderRadius: '15px',
                        boxShadow: '4px 4px 12px 4px #aaaaaa'
                    }} size={'large'}>
                        <LogoIcon/>
                        <div style={{width: '240px', textAlign: 'start'}}>
                            <h4>Email</h4>
                            <Input
                                name={'email'}
                                placeholder="Masukkan Email !"
                                value={stateLogin.email}
                                onChange={handleLogin}
                            />
                        </div>
                        <div style={{width: '240px', textAlign: 'start'}}>
                            <h4>Password</h4>
                            <Input.Password
                                name={'password'}
                                placeholder="Masukkan Password !"
                                value={stateLogin.password}
                                onChange={handleLogin}
                                onPressEnter={cmdLogin}
                            />
                        </div>
                        {errorFieldLogin.email == undefined && errorFieldLogin.password == undefined ? <></> :
                            <AlertError/>}

                        <Button style={{width: '240px'}} type="primary" onClick={cmdLogin}>Log in</Button>
                    </Space>
                </Spin>
            </Col>
        </Row>
    )
}

export default LoginPage