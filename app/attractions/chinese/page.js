'use client';

import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  TextField,Breadcrumbs,Link,
  Typography
} from '@mui/material';
import MyCard from '@/components/MyCard';
import Navbar from '@/components/Navbar';

export default function KoreanSeriesPage() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // ดึงข้อมูล
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:3000/api/attractions/chinese');
      const result = await res.json();
      setData(result);
    };

    fetchData();
  }, []);

  // กรองข้อมูล
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
   
    <Container maxWidth="lg">
      <Navbar/><br></br>
      <Breadcrumbs>
        <Link color="inherit" href="/">Home</Link>
        <Typography color="textPrimary">Chinese Series</Typography>
      </Breadcrumbs><br></br>
      <Typography variant="h4" gutterBottom>Chinese Series</Typography>

      {/* ช่องค้นหา */}
      <TextField
        label="Search Series"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Grid container spacing={3}>
        {filteredData.length > 0 ? (
          filteredData.map((series) => (
            <Grid item xs={12} md={6} lg={4} key={series.id}>
              <MyCard
                name={series.name}
                picture={series.poster1}
                id={series.id}
              />
            </Grid>
          ))
        ) : (
          <Typography variant="body1" sx={{ mt: 2 }}>
            ไม่พบข้อมูลที่ค้นหา
          </Typography>
        )}
      </Grid>
    </Container>
  );
}
