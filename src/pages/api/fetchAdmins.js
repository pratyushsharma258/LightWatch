import { mongooseConnect } from "@/lib/mongoose";
import { userModel } from "@/models/userModel";

export default async function handler(req, res) {
  const { method } = req;

  await mongooseConnect();

  if (method === "GET") {
    const admins = userModel.find({ role: "admin" });
    res.json({ ...admins });
  }
}
