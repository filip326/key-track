import express from "express";
import { Db, MongoClient } from "mongodb";
import {z} from "zod";

const envSchema = z.object({
    DB_URL: z.string(),
    PORT: z.string().regex(/^[0-9]+$/, "Expected a number").transform(arg => parseInt(arg)),
});

(async function main() {

    console.log("Starting")
    console.log(" - loading env")
    const env = envSchema.parse(process.env);
    console.log(" - connecting to Database")
    const mongoClient: MongoClient = await MongoClient.connect(env.DB_URL);
    const db: Db = mongoClient.db("key-tracker");
    console.log(" - starting web server")
    const app = express();
    app.listen(env.PORT, () => {
        console.log(`Listening on port ${env.PORT}`)
    });

})();