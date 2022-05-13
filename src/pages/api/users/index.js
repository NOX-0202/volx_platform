import DBWalker from "dbwalker";
import md5 from "md5";

export default async function handler(req, res) {

    const { query, params, body, headers } = req;

    console.log(req.method)

    if (req.method === "PUT") {
        res.status(200).json({});
    }

    if (req.method === "GET") {
        const users = await db.select({
            table: "users",
        }).run();

        return res.status(200).json({ ...users });
    }

    if (req.method === "POST") {
        res.status(200).json({});
    }

    if (req.method === "DELETE") {
        res.status(204).json({});
    }

    res.status(405).json({ error: true });

}