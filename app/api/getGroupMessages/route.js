import { connectMongoDB } from "@/lib/mongodb";
import GroupMessage from "@/models/groupMessage";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectMongoDB();
        const groupMessages = await GroupMessage.find(); 
        return NextResponse.json({ groupMessages });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Ein Fehler ist beim Abrufen der Nachrichten aufgetreten" });
    }
}
