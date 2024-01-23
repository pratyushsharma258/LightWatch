import { mongooseConnect } from "@/lib/mongoose";
import { userModel } from "@/models/userModel";

export default async function handler(req, res) {
  const { method } = req;

  await mongooseConnect();

  if (method === "GET") {
    const admins = await userModel.find({ role: "admin" });
    return res.json({ admins });
  } else if (method === "PATCH") {
    const { _id, isAllowed } = req.body;

    const newOptions = isAllowed ? false : true;
    const updatedAdmin = await userModel.findByIdAndUpdate(_id, {
      isAllowed: newOptions,
    });

    return res.json({ status: true });
  }
}
