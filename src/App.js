import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import BaseLayout from "./pages/BaseLayout";
import GoodsPage from "./pages/goods/GoodsPage";

function App() {
    return(
        <BrowserRouter>
            <Routes>
                <Route exact path={"/"} element={<BaseLayout/>}>
                    <Route
                        path="barang"
                        element={
                            <GoodsPage />
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
