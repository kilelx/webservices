import "dotenv/config"
import { createServer, Server } from "http";
import app from "./app";

// On crée un server qui se base sur l'app
const server: Server = createServer(app);
// On utilise le port 3000
const port: number = Number(process.env.PORT) ?? 3000;

// On écoute le serveur sur le port
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})