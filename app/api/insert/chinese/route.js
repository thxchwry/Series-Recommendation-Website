import { NextResponse } from "next/server";
import { mysqlPool } from "@/utils/db";

const db = mysqlPool.promise();

// ดึงข้อมูลซีรีส์จีนทั้งหมด
export async function GET() {
  try {
    const [rows] = await db.query(`
      SELECT 
        id, poster1, poster2, name, actor, actorpicture, actress, actresspicture,
        support1, supportpicture1, support2, supportpicture2, ep, application, detail 
      FROM serieschinese
    `);
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error('Error fetching series:', error);
    return NextResponse.json({ error: "Failed to fetch series. " + error.message }, { status: 500 });
  }
}

// เพิ่มข้อมูลซีรีส์จีนใหม่
export async function POST(request) {
  try {
    const {
      poster1, poster2, name, actor, actorpicture, actress, actresspicture,
      support1, supportpicture1, support2, supportpicture2, ep, application, detail
    } = await request.json();

    

    // เพิ่มข้อมูลใหม่เข้าไปในฐานข้อมูล
    const [result] = await db.query(
      `INSERT INTO serieschinese (
        poster1, poster2, name, actor, actorpicture, actress, actresspicture,
        support1, supportpicture1, support2, supportpicture2, ep, application, detail
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        poster1, poster2, name, actor, actorpicture, actress, actresspicture,
        support1, supportpicture1, support2, supportpicture2, ep, application, detail
      ]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: 'Failed to add new series' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: 'Series added successfully',
        id: result.insertId,
        name,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error inserting series:', error);
    return NextResponse.json({ error: 'Internal server error. ' + error.message }, { status: 500 });
  }
}
