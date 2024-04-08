import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import AllMessage from "@/models/allMessage"

export async function POST(req) {
    try {
        const { send, name, message, time } = await req.json()
        await connectMongoDB()
        await AllMessage.create({send, name, message, time})

        return NextResponse.json({ message: "Message send." }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "An error occurred while sending message." },{ status: 500 });
    }
}