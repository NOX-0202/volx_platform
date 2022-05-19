import { blazeApi } from "@/root/src/libs/api";
import axios from "axios";

export default async function handler(req, res) {
    if (req.method === "PUT") {
        res.status(200).json({});
    } else if (req.method === "GET") {

        // try {
        const req_blaze = await blazeApi.get(`https://blaze.com/api/roulette_games/recent`);
        console.log(req_blaze)
        return res.status(200).json(req_blaze.data);
        // } catch (e) {
        //     res.status(500).json({ error: true });
        // }
    } else if (req.method === "POST") {
        res.status(200).json({});
    } else if (req.method === "DELETE") {
        res.status(204).json({});
    } else {
        res.status(405).json({ error: true });
    }
}