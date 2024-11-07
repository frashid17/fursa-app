import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, TextInput, Button, Alert, Image } from "react-native";

// Job data
const jobs = [
  {
    id: 1,
    title: "Software Engineer",
    company: "Tech Solutions Ltd",
    description: "We are looking for a talented software engineer to join our team and work on exciting projects.",
    requirements: "3+ years experience in software development, proficiency in JavaScript, React, Node.js.",
    location: "Mombasa, Kenya",
  },
  {
    id: 2,
    title: "Graphic Designer",
    company: "Creative Designs Co.",
    description: "Looking for a creative graphic designer with a passion for designing eye-catching visuals.",
    requirements: "Proficiency in Adobe Photoshop, Illustrator, and InDesign.",
    location: "Mombasa, Kenya",
  },
  {
    id: 3,
    title: "Project Manager",
    company: "BuildRight Corp.",
    description: "We need a Project Manager to oversee project execution from start to finish, ensuring timely delivery.",
    requirements: "5+ years of project management experience, excellent communication and organizational skills.",
    location: "Mombasa, Kenya",
  },
  {
    id: 4,
    title: "Marketing Specialist",
    company: "GrowthHub Ltd",
    description: "We are looking for an experienced Marketing Specialist to join our team and handle marketing strategies.",
    requirements: "Experience in digital marketing, content creation, and SEO optimization.",
    location: "Mombasa, Kenya",
  },
  {
    id: 5,
    title: "Customer Support Representative",
    company: "TechHelp Ltd",
    description: "We are hiring a customer support rep to assist our clients and provide solutions to their problems.",
    requirements: "Excellent communication skills, problem-solving abilities, and previous customer service experience.",
    location: "Mombasa, Kenya",
  },
];

// Sample reviews with ratings
const reviews = [
  {
    user: "Patrick Mwangi",
    rating: 4,
    text: "Great opportunity, the company culture seems amazing. Definitely recommend!",
    avatar: "https://shorturl.at/4z7xx", // Male Avatar
  },
  {
    user: "Mumina Dalacha",
    rating: 5,
    text: "Awesome position for anyone with a passion for tech. Very fast-paced and challenging work environment!",
    avatar: "https://i.pravatar.cc/150?img=2", // Female Avatar
  },
  {
    user: "Ahlam Abdhallah",
    rating: 3,
    text: "Job looks good, but the workload is a bit too much. Could be better managed.",
    avatar: "https://i.pravatar.cc/150?img=3", // Female Avatar
  },
  {
    user: "Nickson Simiyu",
    rating: 5,
    text: "Great work-life balance, supportive team, and great growth opportunities.",
    avatar: "https://i.pravatar.cc/150?img=4", // Male Avatar
  },
  {
    user: "Ashley Obano",
    rating: 4,
    text: "The role is exciting, but there's room for improvement in communication from management.",
    avatar: "https://i.pravatar.cc/150?img=5", // Female Avatar
  },
];

export default function JobListings() {
  const [expandedJobId, setExpandedJobId] = useState<number | null>(null);
  const [review, setReview] = useState("");

  // Toggle job details visibility
  const toggleJobDetails = (id: number) => {
    setExpandedJobId((prev) => (prev === id ? null : id));
  };

  // Handle review submission
  const handleReviewSubmit = (jobId: number) => {
    if (review) {
      Alert.alert("Review Submitted", `Your review for job ID ${jobId} has been submitted.`);
      setReview(""); // Clear review input after submission
    } else {
      Alert.alert("Error", "Please write a review before submitting.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Job Listings</Text>

      {jobs.map((job) => (
        <View key={job.id} style={styles.jobCard}>
          <TouchableOpacity onPress={() => toggleJobDetails(job.id)} style={styles.jobTitleContainer}>
            <Text style={styles.jobTitle}>{job.title}</Text>
            <Text style={styles.companyName}>{job.company}</Text>
          </TouchableOpacity>

          {expandedJobId === job.id && (
            <View style={styles.jobDetails}>
              <Text style={styles.jobDescription}>Description: {job.description}</Text>
              <Text style={styles.jobDescription}>Requirements: {job.requirements}</Text>
              <Text style={styles.jobDescription}>Location: {job.location}</Text>
            </View>
          )}

          {/* Review section for each job */}
          {expandedJobId === job.id && (
            <View style={styles.reviewSection}>
              <Text style={styles.reviewHeader}>Leave a Review</Text>
              <TextInput
                style={styles.reviewInput}
                placeholder="Write your review here..."
                value={review}
                onChangeText={setReview}
              />
              <Button title="Submit Review" onPress={() => handleReviewSubmit(job.id)} />
            </View>
          )}
        </View>
      ))}

      {/* User Reviews */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>User Reviews</Text>
        {reviews.map((review, index) => (
          <View key={index} style={styles.reviewCard}>
            <View style={styles.userInfo}>
              <Image
                source={{ uri: review.avatar }}
                style={styles.userAvatar}
              />
              <Text style={styles.userName}>{review.user}</Text>
            </View>
            <View style={styles.ratingContainer}>
              {Array.from({ length: 5 }, (_, i) => (
                <Text key={i} style={i < review.rating ? styles.filledStar : styles.emptyStar}>
                  ★
                </Text>
              ))}
            </View>
            <Text style={styles.reviewText}>{review.text}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  jobCard: {
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    elevation: 3,
  },
  jobTitleContainer: {
    paddingBottom: 10,
  },
  jobTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#007BFF",
  },
  companyName: {
    fontSize: 16,
    color: "#888",
  },
  jobDetails: {
    marginTop: 10,
    paddingLeft: 10,
  },
  jobDescription: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  reviewSection: {
    marginTop: 15,
  },
  reviewHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  reviewInput: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    marginBottom: 10,
    fontSize: 16,
  },
  footer: {
    marginTop: 30,
    backgroundColor: "#f1f1f1",
    padding: 15,
    borderRadius: 8,
  },
  footerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  reviewCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 3,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  ratingContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  filledStar: {
    color: "#FFD700",
    fontSize: 18,
  },
  emptyStar: {
    color: "#ccc",
    fontSize: 18,
  },
  reviewText: {
    fontSize: 14,
    color: "#555",
  },
});
