import React from "react";
import { Text, View, StyleSheet, ScrollView, Image } from "react-native";

export default function AboutUs() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <Text style={styles.header}>About Us</Text> */}
      <Image 
        source={{uri: 'https://shorturl.at/mN5TW'}} 
        style={styles.image} 
        resizeMode="cover" 
      />
      <Text style={styles.paragraph}>
        Fursa is a platform dedicated to connecting job seekers in Mombasa with great career opportunities. We aim to create a bridge between local businesses and talented individuals looking for work in various industries.
      </Text>
      <Text style={styles.subheader}>Our Mission</Text>
      <Text style={styles.paragraph}>
        Our mission is to empower the youth of Mombasa by providing access to meaningful job opportunities that foster personal growth and economic stability.
      </Text>
      <Text style={styles.subheader}>Our Values</Text>
      <Text style={styles.paragraph}>
        We believe in integrity, inclusivity, and community. By connecting employers and job seekers in a respectful and supportive environment, we aim to build a stronger local workforce.
      </Text>
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
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
    marginBottom: 15,
  },
  subheader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#007BFF",
  },
});
