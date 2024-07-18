import mongoose from 'mongoose'
import { cache } from 'react';

const MONGODB_URL = process.env.MONGODB_URL;

let cached = (global as any).mongoose || {conn: null, promise: null};

export const connectToDb = async ()=>{
    if(cached.conn) return cached.conn;

    if(!MONGODB_URL) throw new Error('MongoDB url is not present')
    
    cached.promise = cached.promise || mongoose.connect(MONGODB_URL,{
        dbName: 'quizly',
        bufferCommands: false
    })
    
    cached.conn = await cached.promise;

    return cached.conn
}
// https://www.youtube.com/watch?v=ZZCXnNAOqqU