import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text, Image, TextInput, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FIREBASE_DB } from "@/firebaseConfig";
import { useUser } from "../auth/userContext";
import { doc, setDoc } from "firebase/firestore";
import { router } from "expo-router";

interface PhotoPreviewProps {
  photo: string;
  onRetake: () => void;
}

const PhotoPreview: React.FC<PhotoPreviewProps> = ({ photo, onRetake }) => {
  const { user } = useUser();
  const [title, setTitle] = useState("");

  const savePhoto = async (photoUri: string) => {
    if (!user) {
      console.log("no user to save photo");
      return;
    }
    try {
      await setDoc(doc(FIREBASE_DB, "media", `${user.uid}_${Date.now()}`), {
        photo: photoUri,
        userId: user.uid,
        title: title,
        timestamp: new Date(),
      });
      console.log(photoUri, "saved! title:", title);
      onRetake();
    } catch (error) {
      console.error("Error saving photo:", error);
    }
  };
  return (
    <View style={styles.preview}>
      <Image source={{ uri: photo }} style={styles.previewImage} />

      <View style={styles.topControls}>
        <TouchableOpacity onPress={onRetake}>
          <Ionicons name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="download" size={30} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.titleContainer}>
        <TextInput placeholder="Add title" placeholderTextColor="white" style={styles.titleInput} value={title} onChangeText={setTitle} />
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.saveButton} onPress={() => savePhoto(photo)}>
          <Text style={styles.saveButtonText}>Save to Media History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={onRetake}>
          <Ionicons name="trash-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.contactSelection}>
        <Text style={styles.contactTitle}>Send to contacts</Text>
        <View style={styles.contacts}>
          <View style={styles.contactIcon}>
            <Text style={styles.contactText}>All</Text>
          </View>
          <View style={styles.contactIcon}>
            <Text style={styles.contactText}>D</Text>
          </View>
          <View style={styles.contactIcon}>
            <Text style={styles.contactText}>M</Text>
          </View>
          <View style={styles.contactIcon}>
            <Text style={styles.contactText}>J</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  preview: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: Platform.OS === "ios" ? 5 : 20,
  },
  previewImage: {
    width: Platform.OS === "ios" ? "95%" : "90%",
    height: "65%",
    alignItems: "center",
    borderRadius: 25,
    marginTop: Platform.OS === "ios" ? 40 : 70,
  },
  topControls: {
    position: "absolute",
    top: Platform.OS === "ios" ? 5 : 30,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 35,
  },
  titleContainer: {
    position: "absolute",
    bottom: 250,
    alignSelf: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 20,
  },
  titleInput: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
  },
  actionButtons: {
    position: "absolute",
    bottom: 150,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  saveButton: {
    backgroundColor: "#6A0DAD",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    marginRight: 10,
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    padding: 10,
    borderRadius: 25,
  },
  contactSelection: {
    position: "absolute",
    bottom: 50,
    alignItems: "flex-start",
    width: "100%",
    paddingHorizontal: 35,
  },
  contactTitle: {
    color: "white",
    fontSize: 16,
    marginBottom: 10,
  },
  contacts: {
    flexDirection: "row",
    justifyContent: "center",
  },
  contactIcon: {
    backgroundColor: "#6A0DAD",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  contactText: {
    color: "white",
    fontSize: 16,
  },
});

export default PhotoPreview;
