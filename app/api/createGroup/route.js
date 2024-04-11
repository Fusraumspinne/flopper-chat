import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Group from "@/models/group"

export async function POST(req) {
    try {
        const { groupName, icon, admin, members } = await req.json()
        await connectMongoDB()
        await Group.create({groupName, icon, admin, members})

        return NextResponse.json({ message: "Group created." }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "An error occurred while creating Group." },{ status: 500 });
    }
}