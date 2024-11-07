import React, { useState } from "react";
import { Text, View, StyleSheet, Pressable, ScrollView, TouchableOpacity, Modal } from "react-native";
import { useRouter } from "expo-router"; // For navigation
import { Ionicons } from "@expo/vector-icons"; // For iconography

export default function Index() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const router = useRouter();

  const toggleSidebar = () => setSidebarVisible(!sidebarVisible);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to Fursa!</Text>
      <Text style={styles.subheader}>Your gateway to job opportunities in Mombasa.</Text>
      
      {/* Main Content */}
      <Pressable 
        style={styles.button} 
        onPress={() => router.push("/job-listings")}
      >
        <Text style={styles.buttonText}>Explore Job Listings</Text>
      </Pressable>

      {/* Sidebar */}
      {sidebarVisible && (
        <View style={styles.sidebar}>
          <TouchableOpacity onPress={toggleSidebar} style={styles.closeButton}>
            <Ionicons name="close" size={30} color="black" />
          </TouchableOpacity>

          <ScrollView contentContainerStyle={styles.sidebarContent}>
            {/* Avatar Button for Signup */}
            <Pressable
              style={styles.avatarButton}
              onPress={() => router.push("/signup")}
            >
              <Ionicons name="person-add" size={40} color="white" />
            </Pressable>

            <Text style={styles.sidebarItem} onPress={() => router.push("/about-us")}>About Us</Text>
            <Text style={styles.sidebarItem} onPress={() => router.push("/contact-us")}>Contact Us</Text>

            {/* Information when sidebar is closed */}
            {!sidebarVisible && (
              <View style={styles.info}>
                <Text style={styles.infoText}>Fursa is your gateway to job opportunities in Mombasa. Find your dream job today!</Text>
              </View>
            )}
          </ScrollView>
        </View>
      )}

      {/* Sidebar Toggle Button */}
      <Pressable onPress={toggleSidebar} style={styles.sidebarToggleButton}>
        <Ionicons name="menu" size={30} color="white" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subheader: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  sidebarToggleButton: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 50,
  },
  sidebar: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "70%",
    height: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 5,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 1,
  },
  sidebarContent: {
    marginTop: 40,
    paddingTop: 30,
  },
  avatarButton: {
    backgroundColor: "#28A745",
    padding: 20,
    borderRadius: 50,
    marginBottom: 20,
    alignSelf: "center",
  },
  sidebarItem: {
    fontSize: 18,
    color: "#007BFF",
    marginVertical: 10,
    textAlign: "center",
  },
  info: {
    marginTop: 30,
    padding: 10,
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  infoText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
});
