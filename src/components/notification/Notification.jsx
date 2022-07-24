import {notification} from "antd";

export const Notification = (type, message, description) => {
    return notification[type]({
        message: message,
        description: description
    });
};