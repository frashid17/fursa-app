import React, { useState } from "react";
import { Text, View, StyleSheet, Pressable, ScrollView, TouchableOpacity, Animated, TouchableWithoutFeedback } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Index() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const sidebarAnim = useState(new Animated.Value(-300))[0];
  const router = useRouter();

  const toggleSidebar = () => {
    if (sidebarVisible) {
      Animated.timing(sidebarAnim, {
        toValue: -300,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setSidebarVisible(false));
    } else {
      setSidebarVisible(true);
      Animated.timing(sidebarAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const closeSidebar = () => {
    Animated.timing(sidebarAnim, {
      toValue: -300,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setSidebarVisible(false));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to <Text style={styles.brand}>Fursa</Text>!</Text>
      <Text style={styles.subheader}>Your gateway to job opportunities in Mombasa.</Text>

      <Pressable style={styles.button} onPress={() => router.push("/job-listings")}>
        <Text style={styles.buttonText}>Explore Job Listings</Text>
      </Pressable>

      {sidebarVisible && (
        <TouchableWithoutFeedback onPress={closeSidebar}>
          <Animated.View style={[styles.sidebar, { left: sidebarAnim }]}>
            <TouchableOpacity onPress={closeSidebar} style={styles.closeButton}>
              <Ionicons name="close" size={30} color="white" />
            </TouchableOpacity>
            <ScrollView contentContainerStyle={styles.sidebarContent}>
              <Pressable style={styles.avatarButton} onPress={() => router.push("/signup")}>
                <Ionicons name="person-add" size={40} color="white" />
              </Pressable>
              <Text style={styles.sidebarItem} onPress={() => router.push("/about-us")}>About Us</Text>
              <Text style={styles.sidebarItem} onPress={() => router.push("/contact-us")}>Contact Us</Text>
            </ScrollView>
          </Animated.View>
        </TouchableWithoutFeedback>
      )}

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
    backgroundColor: "#E0ECF8",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  brand: {
    color: "#007BFF",
  },
  subheader: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  sidebarToggleButton: {
    position: "absolute",
    top: 60,  // Adjusted the position to move it further down
    left: 20,
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  sidebar: {
    position: "absolute",
    top: 60,  // Adjusted position
    left: -300,
    width: "70%",
    height: "100%",
    backgroundColor: "#333",
    padding: 20,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 10, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
    zIndex: 10,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    left: 20,  // Close button positioned to the left
    zIndex: 1,
  },
  sidebarContent: {
    marginTop: 80,
    paddingTop: 10,
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
    color: "#FFD700",
    marginVertical: 15,
    textAlign: "center",
  },
});
