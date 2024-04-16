import express, { Express } from 'express';
import http, { Server } from 'http';

import Logger from './modules/Logger';
import router from './routes';
import httpRequestUrl from './middlewares/httpRequestUrl';

class App {
    private app: Express;
    private server: Server;

    constructor() {
        this.app = express();
        this.app.use(router);
        this.app.use(httpRequestUrl);
        this.server = http.createServer(this.app);
    }

    public start = (): void => {
        this.server.listen(process.env.PORT, () => {
            Logger.info(`Server started on port: ${process.env.PORT}`);
        });
    };
}

export default new App();
