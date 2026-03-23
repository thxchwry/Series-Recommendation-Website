'use client'
import React, { useState, useEffect } from 'react'
import {TextField,Button,Typography,Box,Stack,Paper,Link} from '@mui/material'
import { useRouter } from 'next/navigation'

export default function AdminRegisterPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    username: '',
    email: '',
    phone: '',
    password: '',
  })

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    console.log('Form Data:', formData)
  }, [formData])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const res = await fetch(`http://localhost:3000/api/admin/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const contentType = res.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        const text = await res.text()
        throw new Error('Expected JSON, got: ' + text.slice(0, 100))
      }

      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.error || 'Register failed')
      }

      alert('Register success!')
      router.push('/admin')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to bottom right,rgb(243, 217, 225))',
        px: 2,
      }}
    >
        
      <Paper elevation={4} sx={{ p: 4, maxWidth: 600, width: '100%' }}>
      
        <Typography variant="h4" fontWeight="bold" textAlign="center" mb={3}>
          Register
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="First Name"
              name="fname"
              value={formData.fname}
              onChange={handleChange}
              required
            />
            <TextField
              label="Last Name"
              name="lname"
              value={formData.lname}
              onChange={handleChange}
              required
            />
            <TextField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {error && <Typography color="error">{error}</Typography>}
            <Button
              variant="contained"
              color="inherit"
              type="submit"
              disabled={loading}
              sx={{
                py: 1.5,
                fontWeight: 'bold',
                textTransform: 'none',
                fontSize: '16px',
              }}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </Button>
            <Typography variant="body2" textAlign="center" mt={1} >
            Already have an account?<br></br>
                <Link href="/admin/main" underline="hover">
                Home
                </Link>
            </Typography>
          </Stack>
        </form>
      </Paper>
    </Box>
    
  )
}
