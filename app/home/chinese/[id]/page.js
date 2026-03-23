'use client'
import React, { useEffect, useState } from "react";
import { Breadcrumbs, Link, Typography, TextField, Button, Box } from "@mui/material";
import { useParams } from "next/navigation";
import MyBar from "@/components/MyBar";

// ดึงข้อมูล
const getData = async (id) => {
  const res = await fetch(`http://localhost:3000/api/attractions/chinese/${id}`);
  if (!res.ok) throw new Error("No Loading");
  return res.json();
};

export default function Page() {
  const params = useParams();
  const id = params?.id;
  const [serieskorean, setSerieskorean] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const data = await getData(id);
        setSerieskorean(data);

        if (data.name) {
          await fetchComments(data.name);
        }

        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser?.username) {
            setUsername(parsedUser.username);
          }
        }
      } catch (err) {
        console.error("โหลดข้อมูลล้มเหลว:", err);
      }
    };

    fetchData();
  }, [id]);

  const fetchComments = async (name) => {
    try {
      const commentRes = await fetch(
        `http://localhost:3000/api/comment?nameseries=${encodeURIComponent(name)}`
      );
      if (!commentRes.ok) throw new Error("โหลดความคิดเห็นไม่สำเร็จ");
      const commentData = await commentRes.json();
      setComments(commentData);
    } catch (err) {
      console.error("โหลดความคิดเห็นล้มเหลว:", err);
    }
  };

  const handleCommentSubmit = async () => {
    if (newComment.trim() === "" || !serieskorean.name || !username) return;

    try {
      const res = await fetch("http://localhost:3000/api/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          nameseries: serieskorean.name,
          comment: newComment,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("เกิดข้อผิดพลาด:", errorData.error);
        return;
      }

      await fetchComments(serieskorean.name);
      setNewComment("");
    } catch (err) {
      console.error("ส่งความคิดเห็นไม่สำเร็จ:", err);
    }
  };

  return (
    <div>
      <MyBar />
      <br />

      <Breadcrumbs>
        <Link color="inherit" href="/home">Home</Link>
        <Link color="inherit" href="/home/chinese">Chinese Series</Link>
        <Typography color="textPrimary">{serieskorean.name}</Typography>
      </Breadcrumbs>

      <h1>{serieskorean.name}</h1>

      {serieskorean.poster2 && (
        <div style={{ textAlign: "center" }}>
          <img
            src={serieskorean.poster2}
            alt="Series Cover"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      )}

      <h2>เรื่องย่อ</h2>
      <p style={{ fontWeight: "normal", textIndent: "20px" }}>{serieskorean.detail}</p>

      <h3>{serieskorean.ep} Episode</h3>
      <h3>Application: {serieskorean.application}</h3>

      <h2>นักแสดง</h2>
      <div style={{ display: "flex", gap: "50px", alignItems: "center", flexWrap: "wrap" }}>
        {[
          { img: serieskorean.actorpicture, name: serieskorean.actor },
          { img: serieskorean.actresspicture, name: serieskorean.actress },
          { img: serieskorean.supportpicture1, name: serieskorean.support1 },
          { img: serieskorean.supportpicture2, name: serieskorean.support2 },
        ]
          .filter(p => p.img && p.name)
          .map((person, idx) => (
            <div key={idx} style={{ textAlign: "center" }}>
              <img
                src={person.img}
                alt={person.name}
                style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover" }}
              />
              <p>{person.name}</p>
            </div>
          ))}
      </div>

      <br />
      <h2>ความคิดเห็น</h2>

      <Box sx={{ maxWidth: 500 }}>
        <TextField
          fullWidth
          multiline
          rows={3}
          label="แสดงความคิดเห็น"
          variant="outlined"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button
          variant="contained"
          color="inherit"
          sx={{ mt: 2 }}
          onClick={handleCommentSubmit}
          disabled={!username}
        >
          Comment
        </Button>
      </Box>

      <Box sx={{ mt: 4 }}>
        {comments.length === 0 ? (
          <Typography>No Comment</Typography>
        ) : (
          comments.map((comment, idx) => (
            <Box key={idx} sx={{ mb: 2, p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
              <Typography><strong>{comment.username}</strong>: {comment.comment}</Typography>
            </Box>
          ))
        )}
      </Box>
    </div>
  );
}
