import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, Button, Alert, ScrollView } from "react-native";

export default function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Handle form submission
  const handleSubmit = () => {
    if (name && email && message) {
      Alert.alert("Thank You!", "Your message has been sent.");
      // Optionally clear fields or handle the API call here
      setName("");
      setEmail("");
      setMessage("");
    } else {
      Alert.alert("Error", "Please fill in all fields.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Contact Us</Text>

      <Text style={styles.paragraph}>
        We would love to hear from you! Please reach out with any questions, suggestions, or feedback.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Your Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Your Message"
        value={message}
        onChangeText={setMessage}
        multiline
        numberOfLines={4}
        placeholderTextColor="#888"
      />

      <Button title="Send Message" onPress={handleSubmit} color="#007BFF" />

      <View style={styles.footer}>
        <Text style={styles.footerText}>Or reach us via email: support@fursa.com</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  paragraph: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
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
    textAlign: "center",
  },
  footerText: {
    fontSize: 16,
    color: "#555",
  },
});
