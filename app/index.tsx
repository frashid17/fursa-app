import { Text, View, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router"; // For navigation

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to Fursa!</Text>
      <Text style={styles.subheader}>Your gateway to job opportunities in Mombasa.</Text>
      
      {/* Navigate to Job Listings */}
      <Pressable 
        style={styles.button} 
        onPress={() => router.push("/job-listings")}
      >
        <Text style={styles.buttonText}>Explore Job Listings</Text>
      </Pressable>

      {/* Navigate to Signup */}
      <Pressable 
        style={[styles.button, styles.signUpButton]} 
        onPress={() => router.push("/signup")}
      >
        <Text style={styles.buttonText}>Create Account</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subheader: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  signUpButton: {
    backgroundColor: "#28A745",
  },
});
