import { blazeApi } from "@/root/src/libs/api";
import axios from "axios";

export default async function handler(req, res) {
    if (req.method === "PUT") {
        res.status(200).json({});
    } else if (req.method === "GET") {

        try {
            const req = await blazeApi.get(`https://blaze.com/api/roulette_games/recent/history`);
            console.log(req)
            res.status(200).json(req.data);
        } catch (e) {
            res.status(500).json({ error: true });
        }
    } else if (req.method === "POST") {
        res.status(200).json({});
    } else if (req.method === "DELETE") {
        res.status(204).json({});
    } else {
        res.status(405).json({ error: true });
    }
}