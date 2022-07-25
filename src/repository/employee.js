import axiosIntance from "./axios-instance";
import Constant from '../constant'

const getEmployeeAll = async () => {
    try {
        let response = await axiosIntance().get("employee/get", {
            headers: {
                token: localStorage.getItem(Constant.STORAGE_KEY.TOKEN)
            }
        })
        return {status: true, employee: response.data.employee}
    } catch (error) {
        return {
            status: false,
            employee: null,
            message: error.response.message
        }
    }
}

const postEmployeeCreate = async (request) => {
    try {
        let response = await axiosIntance().post('employee/create', request, {
            headers: {
                token: localStorage.getItem(Constant.STORAGE_KEY.TOKEN)
            }
        })
        return {status: true, employee: response.data.employee}
    } catch (error) {
        return {
            status: false,
            employee: null,
            message: error.response.data.message
        }
    }
}

const postEmployeeUpdate = async (request) => {
    try {
        let response = await axiosIntance().post('employee/update', request, {
            headers: {
                token: localStorage.getItem(Constant.STORAGE_KEY.TOKEN)
            }
        })
        return {status: true, employee: response.data.employee}
    } catch (error) {
        return {
            status: false,
            employee: null,
            message: error.response.data.message
        }
    }
}

const postEmployeeCheckPassword = async (request) => {
    try {
        let response = await axiosIntance().post('employee/check-password', request, {
            headers: {
                token: localStorage.getItem(Constant.STORAGE_KEY.TOKEN)
            }
        })
        return {status: true, employee: null}
    } catch (error) {
        return {
            status: false,
            employee: null,
            message: error.response.data.message
        }
    }
}

const postEmployeeChangePasswordAdmin = async (request) => {
    try {
        let response = await axiosIntance().post('employee/change-password', request, {
            headers: {
                token: localStorage.getItem(Constant.STORAGE_KEY.TOKEN)
            }
        })
        return {status: true, employee: null}
    } catch (error) {
        return {
            status: false,
            employee: null,
            message: error.response.data.message
        }
    }
}

const postEmployeeChangePasswordEmployee = async (request) => {
    try {
        const {id, passwordOld, passwordNew} = request
        let responseCheck = await axiosIntance().post('employee/check-password', {id, password : passwordOld}, {
            headers: {
                token: localStorage.getItem(Constant.STORAGE_KEY.TOKEN)
            }
        })
        if (responseCheck.data.status == undefined) return {status: false, employee: null, message: responseCheck.data.message}
        let responseChange = await axiosIntance().post('employee/change-password', {id, password : passwordNew}, {
            headers: {
                token: localStorage.getItem(Constant.STORAGE_KEY.TOKEN)
            }
        })
        return {status: true, employee: null}
    } catch (error) {
        console.log('err', error.response)
        return {
            status: false,
            employee: null,
            message: error.response.data.message
        }
    }
}

export {getEmployeeAll, postEmployeeCreate, postEmployeeUpdate, postEmployeeCheckPassword, postEmployeeChangePasswordAdmin, postEmployeeChangePasswordEmployee}