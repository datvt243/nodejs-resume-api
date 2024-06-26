import 'dotenv/config';

const ENV_KEYS = [
    'NODE_ENV',
    'LOCAL_PORT',
    'MONGOBD_USER',
    'MONGOBD_PASSWORD',
    'SESSION_SECRET',
    'TOKEN_SECRET',
    'TOKEN_REFRESH',
    'TOKEN_EXP_IN',
];

const result = {};
for (const k of ENV_KEYS) {
    result[k] = process.env?.[k];
}

const { NODE_ENV, LOCAL_PORT, MONGOBD_USER, MONGOBD_PASSWORD, SESSION_SECRET, TOKEN_SECRET, TOKEN_REFRESH, TOKEN_EXP_IN } =
    process.env;

export { NODE_ENV, LOCAL_PORT, MONGOBD_USER, MONGOBD_PASSWORD, SESSION_SECRET, TOKEN_SECRET, TOKEN_REFRESH, TOKEN_EXP_IN };
