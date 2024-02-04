import { mongooseConnect } from "@/lib/mongoose";
import { grievanceModel } from "@/models/grievanceModel";

export default async function handler(req, res) {
  const { method } = req;

  await mongooseConnect();

  if (method === "POST") {
    if (req.body?.streetLightId) {
      const { description, userId, streetLightId } = req.body;
      try {
        await grievanceModel.create({ description, userId, streetLightId });
      } catch {
        return res.json({ filed: false });
      }
      return res.json({ filed: true });
    } else {
      const { description, userId } = req.body;
      try {
        await grievanceModel.create({ description, userId });
      } catch {
        return res.json({ filed: false });
      }
      return res.json({ filed: true });
    }
  }
  if (method === "GET") {
    const allGrievances = await grievanceModel.find({});
    return res.json({ allGrievances });
  }
  if (method === "PATCH") {
    const { _id } = req.body;
    console.log(_id);
    try {
      await grievanceModel.findByIdAndUpdate(_id, {
        status: "solved",
      });
    } catch {
      return res.json({ status: false });
    }
    return res.json({ status: true });
  }
}
