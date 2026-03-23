'use client';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';

export default function AdminBar() {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [userData, setUserData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  const handleLogout = () => {
    localStorage.removeItem('user'); // ลบข้อมูลผู้ใช้จาก localStorage
    localStorage.removeItem('token'); // ลบ token จาก localStorage
    setUserData(null);
    router.push('/admin'); // นำทางกลับไปที่หน้า login
  };

  React.useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      const token = localStorage.getItem('token'); // ดึง token จาก localStorage
      if (!token) {
        router.push('/admin'); // หากไม่มี token ให้ไปหน้า login
        return;
      }

      try {
        // ดึงข้อมูลผู้ใช้จาก API
        const response = await fetch('http://localhost:3000/api/admin/register', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}` // ส่ง token ใน header
          }
        });

        const data = await response.json();

        if (response.ok) {
          const currentUser = JSON.parse(localStorage.getItem('user'));
          const foundUser = data.find((user) => user.username === currentUser.username);

          setUserData(foundUser); // ตั้งค่าผู้ใช้ที่ได้จาก API
        } else {
          console.error('Failed to fetch user data:', data);
          router.push('/admin'); // หากเกิดข้อผิดพลาด ให้กลับไปหน้า login
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        router.push('/admin');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData(); // เรียกฟังก์ชันดึงข้อมูลผู้ใช้
  }, [router]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#212121' }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontFamily: 'Roboto, sans-serif' }}
          >
            IN3VERT
          </Typography>

          <IconButton
            onClick={toggleDrawer(true)}
            sx={{ ml: 2 }}
            color="inherit"
          >
            <PersonOutlinedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer ด้านขวา */}
      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 300, padding: 2 }}
          role="presentation"
          onClick={(e) => e.stopPropagation()}
        >
          <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
            Profile
          </Typography>

          <Divider sx={{ mb: 2 }} />
          {isLoading ? (
            <CircularProgress />
          ) : userData ? (
            <>
              <Typography variant="body1">
                <strong>Username :</strong> {userData.username}
              </Typography>
              <Typography variant="body1">
                <strong>Name :</strong> {userData.fname} {userData.lname}
              </Typography>
              <Typography variant="body1">
                <strong>Email :</strong> {userData.email}
              </Typography>
              <Typography variant="body1">
                <strong>Phone :</strong> {userData.phone}
              </Typography>

              <Button
                variant="outlined"
                color="error"
                fullWidth
                sx={{ mt: 2 }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <Typography variant="body1">ไม่พบข้อมูลผู้ใช้</Typography>
          )}
        </Box>
      </Drawer>
    </Box>
  );
}
