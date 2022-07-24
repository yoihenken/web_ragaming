import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import BaseLayout from "./pages/BaseLayout";
import GoodsPage from "./pages/goods/GoodsPage";
import AuthProvider from "./services/auth/AuthProvider";
import {LoadingOutlined} from "@ant-design/icons";
import {Spin} from "antd";
import LoginProvider from "./services/auth/LoginProvider";

const loadingSpin = (
    <LoadingOutlined
        style={{
            fontSize: 48
        }}
        spin
    />
)

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route exact path={"/login"} element={
                        <LoginProvider>
                            <LoginPage/>
                        </LoginProvider>}/>
                    <Route exact path={"/"} element={<BaseLayout/>}>
                        <Route
                            path="barang"
                            element={
                                <AuthProvider role={['SUPERADMIN', 'ADMIN', 'OPERATOR', 'AUDIT']}>
                                    <GoodsPage/>
                                </AuthProvider>
                            }
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App;
