import { connectMongoDB } from "@/lib/mongodb";
import Message from "@/models/message"
import {NextResponse} from "next/server"

export async function GET(req){
    try{
        await connectMongoDB()
        const messages = await Message.find()
        return NextResponse.json({messages})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "An errror occurred while fetching users"})
    }
}