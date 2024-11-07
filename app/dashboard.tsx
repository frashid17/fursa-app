import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { useRouter } from "expo-router"; // For navigation
import { Ionicons } from "@expo/vector-icons"; // For iconography

export default function Dashboard() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to Your Dashboard</Text>
      
      {/* User Profile Section */}
      <View style={styles.profileSection}>
        <Image source={{ uri: "https://shorturl.at/CuRCc" }} style={styles.profileImage} />
        <Text style={styles.profileName}>User Name</Text>
        <Text style={styles.profileEmail}>user@example.com</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Button to navigate to user profile */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/profile")}
        >
          <Ionicons name="person" size={24} color="white" />
          <Text style={styles.buttonText}>View Profile</Text>
        </TouchableOpacity>

        {/* Button to add CV (consider adding an alternative way if needed) */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/upload-cv")}
        >
          <Ionicons name="document" size={24} color="white" />
          <Text style={styles.buttonText}>Upload CV</Text>
        </TouchableOpacity>

        {/* Button to view job listings */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/job-listings")}
        >
          <Ionicons name="briefcase" size={24} color="white" />
          <Text style={styles.buttonText}>View Job Listings</Text>
        </TouchableOpacity>

        {/* Other Actions */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/settings")}
        >
          <Ionicons name="settings" size={24} color="white" />
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F5F5F5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  profileEmail: {
    fontSize: 14,
    color: "#555",
  },
  scrollContent: {
    paddingBottom: 20,
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    marginVertical: 10,
    width: "90%",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
