import 'dotenv/config';

import path, { dirname } from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import exitHook from 'exit-hook';

import { errorsMiddelware } from './middlewares/errorsMiddleware.js';

import { sessionConfig } from './config/sessionConfig.js';
import { corsConfig } from './config/corsConfig.js';

import router from './routers/index.js';

const runServer = () => {
    const app = express();

    const __dirname = dirname(new URL(import.meta.url).pathname);
    /* console.log({ dirname: __dirname });
    console.log({ process_cwd: process.cwd() }); */

    /**
     * use Session
     */
    app.use(session(sessionConfig()));

    /**
     * use CORS
     */
    app.use(cors(corsConfig()));

    /**
     * use body-parser
     */
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    /**
     * use static-files
     */
    app.use(express.static(path.join(__dirname, './public')));

    /**
     * use router
     */
    app.use(router);

    /**
     * use middleware
     */
    app.use(errorsMiddelware);

    /**
     * use template-engine
     */
    app.set('view engine', 'pug');
    app.set('views', path.join(__dirname, 'views'));

    /**
     * listen app
     */
    app.listen(LOCAL_PORT, () => {
        console.log(`App listening on port: ${LOCAL_PORT}`);
    });

    exitHook(() => {
        /**
         * TODO: close connect mongo (coming soon...)
         */
    });
};

/**
 * connect to mongoDB
 */
const { LOCAL_PORT } = process.env;
import connectMongo from './database/mongodb.js';
connectMongo(() => {
    runServer?.();
});
