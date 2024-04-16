import { configDotenv } from 'dotenv';

import app from './server';

configDotenv();

app.start();




