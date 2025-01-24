import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Switch,
} from "react-native";
import TeacherInfo from "./src/Components/TeacherInfo";
import CourseList from "./src/Components/CourseList";
import SearchBar from "./src/Components/SearchBar";
import Header from "./src/Components/Header";

const App = () => {
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleTeacherSelect = async (teacher) => {
    setSelectedTeacher(teacher);
    try {
      const coursesResponse = await fetch(
        `http://localhost:3000/api/courses?teacherId=${teacher.id}`
      );
      const coursesData = await coursesResponse.json();
      setFilteredCourses(coursesData || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setFilteredCourses([]);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const themeStyles = isDarkMode ? styles.dark : styles.light;

  return (
    <ScrollView style={[styles.container, themeStyles]}>
      <Header title="Teacher Dashboard" />
      <View style={styles.toggleContainer}>
        <Text style={[styles.toggleText, { color: themeStyles.color }]}>
          Light/Dark Mode
        </Text>
        <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
      </View>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setFilteredTeachers={setFilteredTeachers}
        isDarkMode={isDarkMode}
      />
      {filteredTeachers.length > 0 ? (
        <View>
          {filteredTeachers.map((teacher) => (
            <TouchableOpacity
              key={teacher.id}
              onPress={() => handleTeacherSelect(teacher)}
              style={[styles.teacherItem, themeStyles]}
            >
              <Text style={[styles.teacherName, { color: themeStyles.color }]}>
                {teacher["First name"]} {teacher["Last name"]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <Text style={[styles.message, { color: themeStyles.color }]}>
          No teachers found. Please search!
        </Text>
      )}
      {selectedTeacher && (
        <TeacherInfo teacher={selectedTeacher} isDarkMode={isDarkMode} />
      )}
      <Text style={[styles.sectionTitle, { color: themeStyles.color }]}>
        Assigned Courses:
      </Text>
      {filteredCourses.length > 0 ? (
        <CourseList courses={filteredCourses} isDarkMode={isDarkMode} />
      ) : (
        <Text style={[styles.message, { color: themeStyles.color }]}>
          No courses assigned.
        </Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  toggleText: {
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  teacherName: {
    fontSize: 16,
    padding: 10,
  },
  teacherItem: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  message: {
    fontSize: 16,
    fontStyle: "italic",
    textAlign: "center",
    marginVertical: 10,
  },
  // Light Mode Styles
  light: {
    backgroundColor: "#FFFFFF",
    color: "#000000",
    borderColor: "#CCC",
    borderWidth: 1,
  },
  // Dark Mode Styles
  dark: {
    backgroundColor: "#1E1E1E",
    color: "#FFFFFF",
    borderColor: "#444",
    borderWidth: 1,
  },
});

export default App;
