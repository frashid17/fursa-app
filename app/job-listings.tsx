import React, { useState, useRef } from "react";
import { 
  Text, 
  View, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  Button, 
  Alert, 
  Image, 
  Animated 
} from "react-native";

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
    user: "Khadija Mchori",
    rating: 4,
    text: "Great opportunity, the company culture seems amazing. Definitely recommend!",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    user: "Patrick Mwangi",
    rating: 5,
    text: "Awesome position for anyone with a passion for tech. Very fast-paced and challenging work environment!",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    user: "Joseph Amos",
    rating: 3,
    text: "Job looks good, but the workload is a bit too much. Could be better managed.",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    user: "Thomas Mwaisaka ",
    rating: 5,
    text: "Great work-life balance, supportive team, and great growth opportunities.",
    avatar: "https://i.pravatar.cc/150?img=4",
  },
  {
    user: "Najma Said",
    rating: 4,
    text: "The role is exciting, but there's room for improvement in communication from management.",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    user: "Elizabeth Nzisas", //added new user 
    rating: 4,
    text: "I love the app and how easy it is to use it", 
    avatar: "https://i.pravatar.cc/150?img=49",
  },
];

export default function JobListings() {
  const [expandedJobId, setExpandedJobId] = useState<number | null>(null);
  const [review, setReview] = useState("");
  const animatedValues = useRef(jobs.map(() => new Animated.Value(0))).current;

  // Toggle job details visibility with animation
  const toggleJobDetails = (id: number) => {
    const index = jobs.findIndex(job => job.id === id);
    const isExpanded = expandedJobId === id;

    if (isExpanded) {
      Animated.timing(animatedValues[index], {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setExpandedJobId(null));
    } else {
      setExpandedJobId(id);
      Animated.timing(animatedValues[index], {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleReviewSubmit = (jobId: number) => {
    if (review) {
      Alert.alert("Review Submitted", `Your review for job ID ${jobId} has been submitted.`);
      setReview("");
    } else {
      Alert.alert("Error", "Please write a review before submitting.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Job Listings</Text>

      {jobs.map((job, index) => (
        <View key={job.id} style={styles.jobCard}>
          <TouchableOpacity onPress={() => toggleJobDetails(job.id)} style={styles.jobTitleContainer}>
            <Text style={styles.jobTitle}>{job.title}</Text>
            <Text style={styles.companyName}>{job.company}</Text>
          </TouchableOpacity>

          {expandedJobId === job.id && (
            <Animated.View style={[styles.jobDetails, { opacity: animatedValues[index] }]}>
              <Text style={styles.jobDescription}>Description: {job.description}</Text>
              <Text style={styles.jobDescription}>Requirements: {job.requirements}</Text>
              <Text style={styles.jobDescription}>Location: {job.location}</Text>
            </Animated.View>
          )}

          {expandedJobId === job.id && (
            <View style={styles.reviewSection}>
              <Text style={styles.reviewHeader}>Leave a Review</Text>
              <TextInput
                style={styles.reviewInput}
                placeholder="Write your review here..."
                value={review}
                onChangeText={setReview}
              />
              <Button title="Submit Review" color="#007BFF" onPress={() => handleReviewSubmit(job.id)} />
            </View>
          )}
        </View>
      ))}

      <View style={styles.footer}>
        <Text style={styles.footerText}>User Reviews</Text>
        {reviews.map((review, index) => (
          <View key={index} style={styles.reviewCard}>
            <View style={styles.userInfo}>
              <Image source={{ uri: review.avatar }} style={styles.userAvatar} />
              <Text style={styles.userName}>{review.user}</Text>
            </View>
            <View style={styles.ratingContainer}>
              {Array.from({ length: 5 }, (_, i) => (
                <Text key={i} style={i < review.rating ? styles.filledStar : styles.emptyStar}>★</Text>
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
    backgroundColor: "#E5E5E5",
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#007BFF",
    marginBottom: 20,
    textAlign: "center",
  },
  jobCard: {
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  jobTitleContainer: {
    paddingBottom: 10,
  },
  jobTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333333",
  },
  companyName: {
    fontSize: 16,
    color: "#666666",
  },
  jobDetails: {
    marginTop: 15,
    paddingLeft: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#007BFF",
  },
  jobDescription: {
    fontSize: 16,
    color: "#444444",
    marginBottom: 5,
  },
  reviewSection: {
    marginTop: 15,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#eeeeee",
  },
  reviewHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  reviewInput: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 8,
    backgroundColor: "#fafafa",
    marginBottom: 10,
    fontSize: 16,
  },
  footer: {
    marginTop: 30,
    backgroundColor: "#f9f9f9",
    padding: 20,
    borderRadius: 10,
  },
  footerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007BFF",
    marginBottom: 15,
    textAlign: "center",
  },
  reviewCard: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
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
    marginBottom: 5,
  },
  filledStar: {
    color: "#FFD700",
    fontSize: 18,
  },
  emptyStar: {
    color: "#D3D3D3",
    fontSize: 18,
  },
  reviewText: {
    fontSize: 14,
    color: "#555555",
  },
});
