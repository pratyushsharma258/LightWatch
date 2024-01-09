import { mongooseConnect } from "@/lib/mongoose";
import { streetLightModel } from "@/models/streetLightModel";

export default async function handler(req, res) {
    const { method } = req;

    await mongooseConnect();

    if (method === "GET") {
        const { lat, long, ratedWattage, criticalWattage, expectedLife, description } = req.query;

        const newLight = await streetLightModel.create({
            latitude: lat, longitude: long, ratedWattage, criticalWattage, expectedLife, description
        });

        return res.json(newLight);
    }
    else if (method === "DELETE") {
        const { lat, long } = req.query;

        const deletedLight = await streetLightModel.deleteOne({
            latitude: lat, longitude: long
        });

        return res.json({ deleteStatus: deletedLight.acknowledged })
    }
}   