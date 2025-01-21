import React, { useEffect } from "react";
import { TextInput, StyleSheet } from "react-native";

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  setFilteredTeacher,
  setFilteredCourses,
}) => {
  useEffect(() => {
    const fetchFilteredData = async () => {
      if (searchQuery.length > 0) {
        try {
          // Fetch teacher based on query
          const teacherResponse = await fetch(
            `http://localhost:3000/api/teacher?q=${searchQuery}`
          );
          const teacherData = await teacherResponse.json();

          console.log("Teacher Data:", teacherData);

          if (teacherData.length > 0) {
            // Select the first matching teacher
            const teacher = teacherData.find((t) =>
              t.name.toLowerCase().includes(searchQuery.toLowerCase())
            );

            if (teacher) {
              setFilteredTeacher(teacher);

              // Fetch courses assigned to the selected teacher
              const coursesResponse = await fetch(
                `http://localhost:3000/api/courses?teacherId=${teacher.id}`
              );
              const coursesData = await coursesResponse.json();

              console.log("Assigned Courses Data:", coursesData);
              setFilteredCourses(coursesData || []); // Set only the assigned courses
            } else {
              setFilteredTeacher({});
              setFilteredCourses([]);
            }
          } else {
            setFilteredTeacher({});
            setFilteredCourses([]);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        setFilteredTeacher({});
        setFilteredCourses([]);
      }
    };

    fetchFilteredData();
  }, [searchQuery]);

  return (
    <TextInput
      style={styles.input}
      placeholder="Search teacher by name..."
      value={searchQuery}
      onChangeText={setSearchQuery}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
});

export default SearchBar;
