import { connectMongoDB } from "@/lib/mongodb"
import User from "@/models/users"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"

export async function POST (req:any){
    try {
        const {name, email, password} = await req.json()
        const hashPassword = await bcrypt.hash(password,10)
        await connectMongoDB()
        await User.create({name, email, password: hashPassword})
        return NextResponse.json({message:"User Registered"}, {status:201})
    } catch(error) {
            return NextResponse.json({message:"An Error Occured While Register User"}, {status:500})
        
    }
}