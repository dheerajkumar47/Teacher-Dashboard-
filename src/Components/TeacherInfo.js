import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TeacherInfo = ({ teacher }) => (
  <View style={styles.container}>
    <Text style={styles.text}>Name: {teacher.name || "N/A"}</Text>
    <Text style={styles.text}>ID: {teacher.id || "N/A"}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 10 },
  text: { fontSize: 18 }
});

export default TeacherInfo;
