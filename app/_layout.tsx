import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
  return (
    <Stack>
      {/* Define a default screen */}
      <Stack.Screen
        name="index"
        options={{
          headerShown: false, // Hides the header for the index screen
        }}
      />
      {/* Define other screens with customizable headers */}
      <Stack.Screen
        name="login"
        options={{
          headerShown: false, // Hides the header for the login screen
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          headerShown: false,// Custom header title for the sign-up screen
        }}
      />
      <Stack.Screen
        name="about-us"
        options={{
          title: "About Us", // Custom header for the dashboard
          headerShown: true, // Show header on the dashboard screen
        }}
      />
       <Stack.Screen
        name="contact-us"
        options={{
          title: "Contact Us", // Custom header for the dashboard
          headerShown: true, // Show header on the dashboard screen
        }}
      />
    </Stack>
  );
}
