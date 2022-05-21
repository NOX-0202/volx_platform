import cors from "@/root/src/libs/cors";
import DBWalker from "dbwalker"; import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
    cors(req, res);

    const { query, params, body, headers } = req;

    const db = new DBWalker();

    if (req.method === "PUT") {
        res.status(200).json({});
    } else if (req.method === "GET") {
        res.status(200).json({});
    } else if (req.method === "POST") {
        const insertUser = await db.insert({
            table: "users",
            data: {
                uuid: uuidv4(),
                ...body,
                role_id: 4,
                active: 1
            }
        }).run()

        res.status(200).json({ ...insertUser });
    } else if (req.method === "DELETE") {
        res.status(204).json({});
    } else {
        res.status(405).json({ error: true });
    }
}