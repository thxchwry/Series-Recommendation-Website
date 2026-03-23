'use client';

import React, {useEffect, useState } from 'react';
import {
  Container,
  Grid,
  TextField,
  Breadcrumbs,Link,Button,
  Typography
} from '@mui/material';
import AdminCardChinese from '@/components/AdminCardChinese';
import AdminBar from '@/components/AdminBar';

export default function ChineseSeriesPage() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // ดึงข้อมูลจาก API เมื่อโหลดหน้า
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:3000/api/attractions/chinese');
      const result = await res.json();
      setData(result);
    };

    fetchData();
  }, []);

  // กรองข้อมูลตามชื่อเรื่องที่พิมพ์
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg">
    <AdminBar/><br></br>
    <Breadcrumbs>
        <Link color="inherit" href="/admin/main">Home</Link>
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
      
      
      <a href="/admin/chinese/insert">
        <Button color="inherit" variant="contained" sx={{ my: 2 , color: 'black'}}>Insert</Button>
      </a>

      <Grid container spacing={3}>
        {filteredData.length > 0 ? (
          filteredData.map((series) => (
            <Grid item xs={12} md={6} lg={4} key={series.id}>
              <AdminCardChinese
                name={series.name}
                picture={series.poster1}
                id={series.id}
              />
            </Grid>
          ))
        ) : (
          <Typography variant="body1" sx={{ mt: 2 ,}}>
            ไม่พบข้อมูลที่ค้นหา
          </Typography>
        )}
      </Grid>
    </Container>
  );
}
