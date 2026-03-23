import { NextResponse } from "next/server";
import { mysqlPool } from "@/utils/db";

const db = mysqlPool.promise();

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const nameseries = searchParams.get("nameseries");

    let rows;

    if (nameseries) {
      [rows] = await db.query("SELECT * FROM comment WHERE LOWER(nameseries) = LOWER(?)", [nameseries]);
    } else {
      [rows] = await db.query("SELECT * FROM comment");
    }

    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch: " + error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { username, nameseries, comment } = await request.json();

    if (!username || !nameseries || !comment) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    console.log("เพิ่มคอมเมนต์:", { username, nameseries, comment });

    const [result] = await db.query(
      "INSERT INTO comment (username, nameseries, comment) VALUES (?, ?, ?)",
      [username, nameseries, comment]
    );

    return NextResponse.json(
      { id: result.insertId, username, nameseries, comment },
      { status: 201 }
    );
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการเพิ่มคอมเมนต์:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

