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

      <View style={styles.optionsContainer}>
        <View style={styles.option}>
          <TouchableOpacity style={styles.optionButton}>
            <View style={styles.optionTitleSet}>
              <Text style={styles.optionTitle}>processing</Text>
            </View>
            <Text style={styles.optionButtonText}>update</Text>
            <Text style={styles.optionDescription}>remove direct call</Text>
            <View style={styles.contactInfo}>
              {/* <Image source={{ uri: "https://i.pravatar.cc/300" }} style={styles.profileImage} />
              <Text style={styles.contactText}>dora123{"\n"}(604) 123-5678</Text> */}
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.option}>
          <TouchableOpacity style={styles.optionButton} onPress={sendLocationSms}>
            <View style={styles.optionTitleSet}>
              <Text style={styles.optionTitle}>Contacts</Text>
            </View>
            <Text style={styles.optionButtonText}>SMS Friend</Text>
            <Text style={styles.optionDescription}>Send alert to your emergency contacts</Text>
            <View style={styles.contactIcons}>
              <View style={styles.contactCircle}>
                <Text style={styles.contactInitial}>D</Text>
              </View>
              <View style={styles.contactCircle}>
                <Text style={styles.contactInitial}>M</Text>
              </View>
              <Ionicons name="add-circle" size={24} color="#FFFFFF" />
            </View>
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
    color: "#FF4C60",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    color: "#CCCCCC",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 30,
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
  },
  option: {
    width: "48%",
  },
  optionTitleSet: {
    backgroundColor: "#F4F0F1",
    borderRadius: 25,
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Platform.OS === "ios" ? 10 : 5,
    paddingVertical: Platform.OS === "ios" ? 1 : 0,
    paddingHorizontal: 1,
  },
  optionTitle: {
    color: "#141216",
    fontSize: 14,
    marginBottom: 5,
    alignItems: "center",
  },
  optionButton: {
    backgroundColor: "#651Fd7",
    borderRadius: 12,
    padding: 15,
    height: Platform.OS === "ios" ? 150 : 200,
  },
  optionButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  optionDescription: {
    color: "#CCCCCC",
    fontSize: 12,
    marginBottom: 10,
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
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#333333",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
  },
  contactInitial: {
    color: "#FFFFFF",
    fontSize: 12,
  },
});
