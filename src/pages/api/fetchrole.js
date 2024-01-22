import { mongooseConnect } from "@/lib/mongoose";
import { userModel } from "@/models/userModel";

export default async function handle(req, res) {
  const { method } = req;

  await mongooseConnect();

  if (method === "GET") {
    const { userId, userRole } = req.query;

    const ifExists = await userModel.findOne({
      _id: userId,
      role: userRole,
    });

    const username = ifExists?.username;

    if (ifExists?.username) {
      return res.json({ found: "true", username });
    } else {
      return res.json({ found: "false" });
    }
  }
}
