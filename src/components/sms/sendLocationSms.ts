import * as SMS from "expo-sms";
import { Alert } from "react-native";
import { sendSms } from "@/src/components/sms/sendSms";

// Define the Firebase-hosted page link to view live locations
const FIREBASE_DYNAMIC_LINK = "https://beep-a485b/live-location?userId=";

export const sendLocationSms = async (phoneNumber: string, userId: string, username: string = "User") => {
  // Check if SMS is available on the device
  const isAvailable = await SMS.isAvailableAsync();
  if (!isAvailable) {
    Alert.alert("SMS Not Available", "SMS functionality is not available on this device");
    return;
  }

  const message = `${username} has shared their live location with you through Beep.
View their location here: ${FIREBASE_DYNAMIC_LINK}${userId}`;

  try {
    const { result } = await SMS.sendSMSAsync([phoneNumber], message);
    if (result === "sent") {
      console.log("Message sent successfully");
    } else {
      console.log("Message not sent");
    }
  } catch (error) {
    console.error("Error sending SMS:", error);
  }
};
