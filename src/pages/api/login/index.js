import { mongooseConnect } from "@/lib/mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { userModel } from "@/models/userModel";

export default async function handler(req, res) {

    await mongooseConnect();

    const { username, password, userRole } = req.query

    const ifExists = await userModel.findOne({
        username, role: userRole
    })

    // console.log(ifExists);

    const userId = ifExists._id;

    if (!ifExists?.username) {
        return res.json({ found: "false" });
    }

    await bcrypt.compare(password, ifExists.password).then(() => {
        const token = jwt.sign({ username, userRole, userId }, process.env.JWT_SECRET);
        res.setHeader('Set-Cookie', token);
        return res.json({ found: "true", token: token, passwordMatch: "true", ...ifExists });
    }
    ).catch(() => {
        return res.json({ found: "true", passwordMatch: "false" })
    })
}