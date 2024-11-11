import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient for gradient button
import { Link, useRouter } from "expo-router";
import { API_URL } from "../config";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    if (name && email && password) {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/signup/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: name, email, password }),
        });
        const data = await response.json();

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
        setLoading(false);
      }
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
  buttonContainer: {
    width: "100%",
    borderRadius: 8,
    overflow: "hidden",
  },
  button: {
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
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
    color: "#007BFF",
    fontWeight: "bold",
  },
});
