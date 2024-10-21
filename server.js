const express = require('express')
const app = express()
const cors = require('cors')

const pool = require('./src/database/db')

//middle to use
app.use(cors())
app.use(express.json())

//! ROUTES

//! create a todo
app.post("/create-blog", async (req, res) => {
  try {
    console.log(req.body); 
    const { feature_image, main_content, blog_excerpt, category } = req.body
    const newBlog = await pool.query(
      "INSERT INTO blog (feature_image, main_content, blog_excerpt, category) VALUES ($1, $2, $3, $4) RETURNING *",
      [feature_image, main_content, blog_excerpt, category]
    );
    res.json(newBlog.rows[0])
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/get-all-blogs", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM blog"); 
    res.json(allTodos.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


//! GET single blog Id.
app.get("/get-blog/:id", async (req, res) => {
  try {
    const { id } = req.params
    const blog = await pool.query("SELECT * FROM blog WHERE blog_id = $1",[id])
    res.json(blog.rows[0])
  } catch (error) {
    console.error(error.message)
  }
})
//! update a todo

app.put("/update-blog/:id", async (req, res) => {
  const { id } = req.params; // This is the blog_id
  const { feature_image, main_content, blog_excerpt, category } = req.body;

  try {
    // Update query using blog_id as the identifier
    const query = `
      UPDATE blog
      SET 
        feature_image = $1, 
        main_content = $2, 
        blog_excerpt = $3, 
        category = $4
      WHERE blog_id = $5  -- Use blog_id instead of id
      RETURNING *;
    `;

    const values = [feature_image, main_content, blog_excerpt, category, id];

    // Execute the update query
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Blog not found" });
    }

    // Send the updated blog data
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



//! delete a todo
app.delete("/delete-blog/:id", async (req, res) => {
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
});


app.listen(5001, () => {
  console.log(`Port is listening at 5001`)
})