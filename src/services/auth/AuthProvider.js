import {useLocation,} from 'react-router-dom';
import Const from '../../constant';
import {Navigate, useNavigate} from "react-router";

function AuthProvider({ children, role }) {
    const token = localStorage.getItem(Const.STORAGE_KEY.TOKEN)
    const user = JSON.parse(localStorage.getItem(Const.STORAGE_KEY.USER_INFO))
    const location = useLocation();
    if (token == null || user == null) {
        return <Navigate to="/login" state={{ from: location }} />
    } else if(!role.includes(user.role)){
        return <Navigate to="/barang" />
    }

    return children
}

export default AuthProvider