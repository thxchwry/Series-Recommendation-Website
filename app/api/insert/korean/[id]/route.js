import { NextResponse } from "next/server";
import { mysqlPool } from "@/utils/db";

const db = mysqlPool.promise();

// ดึงข้อมูลซีรีส์จีนจาก id
export async function GET(request, { params }) {
  const id = params.id;

  try {
    const [rows] = await db.query("SELECT * FROM serieskorean WHERE id = ?", [id]);

    if (rows.length === 0) {
      return NextResponse.json({ error: "Series not found" }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch series. " + error.message }, { status: 500 });
  }
}

// อัปเดตข้อมูลซีรีส์จีน
export async function PUT(request, { params }) {
  const id = params.id;
  const data = await request.json();

  const {
    poster1, poster2, name, actor, actorpicture, actress,
    actresspicture, support1, supportpicture1, support2,
    supportpicture2, ep, application, detail
  } = data;

  try {
    const [result] = await db.query(`
      UPDATE serieskorean SET 
        poster1=?, poster2=?, name=?, actor=?, actorpicture=?, actress=?, 
        actresspicture=?, support1=?, supportpicture1=?, support2=?, 
        supportpicture2=?, ep=?, application=?, detail=? 
      WHERE id = ?
    `, [
      poster1, poster2, name, actor, actorpicture, actress,
      actresspicture, support1, supportpicture1, support2,
      supportpicture2, ep, application, detail, id
    ]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "Series not found to update" }, { status: 404 });
    }

    return NextResponse.json({ message: "Updated successfully" });
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json({ error: "Failed to update series. " + error.message }, { status: 500 });
  }
}

// ลบซีรีส์ตาม id
export async function DELETE(request, { params }) {
  const id = params.id;

  try {
    // ตรวจสอบว่า id ที่จะลบมีอยู่ในฐานข้อมูลหรือไม่
    const [checkExist] = await db.query("SELECT id FROM serieskorean WHERE id = ?", [id]);
    if (checkExist.length === 0) {
      return NextResponse.json({ error: "Series not found" }, { status: 404 });
    }

    // ลบข้อมูล
    const [result] = await db.query("DELETE FROM serieskorean WHERE id = ?", [id]);

    // ตรวจสอบว่ามีการลบข้อมูลหรือไม่
    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "Failed to delete series" }, { status: 500 });
    }

    return NextResponse.json({ message: "Series deleted successfully" });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ error: "Failed to delete series. " + error.message }, { status: 500 });
  }
}
