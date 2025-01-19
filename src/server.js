const express = require("express");
const cors = require("cors");  // Importing the cors package
const app = express();
const PORT = 3000; // Port number
const data = require("./Data.json"); // Importing your mock data

// Enable CORS for all origins
app.use(cors());

// Middleware to handle JSON requests
app.use(express.json());

// RESTful Endpoint: Get Teacher Info
app.get("/api/teacher", (req, res) => {
  res.json(data.teacher); // Sending teacher info from Data.json
});

// RESTful Endpoint: Get All Courses
app.get("/api/courses", (req, res) => {
  res.json(data.courses); // Sending all courses from Data.json
});

// RESTful Endpoint: Search Course by Name or Code (Query Param)
app.get("/api/courses/search", (req, res) => {
  const searchQuery = req.query.q?.toLowerCase(); // Get 'q' query param
  if (!searchQuery) {
    return res.status(400).json({ error: "Search query is required" });
  }

  const filteredCourses = data.courses.filter((course) =>
    course.name.toLowerCase().includes(searchQuery) || course.id.toLowerCase().includes(searchQuery)
  );

  if (filteredCourses.length === 0) {
    return res.status(404).json({ message: "No courses found" });
  }

  res.json(filteredCourses); // Send filtered courses
});


// RESTful Endpoint: Get Course by ID
app.get("/api/courses/:id", (req, res) => {
  const courseId = req.params.id; // Get course ID from URL param
  const course = data.courses.find((course) => course.id === courseId);

  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  res.json(course); // Send specific course data
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
