import express from 'express';
import { NotFound } from './middlewares/not-found.middleware';
import { Health } from './routes/health.route';
import routes from './routes'

const app = express();

app.use(express.json())

app.use('/health', Health);

app.use('/api/v1', routes);

// tout à la fin, donc si pas de requêtes interceptées avant = 404
app.use(NotFound);

export default app;