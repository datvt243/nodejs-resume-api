import { SESSION_SECRET } from './processConfig.js';

export const sessionConfig = () => ({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
});
