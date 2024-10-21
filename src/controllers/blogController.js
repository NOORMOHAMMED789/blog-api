// src/controllers/blogController.js

const pool = require("../database/db");

// Create a blog
const createBlog = async (req, res) => {
  try {
    const { feature_image, main_content, blog_excerpt, category } = req.body;

    if (!main_content) {
      return res.status(400).json({ error: "Content is required." });
    }

    const newBlog = await pool.query(
      "INSERT INTO blog (feature_image, main_content, blog_excerpt, category) VALUES ($1, $2, $3, $4) RETURNING *",
      [feature_image, main_content, blog_excerpt, category]
    );

    res.status(201).json(newBlog.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

// Get all blogs
async function getAllBlogs(req, res) {
  try {
    const blogs = await pool.query("SELECT * FROM blogs"); // Adjust your query accordingly
    res.status(200).json(blogs.rows);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}


// Get a single blog by ID
const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await pool.query("SELECT * FROM blog WHERE blog_id = $1", [
      id,
    ]);

    if (blog.rows.length === 0) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.json(blog.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a blog
const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { feature_image, main_content, blog_excerpt, category } = req.body;

  try {
    const query = `
      UPDATE blog
      SET 
        feature_image = $1, 
        main_content = $2, 
        blog_excerpt = $3, 
        category = $4
      WHERE blog_id = $5
      RETURNING *;
    `;

    const values = [feature_image, main_content, blog_excerpt, category, id];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a blog
const deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const query = `
      DELETE FROM blog
      WHERE blog_id = $1
      RETURNING *;
    `;

    const values = [id];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.json({
      message: "Blog deleted successfully",
      deletedBlog: result.rows[0],
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
