import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  Image,
  Animated,
} from "react-native";
import { MaterialIcons, Ionicons, FontAwesome } from "@expo/vector-icons";

// Define types for reviews
interface Review {
  user: string;
  avatar: string;
  rating: number;
  text: string;
}

const reviews: Review[] = [
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
    user: "Elizabeth Nzisa", //added new user 
    rating: 5,
    text: "I love the app and how easy it is to use it", 
    avatar: "https://i.pravatar.cc/150?img=49",
  },
];

// Define types for the job data
interface Job {
  id: number;
  title: string;
  company: string;
  description: string;
  requirements: string;
  location: string;
}

export default function JobListings(): JSX.Element {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [expandedJobId, setExpandedJobId] = useState<number | null>(null);
  const [review, setReview] = useState<string>("");
  const animatedValues = useRef<Animated.Value[]>([]);

  useEffect(() => {
    axios
      .get<Job[]>("http://192.168.246.218:8000/api/jobs/")
      .then((response) => {
        setJobs(response.data);
        animatedValues.current = response.data.map(() => new Animated.Value(0));
      })
      .catch((error) => {
        console.error("Error fetching job listings:", error);
      });
  }, []);

  const toggleJobDetails = (id: number) => {
    const index = jobs.findIndex((job) => job.id === id);
    const isExpanded = expandedJobId === id;

    if (isExpanded) {
      Animated.timing(animatedValues.current[index], {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setExpandedJobId(null));
    } else {
      setExpandedJobId(id);
      Animated.timing(animatedValues.current[index], {
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
      <View style={styles.header}>
        <Text style={styles.headerText}>Job Opportunities</Text>
      </View>

      {jobs.map((job, index) => (
        <View key={job.id} style={styles.jobCard}>
          <TouchableOpacity onPress={() => toggleJobDetails(job.id)} style={styles.jobHeader}>
            <Ionicons name="briefcase" size={24} color="#007BFF" />
            <View style={styles.jobHeaderText}>
              <Text style={styles.jobTitle}>{job.title}</Text>
              <Text style={styles.companyName}>{job.company}</Text>
            </View>
          </TouchableOpacity>

          {expandedJobId === job.id && (
            <Animated.View style={[styles.jobDetails, { opacity: animatedValues.current[index] }]}>
              <Text style={styles.jobLabel}>Description:</Text>
              <Text style={styles.jobText}>{job.description}</Text>
              <Text style={styles.jobLabel}>Requirements:</Text>
              <Text style={styles.jobText}>{job.requirements}</Text>
              <Text style={styles.jobLabel}>Location:</Text>
              <Text style={styles.jobText}>{job.location}</Text>
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
              <TouchableOpacity style={styles.submitButton} onPress={() => handleReviewSubmit(job.id)}>
                <Text style={styles.submitButtonText}>Submit Review</Text>
              </TouchableOpacity>
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
              <View>
                <Text style={styles.userName}>{review.user}</Text>
                <View style={styles.ratingContainer}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <FontAwesome
                      key={i}
                      name={i < review.rating ? "star" : "star-o"}
                      size={16}
                      color="#FFD700"
                    />
                  ))}
                </View>
              </View>
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
    backgroundColor: "#f8f8f8",
  },
  header: {
    backgroundColor: "#007BFF",
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  jobCard: {
    backgroundColor: "#fff",
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  jobHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  jobHeaderText: {
    marginLeft: 10,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  companyName: {
    fontSize: 14,
    color: "#777",
  },
  jobDetails: {
    marginTop: 10,
  },
  jobLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
  },
  jobText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 10,
  },
  reviewSection: {
    marginTop: 15,
    borderTopColor: "#ccc",
    borderTopWidth: 1,
    paddingTop: 10,
  },
  reviewHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  reviewInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  footer: {
    marginTop: 20,
    padding: 15,
  },
  footerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  reviewCard: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 15,
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
  },
  ratingContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  reviewText: {
    fontSize: 14,
    color: "#333",
  },
});
