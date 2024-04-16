import Logger from './logger.module';

class ErrorHandler {
    private logService: string;
    constructor() {
        this.logService = 'ErrorHandler';
    }
    handleError(error: Error, service?: string) {
        Logger.error(error.message, service ?? this.logService);
    }
}

export default new ErrorHandler();
