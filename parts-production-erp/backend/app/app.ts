import express from 'express';
import { verifyAdmin } from '../utility/verifyAdmin';
import { connectToMongo } from './connections/mongo.connection';
import { registerRoutes } from './routes';

export const startServer = async () => {
    const app = express();

    await connectToMongo();
    await verifyAdmin();
    registerRoutes(app);

    const { PORT } = process.env;

    app.listen(PORT, () => {
        console.log(`Listening on ${PORT} port.`)
    })
}