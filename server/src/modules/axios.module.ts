import axios, { Axios } from 'axios';
import ErrorHandler from './errorHandler.module';
import Logger from './logger.module';

class AxiosModule {
    private instance: Axios;
    private logService: string;
    constructor() {
        this.instance = axios.create({
            baseURL: 'https://rickandmortyapi.com/api',
            timeout: 10000,
        });
        this.logService = 'AxiosModule';
    }
    async getRequest(url: string) {
        try {
            const responseData = await this.instance.get(url).then((res) => res.data);
            Logger.info(`Request ${url}, response data: ${responseData}`, this.logService);
            return responseData;
        } catch (error) {
            ErrorHandler.handleError(error as Error, this.logService);
        }
    }
}

export default new AxiosModule();
