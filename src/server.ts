import 'dotenv/config';
import { createServer, Server } from 'http';
import app from './app';
import { connectToMongo } from './db/mongo.connect';
import { setupgraphQL } from './graphql';
import { NotFound } from './middlewares';

const booststrap = async () => {
  connectToMongo(process.env.MONGO_URI ?? 'mongodb://localhost:27017/ecommerce');

  const server: Server = createServer(app);
  const port: number = Number(process.env.PORT) ?? 3000;

  await setupgraphQL(app);

  // tout à la fin, donc si pas de requêtes interceptées avant = 404
  app.use(NotFound);

  server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

booststrap();
