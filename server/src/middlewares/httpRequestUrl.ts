import { NextFunction, Request, Response } from 'express';
import Logger from '../modules/Logger';
import ApiHandler from '../modules/ApiHandler';

export default (req: Request, res: Response, next: NextFunction) => {
    try {
        Logger.notice(`Http request, method: ${req.method}, url: '${req.url}'`, 'httpRequestMiddleware');
        next();
    } catch (error) {
        ApiHandler.error(res, 500, { message: 'Ошибка сервера' });
    }
};
