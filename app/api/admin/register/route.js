import { NextResponse } from "next/server";
import { mysqlPool } from "@/utils/db";

const db = mysqlPool.promise();

export async function GET(request) {
  try {
    const [rows] = await db.query('SELECT id, fname, lname, username, email, phone FROM admin');
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: "Failed to fetch users. " + error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { fname, lname, username, email, phone, password } = await request.json();

   
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: 'Username, email, and password are required' },
        { status: 400 }
      );
    }

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }


    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    
    const [existing] = await db.query(
      'SELECT id FROM admin WHERE username = ? OR email = ?',
      [username, email]
    );

    if (existing.length > 0) {
      return NextResponse.json(
        { error: 'Username or Email already exists' },
        { status: 409 }
      );
    }

   
    const [result] = await db.query(
      'INSERT INTO admin (fname, lname, username, email, phone, password) VALUES (?, ?, ?, ?, ?, ?)',
      [fname, lname, username, email, phone, password] 
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: 'Failed to register user' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: 'User registered successfully',
        id: result.insertId,
        username,
        email
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal server error. ' + error.message }, { status: 500 });
  }
}
