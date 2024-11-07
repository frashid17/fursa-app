// /app/login.tsx
import React, { useState } from "react";
import { Text, View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router"; // Import useRouter for navigation

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); // Initialize the router

  // Default credentials
  const defaultEmail = "frashid274@gmail.com";
  const defaultPassword = "password";

  // Handle the login submission
  const handleLogin = () => {
    // Check if the email is correct
    if (email !== defaultEmail) {
      Alert.alert("Error", "Incorrect email. Please try again.");
      return; // Stop further checks if email is incorrect
    }

    // Check if the password is correct
    if (password !== defaultPassword) {
      Alert.alert("Error", "Wrong password. Please try again.");
      return; // Stop further action if password is incorrect
    }

    // If both email and password are correct, proceed to dashboard
    Alert.alert("Success", "Logged in successfully!");
    router.push("/dashboard"); // Navigate to dashboard if login is successful
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login to Your Account</Text>

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

      <Button title="Log In" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F5F5F5",
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
});
