// /app/signup.tsx
import { Text, View, StyleSheet } from "react-native";

export default function Signup() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Your Account</Text>
      {/* Add signup form components here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
