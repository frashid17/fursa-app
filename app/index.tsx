import React from "react";
import { Text, View, StyleSheet, Pressable, ScrollView } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons"; // Import additional icons
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useRouter } from "expo-router";

// Screen Components
const MainScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to <Text style={styles.brand}>Fursa</Text>!</Text>
      <Text style={styles.subheader}>Your gateway to job opportunities in Mombasa.</Text>

      <Pressable style={styles.button} onPress={() => router.push("/job-listings")}>
        <Text style={styles.buttonText}>Explore Job Listings</Text>
        <Ionicons name="search" size={20} color="white" style={styles.icon} />
      </Pressable>

      {/* Recent Jobs Section */}
      <View style={styles.recentJobsSection}>
        <Text style={styles.sectionTitle}>Recent Jobs</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recentJobsList}>
          <View style={styles.jobCard}>
            <FontAwesome5 name="laptop-code" size={24} color="#fff" style={styles.jobIcon} />
            <Text style={styles.jobTitle}>Software Developer</Text>
            <Text style={styles.jobDescription}>Join our team as a software developer. Full-stack position.</Text>
            <Pressable style={styles.jobButton} onPress={() => router.push("/login")}>
              <Text style={styles.jobButtonText}>Apply Now</Text>
            </Pressable>
          </View>
          <View style={styles.jobCard}>
            <FontAwesome5 name="palette" size={24} color="#fff" style={styles.jobIcon} />
            <Text style={styles.jobTitle}>Graphic Designer</Text>
            <Text style={styles.jobDescription}>Looking for a talented designer to create visuals for campaigns.</Text>
            <Pressable style={styles.jobButton} onPress={() => router.push("/login")}>
              <Text style={styles.jobButtonText}>Apply Now</Text>
            </Pressable>
          </View>
          <View style={styles.jobCard}>
            <FontAwesome5 name="chart-line" size={24} color="#fff" style={styles.jobIcon} />
            <Text style={styles.jobTitle}>Data Analyst</Text>
            <Text style={styles.jobDescription}>Seeking a data analyst to analyze market trends and insights.</Text>
            <Pressable style={styles.jobButton} onPress={() => router.push("/login")}>
              <Text style={styles.jobButtonText}>Apply Now</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>

      {/* Featured Job Button */}
      <Pressable style={styles.featuredJobButton} onPress={() => router.push("/job-listings")}>
        <Text style={styles.featuredJobButtonText}>Featured Job: Software Engineer</Text>
      </Pressable>
    </View>
  );
};

// Bottom Tab Navigator
const Tab = createBottomTabNavigator();

const App = () => {
  const router = useRouter();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#2980b9',
        tabBarInactiveTintColor: '#7f8c8d',
        tabBarStyle: {
          backgroundColor: '#ecf0f1',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={MainScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Login"
        component={() => router.push("/login")}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="log-in" color={color} size={size} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault(); // Prevent default navigation
            router.push("/login");
          }
        }}
      />
      <Tab.Screen
        name="About Us"
        component={() => router.push("/about-us")}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="information-circle" color={color} size={size} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault(); // Prevent default navigation
            router.push("/about-us");
          }
        }}
      />
      <Tab.Screen
        name="Contact Us"
        component={() => router.push("/contact-us")}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="mail" color={color} size={size} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault(); // Prevent default navigation
            router.push("/contact-us");
          }
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f0f4f8", // Light gradient background
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 10,
    textAlign: "center",
  },
  brand: {
    color: "#2980b9", // Blue color for the brand name
  },
  subheader: {
    fontSize: 16,
    color: "#7f8c8d", // Grayish color for subheading
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#2980b9", // Bright blue
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 50,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#2c3e50", // Shadow for depth
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  icon: {
    marginLeft: 10,
  },
  recentJobsSection: {
    marginTop: 30,
    width: "100%",
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#34495e",
    marginBottom: 15,
  },
  recentJobsList: {
    flexDirection: "row",
    paddingBottom: 20,
  },
  jobCard: {
    backgroundColor: "#2980b9", // Bright blue card
    padding: 15,
    borderRadius: 12,
    marginRight: 15,
    width: 250,
    shadowColor: "#2c3e50",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  jobIcon: {
    marginBottom: 15,
    backgroundColor: "#16a085", // Teal background for the icon
    padding: 10,
    borderRadius: 50,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  jobDescription: {
    fontSize: 14,
    color: "#ecf0f1",
    textAlign: "center",
    marginTop: 5,
    marginBottom: 15,
  },
  jobButton: {
    backgroundColor: "#27ae60", // Green button for apply now
    paddingVertical: 10,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  jobButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  featuredJobButton: {
    backgroundColor: "#f39c12", // Yellow for featured jobs
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginTop: 30,
    alignItems: "center",
    shadowColor: "#2c3e50",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  featuredJobButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default App;
