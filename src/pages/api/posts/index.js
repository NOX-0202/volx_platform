import { formatDate } from "@/root/src/libs/utils";
import DBWalker from "dbwalker";
import split from "locutus/php/strings/split";
import empty from "locutus/php/var/empty";
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {

    const { body, method, params, query } = req;
    const db = new DBWalker(process.env.DBWALKER_CONNECTION_URL);

    if (req.method === "PUT") {
        console.log(body)
        body.created_at = formatDate(body.created_at);
        if (body.updated_at) body.updated_at = formatDate(body.updated_at);
        const data = await db.update({
            table: "posts",
            data: body,
            where: [{
                uuid: body.uuid ?? query.uuid
            }]
        }).run();
        res.status(200).json({ ...data });
    } else if (req.method === "GET") {
        var filters = [
            `deleted_at IS NULL`
        ];

        if (!empty(query)) Object.keys(query).map(filter => { filters.push(`${filter} = '${query[filter]}'`) });
        if (!empty(params)) Object.keys(params).map(filter => { filters.push(`${filter} = '${params[filter]}'`) });
        console.log(filters);

        const data = await db.select({
            table: "posts",
            columns: ["*"],
            where: filters
        }).run();

        console.log(data)

        return res.status(200).json(data);
    } else if (req.method === "POST") {
        body.uuid = uuidv4();
        const data = await db.insert({
            table: "posts",
            data: body
        }).run();

        res.status(200).json({ ...data });
    } else if (req.method === "DELETE") {
        const data = await db.update({
            table: "posts",
            data: {
                deleted_at: new Date().toISOString().replace("T", " ").split(".")[0]
            },
            where: [
                {
                    uuid: query.uuid
                }
            ]
        }).run();
        return res.status(200).json({ ...data });
    } else {
        res.status(405).json({ error: true });
    }
}