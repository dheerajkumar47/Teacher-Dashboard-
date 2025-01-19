import React, { useEffect } from "react";
import { TextInput, StyleSheet } from "react-native";

const SearchBar = ({ searchQuery, setSearchQuery, setCourses }) => {

  useEffect(() => {
    const fetchCourses = async () => {
      if (searchQuery.length > 0) {
        try {
          const response = await fetch(`http://localhost:3000/api/courses/search?q=${searchQuery}`);
          const data = await response.json();
          console.log(data); // Debugging

          if (data.message) {
            // No courses found
            setCourses([]); // Clear courses if no results
          } else {
            setCourses(data); // Update courses state with filtered data
          }
        } catch (error) {
          console.error("Error fetching filtered courses:", error);
        }
      }
    };

    fetchCourses();
  }, [searchQuery, setCourses]); // Trigger API call on search query change

  return (
    <TextInput
      style={styles.input}
      placeholder="Search courses..."
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
    margin: 10
  }
});

export default SearchBar;