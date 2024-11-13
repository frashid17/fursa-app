import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
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
  Animated,
} from "react-native";

// Define types for the review data
interface Review {
  user: string;
  avatar: string;
  rating: number;
  text: string;
}

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

  // Fetch job listings from the Django API and initialize animatedValues
  useEffect(() => {
    axios
      .get<Job[]>("http://10.0.1.18:8000/api/jobs/") // Replace with your actual API URL
      .then((response) => {
        setJobs(response.data);
        // Initialize animatedValues based on fetched jobs
        animatedValues.current = response.data.map(() => new Animated.Value(0));
      })
      .catch((error: unknown) => {
        if (error instanceof Error) {
          console.error("Error fetching job listings:", error.message);
        } else {
          console.error("Unknown error:", error);
        }
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
      <Text style={styles.header}>Job Listings</Text>

      {jobs.map((job, index) => (
        <View key={job.id} style={styles.jobCard}>
          <TouchableOpacity onPress={() => toggleJobDetails(job.id)} style={styles.jobTitleContainer}>
            <Text style={styles.jobTitle}>{job.title}</Text>
            <Text style={styles.companyName}>{job.company}</Text>
          </TouchableOpacity>

          {expandedJobId === job.id && (
            <Animated.View style={[styles.jobDetails, { opacity: animatedValues.current[index] }]}>
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
    padding: 10,
    backgroundColor: "#f8f8f8",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  jobCard: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  jobTitleContainer: {
    marginBottom: 10,
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
  jobDescription: {
    fontSize: 14,
    color: "#333",
  },
  reviewSection: {
    marginTop: 20,
  },
  reviewHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  reviewInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
  footer: {
    marginTop: 30,
  },
  footerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  reviewCard: {
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  userAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  userName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  ratingContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  filledStar: {
    color: "#FFD700",
  },
  emptyStar: {
    color: "#ccc",
  },
  reviewText: {
    fontSize: 14,
    color: "#333",
  },
});
