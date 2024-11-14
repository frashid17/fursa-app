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
import { Ionicons } from "@expo/vector-icons"; // Import icons for input fields
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient for gradient button
import { Link, useRouter } from "expo-router";
import { API_URL } from "../config"; // Assuming this is where your base URL is stored

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    // Validate that the passwords match
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    // Validate that all fields are filled
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    // Begin loading state
    setLoading(true);

    try {
      // Send signup request to the API
      const response = await fetch(`${API_URL}/signup/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: name, // If the API expects "username" for name
          email,
          password,
        }),
      });

      const data = await response.json();

      // Check if the response is okay
      if (response.ok) {
        Alert.alert("Success", "Account created successfully!");
        router.push("/login");
      } else if (data.email && data.email.includes("Email already exists")) {
        Alert.alert("Error", "Email already exists. Please log in.");
        router.push("/login");
      } else {
        Alert.alert("Error", data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      Alert.alert("Error", "Unable to reach the server. Please try again later.");
    } finally {
      setLoading(false); // Stop loading after the request is done
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Your Account</Text>

      {/* Input fields for signup with icons */}
      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={20} color="#6c757d" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#B0B0B0"
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={20} color="#6c757d" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
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

      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="#6c757d" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          placeholderTextColor="#B0B0B0"
        />
      </View>

      {/* Gradient button styled like Instagram */}
      <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit} disabled={loading}>
        <LinearGradient
          colors={["#fd5949", "#d6249f", "#285AEB"]}
          style={styles.button}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>

      {/* Footer link to login page */}
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
    backgroundColor: "#F0F2F5",
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
  buttonContainer: {
    width: "100%",
    borderRadius: 30,
    overflow: "hidden",
  },
  button: {
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 30,
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: "#555",
  },
  link: {
    color: "#ff6f61", // Vibrant color for the link
    fontWeight: "bold",
  },
});
