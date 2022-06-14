import { formatDate } from "@/root/src/libs/utils";
import DBWalker from "dbwalker";
import empty from "locutus/php/var/empty";

export default async function handler(req, res) {

    const { body, method, params, query } = req;
    const db = new DBWalker(process.env.DBWALKER_CONNECTION_URL);

    if (req.method === "PUT") {
        body.created_at = formatDate(body.created_at);
        if (body.updated_at) body.updated_at = formatDate(body.updated_at);
        console.log(body)
        const data = await db.update({
            table: "_siteinfo",
            data: body,
            where: [{
                id: body.id ?? query.id
            }]
        }).run();
        return res.status(200).json({ ...data });
    } else if (req.method === "GET") {

        var filters = [
            `active = 1`
        ];

        if (!empty(query)) Object.keys(query).map(filter => { filters.push(`${filter} = '${query[filter]}'`) });
        if (!empty(params)) Object.keys(params).map(filter => { filters.push(`${filter} = '${params[filter]}'`) });

        const data = await db.select({
            table: "_siteinfo",
            columns: ["*"],
            where: filters
        }).run();

        console.log(data)

        return res.status(200).json(data);
    } else if (req.method === "POST") {

        console.log(body)
        const data = await db.insert({
            table: "_siteinfo",
            data: [body]
        }).run();

        console.log(data)

        return res.status(200).json(data);

    } else if (req.method === "DELETE") {

        const data = await db.update({
            table: "_siteinfo",
            data: {
                active: 0
            },
            where: [
                {
                    "id": query.id
                }
            ]
        }).run();
        return res.status(200).json(data);
    } else {
        res.status(405).json({ error: true });
    }
}