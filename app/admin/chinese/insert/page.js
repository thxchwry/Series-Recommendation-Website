'use client'
import React, { useState, useEffect } from 'react'
import {TextField,Button,Typography,Box,Stack} from '@mui/material'
import { useRouter } from 'next/navigation'

export default function Page() {
    const router = useRouter()

    const [formData, setFormData] = useState({
      poster1: '',
      poster2: '',
      name: '',
      actor: '',
      actorpicture: '',
      actress: '',
      actresspicture: '',
      support1: '',
      supportpicture1 : '',
      support2: '',
      supportpicture2: '',
      ep: '',
      application: '',
      detail: '',
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
            const res = await fetch(`http://localhost:3000/api/insert/chinese`, {
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

            alert('Series added successfully')
            router.push('/admin/chinese')
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Box maxWidth={600} mx="auto" mt={5}>
            <Typography variant="h5" mb={2}><center><h2>Create New Chinese Series</h2></center></Typography>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                <TextField
                        label="Poster1"
                        name="poster1"
                        value={formData.poster1}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Poster2"
                        name="poster2"
                        value={formData.poster2}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Actor"
                        name="actor"
                        value={formData.actor}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Actorpicture"
                        name="actorpicture"
                        value={formData.actorpicture}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Actress"
                        name="actress"
                        value={formData.actress}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Actresspicture"
                        name="actresspicture"
                        value={formData.actresspicture}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Support1"
                        name="support1"
                        value={formData.support1}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Supportpicture1"
                        name="supportpicture1"
                        value={formData.supportpicture1}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Support2"
                        name="support2"
                        value={formData.support2}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Supportpicture2"
                        name="supportpicture2"
                        value={formData.supportpicture2}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="EP"
                        name="ep"
                        value={formData.ep}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Application"
                        name="application"
                        value={formData.application}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Detail"
                        name="detail"
                        multiline
                        rows={6}
                        value={formData.detail}
                        onChange={handleChange}
                        required
                    />
                    
                    {error && <Typography color="error">{error}</Typography>}
                    <Button variant="contained" color="inherit" type="submit" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit'}
                    </Button>
                </Stack>
            </form>
        </Box>
    )
}
