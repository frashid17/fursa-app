// Profile.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

// Define types for the search parameters
type ProfileParams = {
  cvUri?: string;
};

export default function Profile() {
  const router = useRouter();
  const { cvUri } = useLocalSearchParams<ProfileParams>();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>User Profile</Text>

      {/* Profile Information */}
      <Text style={styles.info}>Name: Patrick Mwangi</Text>
      <Text style={styles.info}>Email: frashid274@gmail.com</Text>

      {/* CV Section */}
      {cvUri ? (
        <TouchableOpacity onPress={() => Linking.openURL(cvUri)}>
          <Text style={styles.cvLink}>View CV</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.info}>No CV uploaded</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
    marginVertical: 10,
  },
  cvLink: {
    fontSize: 18,
    color: "blue",
    textDecorationLine: "underline",
    marginTop: 20,
  },
});
