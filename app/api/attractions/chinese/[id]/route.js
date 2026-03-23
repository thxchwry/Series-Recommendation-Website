import { NextResponse } from "next/server";
import { mysqlPool } from "@/utils/db";
 
export async function GET(request, {params}){
    const id = params.id
    const promisePool = mysqlPool.promise()
    const [rows, fileds] = await promisePool.query("SELECT * FROM  serieschinese WHERE id = "+id)    
    return NextResponse.json(rows[0])
}