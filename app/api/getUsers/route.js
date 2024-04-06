import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user"
import {NextResponse} from "next/server"

export async function GET(req){
    try{
        await connectMongoDB()
        const users = await User.find()
        return NextResponse.json({users})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "An errror occurred while fetching users"})
    }
}