import React, { useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { sendLocationSms } from "@/src/components/sms/sendLocationSms";

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
      <Text style={styles.subtitle}>
        Sound a loud alarm and send your location to emergency contacts.
      </Text>

      <TouchableOpacity style={styles.sosButton} onPress={handleDoubleTap}>
        <View style={styles.sosTextContainer}>
          <Text style={styles.sosText}>SOS</Text>
        </View>
        <View style={styles.sosButtonOuterCircle} />
        <View style={styles.sosButtonMiddleCircle} />
        <View style={styles.sosButtonInnerCircle} />
      </TouchableOpacity>
      <Text style={styles.instructions}>Tap 2 times on button to activate</Text>

      <Text style={styles.optionTitle}>SMS option</Text>
      <View style={styles.optionsContainer}>
        <View style={styles.option}>
        {/* TODO: get dynamic user data */}
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => sendLocationSms("1234567890", "Dora")}
          >
            <Text style={styles.optionButtonText}>Emergency Alert</Text>
            <Text style={styles.optionDescription}>
              Send the default emergency message and your live location to all
              selected contacts
            </Text>
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
    width: 200,
    height: 200,
    borderRadius: 90,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    position: "relative",
    marginBottom: 20,
  },
  sosButtonOuterCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(247, 24, 91, 0.3)",
    position: "absolute",
    top: 0,
    left: 0,
  },
  sosButtonMiddleCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(247, 24, 91, 0.5)",
    position: "absolute",
    top: 10,
    left: 10,
  },
  sosButtonInnerCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#F7185B",
    position: "absolute",
    top: 25,
    left: 25,
  },
  sosTextContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  sosText: {
    color: "#FFFFFF",
    fontSize: 34,
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
    height: Platform.OS === "ios" ? 150 : 170,
  },
  optionButtonText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: Platform.OS === "ios" ? 8 : 0,
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
