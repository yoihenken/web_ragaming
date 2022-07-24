import {useLocation,} from 'react-router-dom';
import Const from '../../constant';
import {Navigate, useNavigate} from "react-router";

function LoginProvider({ children }) {
    const token = localStorage.getItem(Const.STORAGE_KEY.TOKEN)
    const user = JSON.parse(localStorage.getItem(Const.STORAGE_KEY.USER_INFO))
    const location = useLocation();
    if (token != null && user != null) {
        return <Navigate to="/" state={{ from: location }} />
    }

    return children
}

export default LoginProvider