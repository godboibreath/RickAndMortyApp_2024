import { Request, Response } from 'express';
import ApiHandler from '../modules/ApiHandler';
import Axios from '../modules/Axios';
import Logger from '../modules/Logger';

// todo добавить этот тип в общие типы
interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: {
        name: string;
        url: string;
    };
    location: {
        name: string;
        url: string;
    };
    image: string;
    episode: string[];
    url: string;
    created: string;
}

class CharacterController {
    private logService: string;

    constructor() {
        this.logService = 'CharacterController';
    }

    public get = async (req: Request, res: Response) => {
        try {
            // todo rubtsov middleware для проверки входящих данных запросов
            if (!req.query.id || typeof +req.query.id !== 'number' || +req.query.id <= 0) {
                throw new Error(`Http get request ${req.url} has no valid id query param`);
            }
            const data = await Axios.getRequest<Character>(`/character/${req.query.id}`);
            ApiHandler.success(res, 200, data);
        } catch (error) {
            ApiHandler.error(res, 500, { message: (error as Error).message });
        }
    };
}

export default new CharacterController();
