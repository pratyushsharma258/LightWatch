import { mongooseConnect } from "@/lib/mongoose";
import { userModel } from "@/models/userModel";

export default async function handle(req, res) {

    const { method } = req;

    await mongooseConnect();

    if (method === "POST") {
        const { username, email, password, userRole } = req.body;

        const ifExists = await userModel.findOne({
            username
        })

        if (ifExists.username) {
            res.json({ "found": "true" });
        }
        else {
            const newUser = await userModel.create({
                username,
                email,
                password,
                role: userRole
            })

            res.json(newUser);
        }

    }

}