import mongoose, { Schema, models } from "mongoose";

const groupMessageSchema = new Schema(
    {   
        groupId: {
            type: String,
            required: true
        },
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

const GroupMessage = models.GroupMessage || mongoose.model("GroupMessage", groupMessageSchema);
export default GroupMessage;