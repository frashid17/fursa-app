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
      <Text style={styles.header}>Login to your Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Phone number, username, or email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholderTextColor="#B0B0B0"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#B0B0B0"
      />

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
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 40,
  },
  input: {
    width: "100%",
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#dbdbdb",
    backgroundColor: "#fafafa",
    fontSize: 16,
    color: "#333",
  },
  loginButton: {
    width: "100%",
    padding: 15,
    backgroundColor: "#0095f6", // Instagram blue color
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  loginButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  forgotPassword: {
    fontSize: 14,
    color: "#0095f6",
    marginBottom: 30,
  },
  signupContainer: {
    flexDirection: "row",
  },
  signupText: {
    fontSize: 14,
    color: "#000",
  },
  signupLink: {
    fontSize: 14,
    color: "#0095f6",
    fontWeight: "bold",
  },
});
