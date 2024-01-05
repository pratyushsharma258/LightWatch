const { Schema, model, models } = require("mongoose");

const userSchema = new Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        role: {
            type: String,
            enum: ['admin', 'user'],
            required: true
        }

    }
);

export const userModel = models.userSchema || model('userSchema', userSchema);