'use client'
import React from 'react'
import { Card, CardContent, CardMedia, Typography, Button, Stack } from '@mui/material'

export default function MyCard({ name, picture, id, onDelete }) {
  const handleDelete = async () => {
    const confirmDelete = confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบ "${name}" ?`)
    if (!confirmDelete) return

    try {
      const res = await fetch(`/api/insert/korean/${id}`, {
        method: 'DELETE',
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'เกิดข้อผิดพลาดขณะลบ')
      }

      alert('ลบสำเร็จ')
      if (onDelete) onDelete(id) // ลบจาก state ทันที
    } catch (error) {}
  }

  return (
    <Card sx={{ maxWidth: 250 }}>
      <CardMedia
        component="img"
        sx={{ width: '250px', height: '350px', objectFit: 'cover', display: 'block' }}
        image={picture}
        alt={name}
      />
      <CardContent sx={{ textAlign: 'left' }}>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" size="small" color="primary" href={`/admin/korean/update/${id}`}>
            Edit
          </Button>
          <Button variant="outlined" size="small" color="error" onClick={handleDelete} href={`/admin/korean`}>
            Delete
          </Button>
        </Stack>
      </CardContent>
    </Card>
  )
}
