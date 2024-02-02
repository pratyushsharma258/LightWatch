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
        res.json({ filed: false });
      }
      res.json({ filed: true });
    } else {
      const { description, userId } = req.body;
      try {
        await grievanceModel.create({ description, userId });
      } catch {
        res.json({ filed: false });
      }
      res.json({ filed: true });
    }
  }
  if (method === "GET") {
    const allGrievances = await grievanceModel.find({});
    res.json({ allGrievances });
  }
}
