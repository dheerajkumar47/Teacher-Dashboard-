import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import TeacherInfo from "./src/Components/TeacherInfo";
import CourseList from "./src/Components/CourseList";
import SearchBar from "./src/Components/SearchBar";

const App = () => {
  const [teacher, setTeacher] = useState({});
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch initial teacher and course data
  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const teacherResponse = await fetch("http://localhost:3000/api/teacher");
        const teacherData = await teacherResponse.json();
        setTeacher(teacherData);

        const coursesResponse = await fetch("http://localhost:3000/api/courses");
        const coursesData = await coursesResponse.json();
        setCourses(coursesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchTeacherData();
  }, []);

  // Filtered courses based on searchQuery
  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TeacherInfo teacher={teacher} />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} setCourses={setCourses} />
      <CourseList courses={filteredCourses} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
});

export default App;
