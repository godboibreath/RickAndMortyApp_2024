import { Response, Request } from 'express';
import ErrorHandler from './ErrorHandler';
import Logger from './Logger';

class ApiHandler {
    private logService: string;
    constructor() {
        this.logService = 'ApiHandler';
    }

    public error = <T = object>(res: Response, status: number, data: T): void => {
        try {
            // todo типизация try catch
            res.status(status).type('application/json').json(data);
            Logger.warning(`Send error, status: ${status}, data: ${JSON.stringify(data)}`, this.logService);
        } catch (error) {
            ErrorHandler.handleError(error as Error, this.logService);
        }
    };

    public success = <T = object>(res: Response, status: number, data: T): void => {
        try {
            res.status(status).type('application/json').json(data);
            Logger.notice(`Send success, status: ${status}, data: ${JSON.stringify(data)}`, this.logService);
        } catch (error) {
            ErrorHandler.handleError(error as Error, this.logService);
        }
    };
}

export default new ApiHandler();
