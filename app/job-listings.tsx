// /app/job-listings.tsx
import { Text, View, StyleSheet } from "react-native";

export default function JobListings() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Job Listings</Text>
      {/* Add your job listings content here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
