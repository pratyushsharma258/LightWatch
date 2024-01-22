import { mongooseConnect } from "@/lib/mongoose";
import { streetLightModel } from "@/models/streetLightModel";

export default async function handler(req, res) {
  const { method } = req;

  await mongooseConnect();

  if (method === "POST") {
    const {
      lat,
      long,
      ratedWattage,
      luminosity,
      criticalLuminosity,
      expectedLife,
      description,
    } = req.body;

    const newLight = await streetLightModel.create({
      latitude: lat,
      longitude: long,
      ratedWattage,
      luminosity,
      criticalLuminosity,
      expectedLife,
      description,
    });

    return res.json(newLight);
  } else if (method === "GET") {
    if (!req.query.id) {
      const allLights = await streetLightModel.find({});

      const responseObject = allLights.map((light) => ({
        coordinates: [light.latitude, light.longitude],
        ratedWattage: light.ratedWattage,
        luminosity: light.luminosity,
        criticalLuminosity: light.criticalLuminosity,
        expectedLife: light.expectedLife,
        description: light.description,
        createdAt: light.createdAt,
        _id: light._id,
        __v: light.__v,
      }));

      return res.json({ responseObject });
    } else {
      const { id } = req.query;

      const foundLight = await streetLightModel.findOne({ _id: id });

      return res.json({ foundLight });
    }
  } else if (method === "DELETE") {
    const { _id } = req.query;

    const deletedLight = await streetLightModel.deleteOne({
      _id,
    });

    return res.json({
      deleteStatus: deletedLight.deletedCount == 1 ? true : false,
    });
  } else if (method === "PATCH") {
    const {
      _id,
      ratedWattage,
      luminosity,
      criticalLuminosity,
      expectedLife,
      description,
    } = req.body;

    await streetLightModel.findByIdAndUpdate(
      _id,
      {
        ratedWattage,
        luminosity,
        criticalLuminosity,
        expectedLife,
        description,
      },
      { new: true }
    );

    return res.json({ status: true });
  }
}
// 19.021134907590966 72.85179018974306 http://localhost:3000/admin/65ae6afba0fb4143f8c6f666/new?lat=19.021134907590966&long=72.85179018974306
