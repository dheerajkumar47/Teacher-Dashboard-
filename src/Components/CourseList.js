import React from "react";
import { FlatList, Text, StyleSheet } from "react-native";

const CourseList = ({ courses, isDarkMode }) => (
  <FlatList
    data={courses}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
      <Text
        style={[
          styles.course,
          { color: isDarkMode ? "#FFFFFF" : "#000000" }, // Dynamic text color
        ]}
      >
        {item.name}
      </Text>
    )}
  />
);

const styles = StyleSheet.create({
  course: {
    fontSize: 16,
    padding: 5,
  },
});

export default CourseList;
