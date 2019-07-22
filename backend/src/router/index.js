import cors from 'cors';
import config from '../config';
import api from './routes/api';
import auth from './routes/auth';

const corsOptions = {
    origin: config.get('server:frontend'),
    credentials: true,
    optionsSuccessStatus: 200
};

module.exports = (app) => {
    app.use(cors(corsOptions));
    app.use('/auth', auth);
    app.use('./main', api);
};