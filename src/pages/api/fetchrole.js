import { mongooseConnect } from "@/lib/mongoose";
import { userModel } from "@/models/userModel";

export default async function handle(req, res) {

    const { method } = req;

    console.log(req.body);

    await mongooseConnect();

    if (method === "GET") {
        const { userId, userRole } = req.body;

        const ifExists = await userModel.findOne({
            _id: userId, role: userRole
        })

        if (ifExists?.username) {
            return res.json({ "found": "true" });
        }
        else {
            return res.json({ "found": "false" });
        }

    }

}