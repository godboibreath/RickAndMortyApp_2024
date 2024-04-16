import axios, { Axios } from 'axios';
import ErrorHandler from './ErrorHandler';
import Logger from './Logger';

class AxiosModule {
    private instance: Axios;
    private logService: string;
    constructor() {
        this.instance = axios.create({
            baseURL: 'https://rickandmortyapi.com/api',
            responseType: 'json',
            responseEncoding: 'utf-8',
            timeout: 10000,
        });
        this.logService = 'AxiosModule';
    }
    public getRequest = async <T = any>(url: string): Promise<T | undefined> => {
        try {
            const responseData = await this.instance.get(url).then((res) => res.data);
            Logger.info(`Request ${url}, response data: ${JSON.stringify(responseData)}`, this.logService);
            return responseData;
        } catch (error) {
            ErrorHandler.handleError(error as Error, this.logService);
        }
    };
}

export default new AxiosModule();
