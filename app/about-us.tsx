import React from "react";
import { Text, View, StyleSheet, ScrollView, Image } from "react-native";

export default function AboutUs() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <Text style={styles.header}>About Us</Text> */}

      {/* Wrapping Image in a View for centering */}
      <View style={styles.imageContainer}>
        <Image 
          source={{uri: 'https://play-lh.googleusercontent.com/6-gnRaCuFdMIW3tlEccVtdMqOQtVF2r9FVWswRJ-Vthg4-lwkJ15MRUuawrehNUouRo'}} 
          style={styles.image} 
          resizeMode="contain"  // "contain" ensures the image fits within the bounds without distortion
        />
      </View>

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
  imageContainer: {
    alignItems: 'center',  // Centers the image horizontally
    justifyContent: 'center',  // Ensures the image is vertically centered inside the container (if container has space)
    marginBottom: 20, // Space below the image
  },
  image: {
    width: 200, // Fixed width for the image
    height: 200, // Fixed height for the image
    borderRadius: 10, // Rounded corners
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
