import { blazeApi } from "@/root/src/libs/api";
import axios from "axios";
import DBWalker from "dbwalker";

export default async function handler(req, res) {

    const db = new DBWalker()

    if (req.method === "PUT") {
        res.status(200).json({});
    } else if (req.method === "GET") {

        try {



            const get_history = await db.select({
                table: "blaze_history",
            }).run()

            return res.status(200).json(get_history);
        } catch (e) {
            res.status(500).json({ error: true });
        }
    } else if (req.method === "POST") {
        try {
            const get_history = await db.select({
                table: "blaze_history",
                columns: ["seed"],
            }).run()

            const seed_history = get_history.data.map(item => item.seed);

            if (seed_history.includes(req.body.seed)) {
                return res.status(200).json({ message: 'seed existente' });
            }

            const insert_db = await db.insert({
                table: "blaze_history",
                data: req.body
            }).run()

            res.status(200).json({ ...insert_db });
        } catch (e) {
            res.status(500).json({ error: true });
        }
    } else if (req.method === "DELETE") {
        res.status(204).json({});
    } else {
        res.status(405).json({ error: true });
    }
}