import Logger from './Logger';

class ErrorHandler {
    private logService: string;

    constructor() {
        this.logService = 'ErrorHandler';
    }

    public handleError = (error: Error, service?: string): void => {
        Logger.error(error.message, service ?? this.logService);
    };
}

export default new ErrorHandler();
