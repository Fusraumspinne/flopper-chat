import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import GroupMessage from "@/models/groupMessage"

export async function POST(req) {
    try {
        const { groupId, send, name, message, time } = await req.json()
        await connectMongoDB()
        await GroupMessage.create({ groupId, send, name, message, time })

        return NextResponse.json({ message: "Message send." }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "An error occurred while sending message." },{ status: 500 });
    }
}