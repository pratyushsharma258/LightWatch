import { mongooseConnect } from "@/lib/mongoose";
import { userModel } from "@/models/userModel";

export default async function handle(req, res) {

    const { method } = req;

    await mongooseConnect();

    if (method === "GET") {
        const { username, password } = req.body;

        const ifExists = await userModel.findOne({
            username, password
        })

        if (ifExists.username) {
            res.json(ifExists);
        }
        else
        

    }

}