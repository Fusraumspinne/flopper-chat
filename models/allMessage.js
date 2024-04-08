import mongoose, { Schema, models } from "mongoose";

const allMessageSchema = new Schema(
    {
        send: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true,
        },
        time : {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

const AllMessage = models.AllMessage || mongoose.model("AllMessage", allMessageSchema);
export default AllMessage;