import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from "@/models/user";

export async function PUT(req) {
    try {
        const { email, name } = await req.json();

        await connectMongoDB();

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ message: "Benutzer nicht gefunden." }, { status: 404 });
        }

        user.name = name;
        await user.save();

        return NextResponse.json({ message: "Benutzername erfolgreich aktualisiert." }, { status: 200 });
    } catch (error) {
        console.error("Fehler beim Aktualisieren des Benutzernamens:", error);
        return NextResponse.json({ message: "Ein Fehler ist aufgetreten." }, { status: 500 });
    }
}
