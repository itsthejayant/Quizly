// app/api/users/route.ts

import { NextResponse } from 'next/server';
import { connectToDb } from "../../../lib/services/db"
import User from '../../../lib/models/user';

// Sample data for demonstration purposes
// const users = [
//     { id: 1, name: "John Doe", email: "john@example.com" },
//     { id: 2, name: "Jane Smith", email: "jane@example.com" },
//     { id: 3, name: "Mike Johnson", email: "mike@example.com" }
// ];

export async function GET() {
    try{
        await connectToDb();
        const users = await User.find()
        const emails:string[] = users.map((user)=>user.email)
        console.log('emails from db-> ', emails)
        return NextResponse.json(emails);
    }
    catch(e){
        console.log(e)
    }
}
