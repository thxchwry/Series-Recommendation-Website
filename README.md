# Series Recommendation Website (Next.js + MySQL) 🎬🍿

โปรเจกต์เว็บแอปพลิเคชันสำหรับแนะนำซีรีส์ยอดนิยมจากทั่วทุกมุมโลก (เกาหลี, จีน, ยุโรป) พัฒนาด้วยเฟรมเวิร์ก **Next.js (App Router)** พร้อมระบบบริหารจัดการข้อมูลหลังบ้าน (Admin Panel) และการเชื่อมต่อฐานข้อมูล **MySQL** แบบ Full-stack

---

## 🔍 ภาพรวมของโปรเจกต์

แพลตฟอร์มนี้ถูกออกแบบมาเพื่อให้ผู้ใช้งานสามารถเลือกชมรายการซีรีส์ที่แนะนำ แบ่งตามหมวดหมู่สัญชาติของซีรีส์ โดยมีระบบสมาชิก (Authentication) ทั้งในส่วนของผู้ใช้ทั่วไปเพื่อดูข้อมูลและแสดงความคิดเห็น และส่วนของผู้ดูแลระบบ (Admin) เพื่อทำการจัดการข้อมูลซีรีส์ (CRUD Operations) ผ่านหน้าเว็บโดยตรง

โปรเจกต์นี้เน้นการเรียนรู้เรื่อง **Modern Web Development**, **API Routes**, **Component-based UI** และการจัดการฐานข้อมูลแบบ Relational Database

---

## 🛠️ เทคโนโลยีที่ใช้

- **Frontend**: Next.js 14+ (React), Tailwind CSS
- **Backend**: Next.js API Routes (Serverless Functions)
- **Database**: MySQL (เชื่อมต่อผ่านไลบรารี `mysql2`)
- **State Management**: React Hooks (useState, useEffect)
- **Icons & UI**: Lucide React / Custom Components

---

## 📂 โครงสร้างโปรเจกต์โดยย่อ

```text
series-recommendation-website/
├── app/
│   ├── admin/             # ระบบจัดการสำหรับ Admin (Insert/Update/Delete)
│   ├── api/               # API Endpoints สำหรับเชื่อมต่อฐานข้อมูล
│   ├── attractions/       # หน้าแสดงรายละเอียดซีรีส์แยกตามหมวดหมู่
│   ├── home/              # หน้าหลักของผู้ใช้งานทั่วไป
│   ├── login/             # ระบบเข้าสู่ระบบ
│   └── register/          # ระบบลงทะเบียนสมาชิกใหม่
├── components/            # UI Components ที่ใช้ซ้ำ (Navbar, Cards, AdminBar)
├── utils/
│   └── db.js              # ไฟล์ตั้งค่าการเชื่อมต่อฐานข้อมูล MySQL
├── public/                # ไฟล์ Static เช่น รูปภาพประกอบ
└── README.md              # ไฟล์อธิบายโปรเจกต์
```
