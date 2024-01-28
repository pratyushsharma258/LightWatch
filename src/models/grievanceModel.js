const { Schema, model, models, Types } = require("mongoose");

const grievanceSchema = new Schema({
  userId: { type: Types.ObjectId, required: true },
  streetLightId: { type: Types.ObjectId, required: false },
  description: { type: String, required: true },
  filedAt: { type: String, default: Date.now, required: true },
});

export const grievanceModel =
  models.grievanceSchema || model("grievanceSchema", grievanceSchema);
