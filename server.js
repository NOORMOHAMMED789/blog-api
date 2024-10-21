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
const corsOptions = {
  origin: "https://blog-content-platform.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"], 
  allowedHeaders: ["Content-Type"]
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.post("/create-blog", createBlog);
app.get("/get-all-blogs", getAllBlogs);
app.get("/get-blog/:id", getBlogById);
app.put("/update-blog/:id", updateBlog);
app.delete("/delete-blog/:id", deleteBlog);

app.listen(5001, () => {
  console.log(`Port is listening at 5001`);
});
