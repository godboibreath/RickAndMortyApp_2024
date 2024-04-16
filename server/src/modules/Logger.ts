import { LogLevels } from '../types/app';
import winston from 'winston';
class Logger {
    private logger: ReturnType<typeof winston.createLogger>;
    constructor() {
        winston.addColors({
            error: 'red',
            warn: 'yellow',
            info: 'blue',
            debug: 'black',
            notice: 'green',
        });

        const format = winston.format.printf(
            ({ level, message, timestamp, service, defaultService }) =>
                `${timestamp} [${level}] [${service ?? defaultService}]: ${message}`,
        );

        this.logger = winston.createLogger({
            transports: [new winston.transports.Console()],
            levels: {
                notice: -1,
                error: 0,
                warn: 1,
                info: 2,
                debug: 5,
            },
            defaultMeta: {
                defaultService: 'App',
            },
            format: winston.format.combine(
                winston.format.colorize({ message: true }),
                winston.format.timestamp({ format: 'HH:mm:ss DD.MM.YYYY' }),
                format,
            ),
        });
    }

    public log = (level: LogLevels, message: string, service?: string): void => {
        if (service) {
            this.logger.child({ service }).log(level, message);
        } else {
            this.logger.log(level, message);
        }
    };

    public info = (message: string, service?: string): void => {
        this.log(LogLevels.Info, message, service);
    };

    public warning = (message: string, service?: string): void => {
        this.log(LogLevels.Warn, message, service);
    };

    public error = (message: string, service?: string): void => {
        this.log(LogLevels.Error, message, service);
    };

    public debug = (message: string, service?: string): void => {
        this.log(LogLevels.Debug, message, service);
    };

    public notice = (message: string, service?: string): void => {
        this.log(LogLevels.Notice, message, service);
    };
}

export default new Logger();
