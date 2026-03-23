
'use client'
import React from 'react'
import MyBar from '@/components/MyBar';

export default function page() {
  return (
    <div>
    <MyBar/>
    <center>
    <img className = "imgCard" src="4.png"  
    style={{ maxWidth: "100%", height: "auto", objectFit: 'cover' }}/>
    </center>
    <center><h1>Welcome To In3vert Website</h1></center>
    <center><h2>Home</h2></center>
    <center>
    <img className = "imgCard" src="1.png"  
    style={{ maxWidth: "100%", height: "auto", objectFit: 'cover' }}/>
    <a href="/home/chinese" style={{color:"black", fontFamily: 'Times New Roman, Times, serif'}}><h1>Chinese Series</h1></a>
    </center>
    <br></br>
    <center>
    <img className = "imgCard" src="2.png"  
    style={{maxWidth: "100%", height: "auto", objectFit: 'cover' }}/>
    <a href="/home/korean" style={{color:"black", fontFamily: 'Times New Roman, Times, serif'}}><h1>Korean Series</h1></a>
    </center>
    <br></br>
    <center>
    <img className = "imgCard" src="3.png"  
    style={{ maxWidth: "100%", height: "auto", objectFit: 'cover' }}/>
    <a href="/home/europe" style={{color:"black", fontFamily: 'Times New Roman, Times, serif'}}><h1>TV Series</h1></a>
    </center>
    

      </div>
  )
}

