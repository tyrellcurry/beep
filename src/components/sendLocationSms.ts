import * as Location from "expo-location";
import * as SMS from "expo-sms";
import { Alert } from "react-native";

//TODO: fetch username 
export const sendLocationSms = async (phoneNumber: string, username: string = "Dora") => {
  // Request permissions for location
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    Alert.alert("Permission Denied", "Permission to access location was denied");
    return;
  }

  // Check if SMS is available on the device
  const isAvailable = await SMS.isAvailableAsync();
  if (!isAvailable) {
    Alert.alert("SMS Not Available", "SMS functionality is not available on this device");
    return;
  }

  // Send periodic location updates every 5 minutes (300,000 ms)
  const interval = setInterval(async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      const message = `${username} has sent an urgent alert through Beep.
Their location has been shared with you.
Check their location: https://maps.google.com/?q=${location.coords.latitude},${location.coords.longitude}`;

      // Send SMS
      const { result } = await SMS.sendSMSAsync([phoneNumber], message);
      if (result !== "sent") {
        console.log("SMS failed to send");
      } else {
        console.log("SMS sent successfully");
      }
    } catch (error) {
      console.error("Error fetching location or sending SMS:", error);
    }
  }, 300000); // 5 minutes interval

  // Clear interval after some time or when no longer needed (e.g., after 30 minutes)
  setTimeout(() => {
    clearInterval(interval);
    Alert.alert("Live Location Sharing Ended", "Location sharing via SMS has stopped.");
  }, 1800000); // Stop after 30 minutes
};
