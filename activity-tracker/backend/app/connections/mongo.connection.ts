import { connect } from "mongoose";
import initDB from "../utility/database";
import { blockScheduler } from "../utility/scheduler";

export const connectToMongo = async () => {
    try {
        const MONGO_CONNECTION = process.env.MONGO_CONNECTION || '';
        await connect(MONGO_CONNECTION);
        await initDB();
        blockScheduler();
        console.log('Connected to MongoDB');
    } catch (error) {
        throw error;
    }
}