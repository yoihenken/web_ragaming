import axiosIntance from "./axios-instance";
import Constant from '../constant'
import moment from "moment";

const getGoodsAll = async () => {
    try {
        let response = await axiosIntance().get("goods/all", {
            headers: {
                token: localStorage.getItem(Constant.STORAGE_KEY.TOKEN)
            }
        })
        return {status: true, goods: response.data.goods}
    } catch (error) {
        return {
            status: false,
            goods: null,
            message: error.response.message
        }
    }
}

const getGoodsExport = async () => {
    try {
        let response = await axiosIntance().get('goods/export/' + `report_${moment().format('D-MM-YYYY')}`, {
            headers: {
                token: localStorage.getItem(Constant.STORAGE_KEY.TOKEN)
            },
            responseType: 'blob'
        })
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `report_${moment().format('D-MM-YYYY')}.xlsx`); //or any other extension
        document.body.appendChild(link);
        link.click();
        return {status: true, goods: null}
    } catch (error) {
        return {
            status: false,
            goods: null,
            message: error.response.message
        }
    }
}

const postGoodsInsert = async (request) => {
    try {
        let response = await axiosIntance().post('goods/insert', request, {
            headers: {
                token: localStorage.getItem(Constant.STORAGE_KEY.TOKEN)
            }
        })
        return {status: true, goods: response.data.goods}
    } catch (error) {
        return {
            status: false,
            goods: null,
            message: error.response.data.message
        }
    }
}

const postGoodsUpdateAll = async (request) => {
    try {
        let response = await axiosIntance().post('goods/update/all', {goods_update: request}, {
            headers: {
                token: localStorage.getItem(Constant.STORAGE_KEY.TOKEN)
            }
        })
        return {status: true, goods: response.data.goods}
    } catch (error) {
        return {
            status: false,
            goods: null,
            message: error.response.data.message
        }
    }
}

const postGoodsUpdateGoodsIn = async (request) => {
    try {
        let response = await axiosIntance().post('goods/update/goods_in', {id: request.id, goods_in: request.addGoodsIn}, {
            headers: {
                token: localStorage.getItem(Constant.STORAGE_KEY.TOKEN)
            }
        })
        return {status: true, goods: response.data.goods}
    } catch (error) {
        return {
            status: false,
            goods: null,
            message: error.response.data.message
        }
    }
}

const postGoodsUpdateGoodsOut = async (request) => {
    try {
        let response = await axiosIntance().post('goods/update/goods_out', {id: request.id, goods_out: request.addGoodsOut}, {
            headers: {
                token: localStorage.getItem(Constant.STORAGE_KEY.TOKEN)
            }
        })
        return {status: true, goods: response.data.goods}
    } catch (error) {
        return {
            status: false,
            goods: null,
            message: error.response.data.message
        }
    }
}

const postGoodsDelete = async (id) => {
    try {
        let response = await axiosIntance().post('goods/delete/' + id, {}, {
            headers: {
                token: localStorage.getItem(Constant.STORAGE_KEY.TOKEN)
            }
        })
        return {status: true, goods: response.data.goods}
    } catch (error) {
        return {
            status: false,
            goods: null,
            message: error.response.data.message
        }
    }
}

export {getGoodsAll, postGoodsInsert, postGoodsUpdateAll, postGoodsUpdateGoodsIn, postGoodsUpdateGoodsOut, postGoodsDelete, getGoodsExport}