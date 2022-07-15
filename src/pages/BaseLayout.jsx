import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {Layout} from "antd";
import Navbar from "../components/navbar/Navbar";
import Header from "../components/header/Header";
import {useEffect} from "react";

const {Content, Footer} = Layout;


function BaseLayout() {
    const router = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname == "/") {
            router("/barang", { replace: true });
        }
    })

    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Navbar/>
            <Layout className="site-layout">
                <Header/>
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                    <div
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            minHeight: 360,
                        }}
                    >
                        <Outlet/>
                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    RA GAMING ©2022 Created by Henken
                </Footer>
            </Layout>
        </Layout>
    )
}

export default BaseLayout;