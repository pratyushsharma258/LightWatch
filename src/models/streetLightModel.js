const { Schema, model, models } = require("mongoose");

const streetLightSchema = new Schema(
    {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
        createdAt: { type: String, required: true, default: Date.now },
        ratedWattage: { type: Number, required: true },
        criticalWattage: { type: Number, required: true },
        expectedLife: { type: Number, required: true },
        description: { type: String, required: false },
    }
);

export const streetLightModel = models.streetLightSchema || model('streetLightSchema', streetLightSchema);