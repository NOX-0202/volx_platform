import cors from "@/root/src/libs/cors";
import DBWalker from "dbwalker";
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
    cors(req, res);

    const db = new DBWalker();

    if (req.method === "PUT") {
        res.status(200).json({});
    } else if (req.method === "GET") {

        const blaze_config = await db.select({
            table: "users_blaze_config",
            where: [
                { user_uuid: req.query.user_uuid }
            ],
        }).run();

        console.log(blaze_config);

        res.status(200).json(blaze_config);
    } else if (req.method === "POST") {

        let blaze_data = null

        if (!req.body.uuid) {
            blaze_data = await db.insert({
                table: "users_blaze_config",
                data: {
                    uuid: uuidv4(),
                    user_uuid: req.query.user_uuid,
                    ...req.body
                },
            }).run();
        } else {
            blaze_data = await db.update({
                table: "users_blaze_config",
                data: {
                    ...req.body,
                    updated_at: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
                },
                where: [
                    { uuid: req.body.uuid }
                ],
            }).run();
        }
        res.status(200).json(blaze_data);
    } else if (req.method === "DELETE") {
        res.status(204).json({});
    } else {
        res.status(405).json({ error: true });
    }
}