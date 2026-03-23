import React from 'react'
import AdminBar from '@/components/AdminBar';

export default function page() {
  return (
    <div>
      <AdminBar/>
      <a href="/admin/chinese" style={{color:"black", fontFamily: 'Times New Roman, Times, serif'}}><h1>Chinese Series</h1></a>
      <a href="/admin/korean" style={{color:"black", fontFamily: 'Times New Roman, Times, serif'}}><h1>Korean Series</h1></a>
      <a href="/admin/europe" style={{color:"black", fontFamily: 'Times New Roman, Times, serif'}}><h1>TV Series</h1></a>
      <a href="/admin/register" style={{color:"black", fontFamily: 'Times New Roman, Times, serif'}}><h1>Register</h1></a>
      </div>
      
  )
}
