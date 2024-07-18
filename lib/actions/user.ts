'use server'

import User from "../models/user";
import { connectToDb } from "../services/db"

export const loginUserHandler = async(data:any)=>{
    console.log("data is", data)
    try{
        await connectToDb();
        // console.log('user backend request')
        const user = await User.findOne({email:data.email})
        if(user){
            return JSON.parse(JSON.stringify(user));
        }
        else{
            const newUser = await User.create({email:data.email,username:data.name});
            return JSON.parse(JSON.stringify({...user,new:true}))
        }
    }
    catch(e){
        console.log(e)
    }
}
export const getAllEmails = async()=>{
    // console.log("emails coming")
    try{
        await connectToDb();
        const users = await User.find()
        const emails:string[] = users.map((user)=>user.email)
        return JSON.parse(JSON.stringify(emails));
    }
    catch(e){
        console.log(e)
    }
}