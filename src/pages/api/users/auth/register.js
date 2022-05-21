import cors from "@/root/src/libs/cors";
import DBWalker from "dbwalker"; import md5 from "md5";
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
    cors(req, res);

    const { query, params, body, headers } = req;

    const db = new DBWalker();

    if (req.method === "PUT") {
        res.status(200).json({});
    } else if (req.method === "GET") {
        res.status(200).json({});
    } else if (req.method === "POST") {
        const insert_data = {
            uuid: uuidv4(),
            email: body.email,
            password: md5(body.password),
            name: body.name,
            username: body.username,
            role_id: 4,
            active: 1
        }
        const insertUser = await db.insert({
            table: "users",
            data: insert_data
        }).run()

        res.status(200).json({ success: insertUser.success, id: insertUser.insert_id, ...insert_data });
    } else if (req.method === "DELETE") {
        res.status(204).json({});
    } else {
        res.status(405).json({ error: true });
    }
}