import { blazeApi } from "@/root/src/libs/api";

export default async function handler(req, res) {
    if (req.method === "PUT") {
        res.status(200).json({});
    } else if (req.method === "GET") {
        res.status(200).json({});
    } else if (req.method === "POST") {
        try {

            const login = await blazeApi.put(`/auth/password`, {
                username: req.body.username,
                password: req.body.password,
            }, {
                headers: {
                    "accept": "application/json, text/plain, */*",
                    "content-type": "application/json;charset=UTF-8",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-origin",
                    "x-captcha-response": "03AGdBq26xK4adwl1LrJtSS3BTWjX5P9s0Xs9biVsZ8CijjU065A6oO5v37wv8CKAgLfo2qUeMOcReTRWN3mPYfiVY8VshF2Y58fYS1Yj17QAyaTMuVa6De0ozhWsnH-TOMGSLnv6PlVzdAT_dMJaq17aBsG_7OoaCNJPHpe-I6XL6auvhVOpF8koe5SIDW9wRyeaGAAZ1AjlJAr6GyDl-VzEXUbbTEU9eUY-3MzLFMWjNa0yjKKHLKik1C-P8M3K-1-TiNPDYnUvD5HWj8-KhnBQhBwMsP2lxfpZaeFPyXJ61jJXJYqBbStkXOPxuU67vKay6rYEPmx1QtmiJoZ2vnb29o2MIfw-ERPGD_oaqckE5AizYI7Jfj0ha4yeEaB-4jGDj7MKT5YyAPjBYbF0fPVjHByYZeCRc9D6FG2m7UrVEuXmVCs-niOTtVgy_g_9GegbgiBEzbn_MvNfABFTulpK1xoTr6aH89Q",
                    "x-client-language": "pt",
                    "x-client-version": "8958dd8a",
                    "x-captcha-response": "09ACqW7wK6wSiur18KEebTZ2zuBw9kUXBRbkRo6xhn46C9MXAWEya_W89KkMV6EhW8joDxUfl778NEtuQLNo4TuClF0g"
                },
                mode: "aaa",
                credentials: "none"
            });


            res.status(200).json(login);
        } catch (error) {
            res.status(500).json({ success: false, error });
        }
    } else if (req.method === "DELETE") {
        res.status(204).json({});
    } else {
        res.status(405).json({ error: true });
    }
}