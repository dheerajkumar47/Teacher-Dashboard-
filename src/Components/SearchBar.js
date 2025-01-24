import React, { useEffect } from "react";
import { TextInput, StyleSheet } from "react-native";

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  setFilteredTeachers,
  isDarkMode,
}) => {
  useEffect(() => {
    const fetchFilteredData = async () => {
      if (searchQuery.length > 0) {
        try {
          const teacherResponse = await fetch(
            `http://localhost:3000/api/teacher?q=${searchQuery}`
          );
          const teacherData = await teacherResponse.json();
          setFilteredTeachers(teacherData || []);
        } catch (error) {
          console.error("Error fetching data:", error);
          setFilteredTeachers([]);
        }
      } else {
        setFilteredTeachers([]);
      }
    };

    fetchFilteredData();
  }, [searchQuery]);

  return (
    <TextInput
      style={[
        styles.input,
        {
          backgroundColor: isDarkMode ? "#1E1E1E" : "#FFFFFF",
          color: isDarkMode ? "#FFFFFF" : "#000000", // Input text color
          borderColor: isDarkMode ? "#444" : "#CCC", // Border color
        },
      ]}
      placeholder="Search teacher by name..."
      placeholderTextColor={isDarkMode ? "#CCCCCC" : "#888888"} // Placeholder color
      value={searchQuery}
      onChangeText={setSearchQuery}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
  },
});

export default SearchBar;
