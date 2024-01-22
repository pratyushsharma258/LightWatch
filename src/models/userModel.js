const { Schema, model, models } = require("mongoose");

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "user", "super"],
    required: true,
  },
  isAllowed: { type: Boolean, required: true, default: false },
});

export const userModel = models.userSchema || model("userSchema", userSchema);
