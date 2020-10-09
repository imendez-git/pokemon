import { notification } from 'antd';

const success = (msg) => {
    notification.success({
        message: 'Success',
        description: msg,
        duration: 1,
        top: 40,
    });
};

const error = (msg) => {
    notification.error({
        message: 'Success',
        description: msg,
        duration: 5,
        top: 40,
    });
};

export {
    success,
    error
};