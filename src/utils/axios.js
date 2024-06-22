import axios from 'axios';

/* const URL_PRODUCTION = `http://localhost:3001/api/v1`;
const URL_DEV = `http://localhost:3001/api/v1`; */

const URL_PRODUCTION = `https://nodejs-resume-api.onrender.com/api/v1`;
const URL_DEV = `http://localhost:3001/api/v1`;
const URL = window.location.hostname === 'localhost' ? URL_DEV : URL_PRODUCTION;

export const fnAxios = (props) => {
    const { method = 'get', url = '', data = {} } = props;
    return new Promise((resolve, reject) => {
        if (!url || Object.keys(data)?.length) {
            reject({ success: false, message: 'Data is empty', errors: null });
        }
        axios
            .post(`${URL}/${url}`, data)
            .then((res) => {
                resolve({ success: true, message: `Axios ${method} is Success`, errors: null, data: res });
            })
            .catch((err) => {
                reject({ success: false, message: `Axios ${method} is Failed`, errors: err, data: null });
            });
    });
};
