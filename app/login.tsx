import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router"; // Import useRouter for navigation
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage for storing tokens
import { API_URL } from "../config";
import { Ionicons } from "@expo/vector-icons"; // Import icons

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Initialize the router

  // Handle the login submission
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Error", data.error || "Something went wrong.");
        setLoading(false);
        return;
      }

      if (data.access_token) {
        // Store tokens in AsyncStorage
        await AsyncStorage.setItem("access_token", data.access_token);
        await AsyncStorage.setItem("refresh_token", data.refresh_token); // Store refresh token if needed

        setLoading(false);
        Alert.alert("Success", "Logged in successfully!");

        // Add a slight delay before navigating to ensure async storage operations complete
        setTimeout(() => {
          router.push("/dashboard");
        }, 100);
      } else {
        Alert.alert("Error", "Invalid credentials.");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("Login error:", error);
      Alert.alert("Error", "An error occurred during login. Please try again later.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>

      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={20} color="#6c757d" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Phone number, username, or email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholderTextColor="#B0B0B0"
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="#6c757d" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#B0B0B0"
        />
      </View>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.loginButtonText}>Log In</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot password?</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/signup")}>
          <Text style={styles.signupLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f0f4f8", // Light background
    backgroundImage: "linear-gradient(to bottom right, #4e73df, #1cc88a)", // Vibrant gradient
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff", // White text for header
    marginBottom: 40,
    textAlign: "center",
    paddingHorizontal: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    paddingLeft: 15,
    paddingVertical: 5,
    shadowColor: "#bbb", // Light shadow for depth
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    width: "90%",
    padding: 15,
    fontSize: 16,
    color: "#333",
  },
  loginButton: {
    width: "100%",
    padding: 15,
    backgroundColor: "#ff6f61", // Vibrant coral button
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#ff6f61", // Button shadow matching the color
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  loginButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  forgotPassword: {
    fontSize: 14,
    color: "#ff6f61", // Matching color to the button
    marginBottom: 30,
    textDecorationLine: "underline", // Underline for emphasis
  },
  signupContainer: {
    flexDirection: "row",
  },
  signupText: {
    fontSize: 14,
    color: "#fff",
  },
  signupLink: {
    fontSize: 14,
    color: "#ff6f61", // Vibrant coral color for the signup link
    fontWeight: "bold",
    textDecorationLine: "underline", // Underlined text for signup link
  },
});
