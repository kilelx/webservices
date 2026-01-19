import { connect } from "mongoose";

export async function connectToMongo(uri: string) {
    try {
        await connect(uri)
        console.log(`Connected to MongoDB`)
    } catch (e) {
        console.error(`Connect to MongoDB failed.`)
        process.exit()
    }
}