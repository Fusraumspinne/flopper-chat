import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Message from "@/models/message"

export async function POST(req) {
    try {
        const { send, recieve, message, time } = await req.json()
        await connectMongoDB()
        await Message.create({send, recieve, message, time})

        return NextResponse.json({ message: "Message send." }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "An error occurred while sending message." },{ status: 500 });
    }
}