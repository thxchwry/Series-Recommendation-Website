import { NextResponse } from "next/server";
import { mysqlPool } from "@/utils/db";
 
export async function GET(request){
    try{
        const promisePool = mysqlPool.promise()
        const [rows, fileds] = await promisePool.query("SELECT * FROM serieschinese")
        return NextResponse.json(rows)
    }
    catch (error){
        return NextResponse.json({error:'failed to read'})
    }
}