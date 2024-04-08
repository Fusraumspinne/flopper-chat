// api/getMessages.js

import { connectMongoDB } from "@/lib/mongodb";
import Message from "@/models/message";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectMongoDB();
        const messages = await Message.find(); 
        return NextResponse.json({ messages });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Ein Fehler ist beim Abrufen der Nachrichten aufgetreten" });
    }
}
