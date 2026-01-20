import express from 'express';
import { NotFound } from './middlewares/not-found.middleware';
import { Health } from './routes/health.route';
import routes from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerOptions from '../swagger/options';
import pinoHttp from './middlewares/pino-http.middleware';
import limiter from './middlewares/limiter.middleware';
import helmet from 'helmet';
import cors from 'cors'
import { CorsOptions } from 'cors';

const app = express();
const swaggerJSdoc = require('swagger-jsdoc');
const specs = swaggerJSdoc(swaggerOptions);

app.use(limiter);
app.use(helmet());
app.use(cors());

const corsOptions: CorsOptions = {
    origin: ["http://localhost:3000", "https://mon-app.fr"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}

app.use(cors(corsOptions))

app.use(express.json());

app.use(pinoHttp);

app.use('/health', Health);

app.use('/api/v1', routes);

// Route du Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

export default app;
