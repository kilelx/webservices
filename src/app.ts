import express from 'express';
import { NotFound } from './middlewares/not-found.middleware';
import { Health } from './routes/health.route';
import routes from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerOptions from '../swagger/options';
import pinoHttp from './middlewares/pino-http.middleware';

const app = express();
const swaggerJSdoc = require('swagger-jsdoc');
const specs = swaggerJSdoc(swaggerOptions);

app.use(express.json());

app.use(pinoHttp);

app.use('/health', Health);

app.use('/api/v1', routes);

// Route du Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

// tout à la fin, donc si pas de requêtes interceptées avant = 404
app.use(NotFound);

export default app;
