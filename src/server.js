const express = require("express");
const cors = require("cors"); // Importing the cors package
const app = express();
const PORT = 3000; // Port number
const data = require("./Data.json"); // Importing your mock data

// Enable CORS for all origins
app.use(cors());

// Middleware to handle JSON requests
app.use(express.json());

// RESTful Endpoint: Get Teacher Info (with optional search query)
app.get("/api/teacher", (req, res) => {
  const searchQuery = req.query.q?.toLowerCase(); // Get 'q' query param
  if (searchQuery) {
    const filteredTeachers = data.teacher.filter((teacher) => {
      const firstName = teacher["First name"]; // Access "First name"
      if (firstName) {
        return firstName.toLowerCase().startsWith(searchQuery); // Match starting letters
      }
      return false;
    });

    if (filteredTeachers.length === 0) {
      return res.status(404).json({ message: "No teacher found" });
    }

    return res.json(filteredTeachers); // Send filtered teacher(s)
  }

  res.json(data.teacher); // Return all teachers if no query is provided
});

// RESTful Endpoint: Get Courses Assigned to a Teacher
app.get("/api/courses", (req, res) => {
  const teacherId = req.query.teacherId; // Get 'teacherId' query param
  if (teacherId) {
    const filteredCourses = data.courses.filter(
      (course) => course.teacherId === teacherId
    );
    if (filteredCourses.length === 0) {
      return res
        .status(404)
        .json({ message: "No courses found for this teacher" });
    }
    return res.json(filteredCourses); // Send courses assigned to the teacher
  }
  return res.status(400).json({ message: "Teacher ID is required" });
});

// RESTful Endpoint: Search Course by Name or Code (Query Param)
app.get("/api/courses/search", (req, res) => {
  const searchQuery = req.query.q?.toLowerCase(); // Get 'q' query param
  if (!searchQuery) {
    return res.status(400).json({ error: "Search query is required" });
  }

  const filteredCourses = data.courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchQuery) ||
      course.id.toLowerCase().includes(searchQuery)
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
