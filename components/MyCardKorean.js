// components/MyCard.js
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Link } from '@mui/material';

export default function MyCard({ name, picture, id }) {
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
        <Link href={`/attractions/korean/${id}`}>Read More</Link>
      </CardContent>
    </Card>
  );
}
