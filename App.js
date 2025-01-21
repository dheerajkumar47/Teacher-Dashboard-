import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import TeacherInfo from "./src/Components/TeacherInfo";
import CourseList from "./src/Components/CourseList";
import SearchBar from "./src/Components/SearchBar";
import Header from "./src/Components/Header";

const App = () => {
  const [filteredTeacher, setFilteredTeacher] = useState({});
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <ScrollView style={styles.container}>
      <Header title="Teacher Dashboard" />
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setFilteredTeacher={setFilteredTeacher}
        setFilteredCourses={setFilteredCourses}
      />
      {filteredTeacher.name ? (
        <TeacherInfo teacher={filteredTeacher} />
      ) : (
        <Text style={styles.message}>No teacher found. Please search!</Text>
      )}
      <Text style={styles.sectionTitle}>Assigned Courses:</Text>
      {filteredCourses.length > 0 ? (
        <CourseList courses={filteredCourses} />
      ) : (
        <Text style={styles.message}>No courses assigned.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  message: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#999",
    textAlign: "center",
    marginVertical: 10,
  },
});

export default App;
