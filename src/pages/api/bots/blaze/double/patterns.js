import DBWalker from "dbwalker";
import { v4 as uuidv4 } from 'uuid';
import cors from "@/root/src/libs/cors";


export default async function handler(req, res) {
    cors(req, res);
    if (req.method === "PUT") {
        res.status(200).json({});
    } else if (req.method === "GET") {
        const db = new DBWalker();

        const patterns = await db.select({
            table: "patterns",
        }).run();

        res.status(200).json({ ...patterns });
    } else if (req.method === "POST") {

        const db = new DBWalker();
        console.log(req.body)


        const patterns = await db.insert({
            table: "patterns",
            data: {
                uuid: uuidv4(),
                user_uuid: req.body.user_uuid,
                type: req.body.type,
                pattern: req.body.pattern,
                result: req.body.result,
                timestamp: req.body.timestamps ?? null,
            }
        }).run();

        console.log(patterns)
        res.status(200).json({ ...patterns });
    } else if (req.method === "DELETE") {
        res.status(204).json({});
    } else {
        res.status(405).json({ error: true });
    }
}