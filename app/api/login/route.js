import { NextResponse } from "next/server";
import { mysqlPool } from "@/utils/db";
import jwt from 'jsonwebtoken';

const db = mysqlPool.promise();
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
    }

    const [rows] = await db.query(
      'SELECT id, username, password FROM register WHERE username = ?',
      [username]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Username not registered' }, { status: 404 });
    }

    const user = rows[0];

    if (password !== user.password) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    // สร้าง JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    return NextResponse.json({
      message: 'Login successful',
      id: user.id,
      username: user.username,
      token
    }, { status: 200 });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
