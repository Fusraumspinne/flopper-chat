import { connectMongoDB } from "@/lib/mongodb";
import AllMessage from "@/models/allMessage";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectMongoDB();
        const allMessages = await AllMessage.find(); 
        return NextResponse.json({ allMessages });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Ein Fehler ist beim Abrufen der Nachrichten aufgetreten" });
    }
}
