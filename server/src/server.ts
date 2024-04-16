import express, { Express } from 'express';
import Logger from './modules/logger.module';

class App {
    private app: Express;

    constructor() {
        this.app = express();
        this.app.get('/', (req, res) => {
            res.send('Hello from Express!!!');
        });
    }

    public start() {
        this.app.listen(process.env.PORT, () => {
            Logger.info(`Server started on port: ${process.env.PORT}`);
        });
    }
}

export default new App();
