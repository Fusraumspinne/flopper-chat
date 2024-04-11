import mongoose, { Schema, models } from "mongoose";

const groupSchema = new Schema(
    {
        groupName: {
            type: String,
            required: true,
        },
        icon: {
            type: String,
            required: true
        },
        admin: {
            type: String,
            required: true,
        },
        members : {
            type: [String],
            required: true
        }
    },
    { timestamps: true }
);

const Group = models.Group || mongoose.model("Group", groupSchema);
export default Group;