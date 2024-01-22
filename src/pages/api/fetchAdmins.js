import { mongooseConnect } from "@/lib/mongoose";
import { userModel } from "@/models/userModel";

export default async function handler(req, res) {
  const { method } = req;

  await mongooseConnect();

  if (method === "GET") {
    const admins = await userModel.find({ role: "admin" });
    return res.json({ admins });
  } else if (method === "PATCH") {
    const { _id } = req.query;
    const updatedAdmin = userModel.findByIdAndUpdate(
      {
        _id,
      },
      {
        isAllowed: true,
      }
    );
    return res.json({ status: "successful" });
  }
}
