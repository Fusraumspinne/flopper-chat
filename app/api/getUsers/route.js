// api/getUsers.js

import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req){
    try{
        await connectMongoDB();
        const users = await User.find(); // Benutzer mit .find() abrufen
        console.log(users);
        return NextResponse.json({ users });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Ein Fehler ist beim Abrufen der Benutzer aufgetreten" });
    }
}