import mysql from 'mysql2'

// สร้าง pool พร้อม promise support
export const mysqlPool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  database: process.env.MYSQL_DATABASE || 'web_project_chinese',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

