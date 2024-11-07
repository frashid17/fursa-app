// /app/signup.tsx
import React, { useState } from "react";
import { Text, View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { Link } from "expo-router"; // Import Link for navigation

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Handle the form submission
  const handleSubmit = () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    if (name && email && password) {
      Alert.alert("Success", "Account created successfully!");
      // Handle further actions like API calls or navigation after successful signup
    } else {
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
