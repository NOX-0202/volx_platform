import NextCors from "nextjs-cors";

export default async function cors(req, res) {
    console.log('in-CORS')
    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200
    });
}