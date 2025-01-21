import React from "react";
import { FlatList, Text, StyleSheet } from "react-native";

const CourseList = ({ courses }) => (
  <FlatList
    data={courses}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => <Text style={styles.course}>{item.name}</Text>}
  />
);

const styles = StyleSheet.create({
  course: { fontSize: 16, padding: 5 }
});

export default CourseList;
