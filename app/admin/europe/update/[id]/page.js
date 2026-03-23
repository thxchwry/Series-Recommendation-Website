'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import {TextField, Button,Typography,Box, Stack} from '@mui/material'

export default function UpdateChinesePage() {
    const router = useRouter()
    const { id } = useParams()

    const [formData, setFormData] = useState({
        poster1: '',
        poster2: '',
        name: '',
        actor: '',
        actorpicture: '',
        actress: '',
        actresspicture: '',
        support1: '',
        supportpicture1: '',
        support2: '',
        supportpicture2: '',
        ep: '',
        application: '',
        detail: '',
    })

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/insert/europe/${id}`)
                if (!res.ok) throw new Error('Failed to fetch data')
                const result = await res.json()
                setFormData(result)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        if (id) {
            fetchData()
        }
    }, [id])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await fetch(`http://localhost:3000/api/insert/europe/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            if (!res.ok) {
                const errorData = await res.json()
                throw new Error(errorData.error || 'Failed to update')
            }

            alert('Updated successfully!')
            router.push('/admin/europe')
        } catch (err) {
            setError(err.message)
        }
    }

    if (loading) return <Typography>Loading...</Typography>
    if (error) return <Typography color="error">{error}</Typography>

    return (
        <Box maxWidth={600} mx="auto" mt={5}>
            <Typography variant="h5" mb={2}><center><h2>Edit TV Series</h2></center></Typography>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <TextField label="Poster1" name="poster1" value={formData.poster1} onChange={handleChange} />
                    <TextField label="Poster2" name="poster2" value={formData.poster2} onChange={handleChange} />
                    <TextField label="Name" name="name" value={formData.name} onChange={handleChange} />
                    <TextField label="Actor" name="actor" value={formData.actor} onChange={handleChange} />
                    <TextField label="Actor Picture" name="actorpicture" value={formData.actorpicture} onChange={handleChange} />
                    <TextField label="Actress" name="actress" value={formData.actress} onChange={handleChange} />
                    <TextField label="Actress Picture" name="actresspicture" value={formData.actresspicture} onChange={handleChange} />
                    <TextField label="Support1" name="support1" value={formData.support1} onChange={handleChange} />
                    <TextField label="Support Picture 1" name="supportpicture1" value={formData.supportpicture1} onChange={handleChange} />
                    <TextField label="Support2" name="support2" value={formData.support2} onChange={handleChange} />
                    <TextField label="Support Picture 2" name="supportpicture2" value={formData.supportpicture2} onChange={handleChange} />
                    <TextField label="EP" name="ep" value={formData.ep} onChange={handleChange} />
                    <TextField label="Application" name="application" value={formData.application} onChange={handleChange} />
                    <TextField
                        label="Detail"
                        name="detail"
                        multiline
                        rows={5}
                        value={formData.detail}
                        onChange={handleChange}
                    />

                    {error && <Typography color="error">{error}</Typography>}
                    <Button variant="contained" color="inherit" type="submit">
                        Update
                    </Button>
                </Stack>
            </form>
        </Box>
    )
}
