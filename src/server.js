/**
 * Author: Đạt Võ - https://github.com/datvt243
 * Date: `--/--`
 * Description: Learning nodejs basic
 */

import 'dotenv/config';

import path, { dirname } from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import exitHook from 'exit-hook';

import { errorsMiddelware } from './middlewares/errors.middleware.js';
import { _consolog } from './utils/index.js';

import { sessionConfig } from './config/session.config.js';
import { corsConfig } from './config/cors.config.js';

import router from './routers/index.js';

const runServer = () => {
    const app = express();

    const __dirname = dirname(new URL(import.meta.url).pathname);

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
        const str = NODE_ENV === 'development' ? `http://localhost:${LOCAL_PORT}` : LOCAL_PORT;
        _consolog(`App listening on port: ${str}`);
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
const { LOCAL_PORT, NODE_ENV } = process.env;
import connectMongo from './database/mongo.db.js';
connectMongo(() => {
    runServer?.();
});
