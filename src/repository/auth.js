import axiosIntance from "./axios-instance";

const login = async (email, password) => {
    try {
        let result = await axiosIntance().post("employee/login", { email, password });
        return { status: true, employee: result.data.employee, token: result.data.token, message: result.data.message}
    } catch (error) {
        if (error.response) {
            return { status: false, message: error.response.data.message }
        } else if (error.request) {
            return { status: false, message: "Server error" }
        } else {
            return { status: false, message: "Error tidak diketahui" }
        }
    }
}

export {login}