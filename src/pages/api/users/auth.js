import cors from "@/root/src/libs/cors";
import DBWalker from "dbwalker";
import md5 from "md5";

export default async function handler(req, res) {
    cors(req, res);

    const { query, params, body, headers } = req;

    console.log(req.method)

    if (req.method === "PUT") {
        res.status(200).json({});
    }

    if (req.method === "GET") {
    }

    if (req.method === "POST") {
        const db = new DBWalker();

        const $return = {};

        const users = await db.select({
            table: "users",
            where: [
                [
                    { email: body.login },
                    { username: body.login }
                ],
                { password: md5(body.password) }
            ],
            limit: 1
        }).run()



        return res.status(200).json({ ...users });
    }

    if (req.method === "DELETE") {
        res.status(204).json({});
    }

    res.status(405).json({ error: true });

}