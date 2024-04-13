import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Message from "@/models/message";

export async function PUT(req) {
    try {
        const messagesToUpdate = await req.json();

        await connectMongoDB();

        await Promise.all(messagesToUpdate.map(async ({ _id, gelesen }) => {
            const message = await Message.findOne({ _id });

            if (!message) {
                return NextResponse.json({ message: "Nachricht nicht gefunden." }, { status: 404 });
            }

            message.gelesen = gelesen;
            await message.save();
        }));

        return NextResponse.json({ message: "Nachrichten wurden erfolgreich aktualisiert." }, { status: 200 });
    } catch (error) {
        console.error("Fehler beim Aktualisieren der Nachrichten:", error);
        return NextResponse.json({ message: "Ein Fehler ist aufgetreten." }, { status: 500 });
    }
}