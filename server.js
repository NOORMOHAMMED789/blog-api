const express = require("express");
const app = express();
const cors = require("cors");
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("./src/controllers/blogController");

const pool = require("./src/database/db");

// CORS Options
// const corsOptions = {
//   origin: ["http://localhost:3001", "https://blog-content-platform.vercel.app"],
//   optionsSuccessStatus: 200,
// };

// app.use(cors(corsOptions));

// Routes
app.post("/create-blog", createBlog);
app.get("/get-all-blogs", getAllBlogs);
app.get("/get-blog/:id", getBlogById);
app.put("/update-blog/:id", updateBlog);
app.delete("/delete-blog/:id", deleteBlog);

app.listen(5001, () => {
  console.log(`Port is listening at 5001`);
});

app.get("/test", (req, res) => {
  res.send("API is working!");
});
