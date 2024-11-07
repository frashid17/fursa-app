import React, { useState } from "react";
import { Text, View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { Link, useRouter } from "expo-router"; // Import Link for navigation
import { API_URL } from "../config"; // Import your API URL from a config file

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  // Handle the form submission
  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    if (name && email && password) {
      try {
        // Log the request data to verify it's correct
        console.log({
          username: name,
          email,
          password,
        });

        // Send data to the Django backend via POST request
        const response = await fetch(`${API_URL}/signup/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: name,
            email,
            password,
          }),
        });

        // Log the raw response text to inspect what's returned from the server
        const responseText = await response.text();
        console.log("Raw Response Text:", responseText);

        // Attempt to parse the response text as JSON
        const data = JSON.parse(responseText);

        if (response.ok) {
          // Account creation successful
          Alert.alert("Success", "Account created successfully!");
          router.push("/login"); // Redirect to login page after successful signup
        } else {
          // Display error from server if any
          Alert.alert("Error", data.message || "Something went wrong.");
        }
      } catch (error) {
        // Log the error and display a generic message to the user
        console.error("Error during signup:", error); // Log the error for troubleshooting
        Alert.alert("Error", "Unable to reach the server. Please try again later.");
      }
    } else {
      // Alert for missing required fields
      Alert.alert("Error", "Please fill in all fields.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Your Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        placeholderTextColor="#888"
      />

      {/* Submit button with custom style */}
      <Button title="Sign Up" onPress={handleSubmit} />

      {/* Link to login page */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Already have an account?{" "}
          <Link href="/login">
            <Text style={styles.link}>Login</Text>
          </Link>
        </Text>
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
    backgroundColor: "#F5F5F5", // Light background for clean look
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    fontSize: 16,
    color: "#333",
  },
  footer: {
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: "#555",
  },
  link: {
    color: "#007BFF", // Blue link color
    fontWeight: "bold",
  },
});
