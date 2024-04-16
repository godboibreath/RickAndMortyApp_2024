import winston from 'winston';

const logLevels = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 5,
};

const logLevelsColors = {
    error: 'red',
    warn: 'yellow',
    info: 'blue',
    debug: 'black',
};

class Logger {
    private logger: ReturnType<typeof winston.createLogger>;
    constructor() {
        winston.addColors(logLevelsColors);

        const format = winston.format.printf(
            ({ level, message, timestamp, service, defaultService }) =>
                `${timestamp} [${level}] [${service ?? defaultService}]: ${message}`,
        );

        this.logger = winston.createLogger({
            transports: [new winston.transports.Console()],
            levels: logLevels,
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
    // todo rubtsov сделать тпизацию лога
    log = (level: string, message: string, service?: string): void => {
        if (service) {
            this.logger.child({ service }).log(level, message);
        }
        this.logger.log(level, message);
    };

    info = (message: string, service?: string): void => {
        this.log('info', message, service);
    };

    error = (message: string, service?: string): void => {
        this.log('error', message, service);
    };

    debug = (message: string, service?: string): void => {
        this.log('debug', message, service);
    };

    notice = (message: string, service?: string): void => {
        this.log('notice', message, service);
    };
}

export default new Logger();
