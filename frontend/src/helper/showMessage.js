import { message } from "antd";

export const showMessage = (status, text) => {
    switch (Math.floor(status / 100)) {
        case 1:
            message.info(text);
            break;
        case 2:
            message.success(text);
            break;
        case 3:
            message.warning(text);
            break;
        case 4:
            message.error(text);
            break;
        case 5:
            message.error(text);
            break;
        default:
            message.info(text);
            break;
    }
};