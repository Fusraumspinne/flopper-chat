import { connectMongoDB } from "@/lib/mongodb";
import Group from "@/models/group";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectMongoDB();
        const groups = await Group.find(); 
        return NextResponse.json({ groups });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Ein Fehler ist beim Abrufen der Gruppen aufgetreten" });
    }
}
