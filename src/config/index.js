import 'dotenv/config';

const { SESSION_SECRET } = process.env;

export const sessionConfig = () => ({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
});
export const corsConfig = () => ({
    origin: '*',
    optionsSuccessStatus: 200,
});
