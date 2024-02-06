import { mongooseConnect } from "@/lib/mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "@/models/userModel";

export default async function handler(req, res) {
  await mongooseConnect();

  const { username, email, password, userRole } = req.body;
  const isAllowed = userRole === "user" ? true : false;

  const ifExists = await userModel.findOne({
    username,
  });

  if (ifExists?.username) {
    return res.json({ found: "true" });
  }

  const hashedPass = await bcrypt.hash(password, 10);

  const newUser = await userModel.create({
    username,
    email,
    password: hashedPass,
    role: userRole,
    isAllowed,
  });

  const createdUserId = newUser._id;

  const token = jwt.sign(
    { username, userRole, userId: createdUserId },
    process.env.JWT_SECRET
  );

  res.setHeader("Set-Cookie", `token=${token}; Max-Age=${172800}; Path=/`);

  return res.json({ found: "false", newUser });
}
