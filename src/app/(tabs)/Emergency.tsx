import React, { useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { sendLocationSms } from "@/src/components/sendLocationSms";

const EmergencyScreen: React.FC = () => {
  const router = useRouter();
  const lastTap = useRef(0);

  const handleDoubleTap = () => {
    const now = Date.now();
    if (lastTap.current && now - lastTap.current < 300) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      router.push("/sos");
    } else {
      lastTap.current = now;
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📍BCIT School of Business + Media</Text>
      <Text style={styles.title}>Activate Alarm</Text>
      <Text style={styles.subtitle}>Sound a loud alarm and send your location to emergency contacts.</Text>

      <TouchableOpacity style={styles.sosButton} onPress={handleDoubleTap}>
        <Text style={styles.sosText}>SOS</Text>
      </TouchableOpacity>

      <Text style={styles.instructions}>Tap 2 times on button to activate</Text>

      <Text style={styles.optionTitle}>SMS option</Text>
      <View style={styles.optionsContainer}>
        <View style={styles.option}>
          <TouchableOpacity style={styles.optionButton} onPress={sendLocationSms}>
            <Text style={styles.optionButtonText}>Emergency Alert</Text>
            <Text style={styles.optionDescription}>Send the default emergency message and your live location to all selected contacts</Text>
            <View style={styles.contactIcons}>
              <View style={styles.contactCircle}>
                <Text style={styles.contactInitial}>D</Text>
              </View>
              <View style={styles.contactCircle}>
                <Text style={styles.contactInitial}>M</Text>
              </View>
              <Ionicons name="add-circle" size={34} color="#141216" />
            </View>
            <TouchableOpacity style={styles.arrowButton}>
              <Ionicons name="arrow-forward" size={20} color="white" />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default EmergencyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141216",
    padding: 20,
  },
  header: {
    marginTop: 50,
    color: "#cccccc",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  subtitle: {
    color: "#CCCCCC",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 30,
    marginTop: 15,
  },
  sosButton: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "#F7185B",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 10,
    marginTop: 10,
    shadowColor: "#F7185B",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 50,
  },
  sosText: {
    color: "#FFFFFF",
    fontSize: 36,
    fontWeight: "bold",
  },
  instructions: {
    color: "#AAAAAA",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
    marginTop: 15,
  },
  option: {
    width: "95%",
  },
  optionTitle: {
    color: "#F4F0F1",
    fontSize: 18,
    textAlign: "left",
    marginTop: 15,
  },
  optionButton: {
    backgroundColor: "#651Fd7",
    borderRadius: 15,
    paddingLeft: 15,
    paddingBottom: 15,
    paddingTop: 15,
    paddingRight: 50,
    height: Platform.OS === "ios" ? 150 : 200,
  },
  optionButtonText: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 8,
  },
  optionDescription: {
    color: "#cccccc",
    fontSize: 12,
    marginBottom: 10,
    textAlign: "left",
  },
  arrowButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#FF4D4D",
    borderRadius: 15,
    padding: 6,
  },
  contactInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  contactText: {
    color: "#FFFFFF",
    fontSize: 10,
    marginRight: 5,
  },
  contactIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  contactCircle: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: "#F7185B",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
  },
  contactInitial: {
    color: "#FFFFFF",
    fontSize: 12,
  },
});
