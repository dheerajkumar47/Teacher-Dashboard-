import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TeacherInfo = ({ teacher, isDarkMode }) => (
  <View style={styles.container}>
    <Text
      style={[
        styles.text,
        { color: isDarkMode ? "#FFFFFF" : "#000000" }, // Text color
      ]}
    >
      Name:{" "}
      {teacher["First name"] && teacher["Last name"]
        ? `${teacher["First name"]} ${teacher["Last name"]}`
        : "N/A"}
    </Text>
    <Text
      style={[
        styles.text,
        { color: isDarkMode ? "#FFFFFF" : "#000000" }, // Text color
      ]}
    >
      ID: {teacher.id || "N/A"}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 10 },
  text: { fontSize: 18 },
});

export default TeacherInfo;
