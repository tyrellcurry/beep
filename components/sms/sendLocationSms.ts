import * as Location from "expo-location";
import { Alert } from "react-native";
import { sendSms } from "@/components/sms/sendSms";

interface LatLng {
  latitude: number;
  longitude: number;
}
export const sendLocationSms = async (destination?: LatLng) => {
  // console.log("Destination passed to sendLocationSms:", destination);
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    Alert.alert("Permission Denied", "Permission to access location was denied");
    return;
  }
  const location = await Location.getCurrentPositionAsync({});
  const { latitude, longitude } = location.coords;
  if (!destination) {
    const message = `current location: https://maps.google.com/?q=${location.coords.latitude},${location.coords.longitude}`;

    await sendSms(message, ["1234567890"]);
  } else {
    // todo : username
    const message = `Dora has sent an urgent alert through Beep. 
      Their location has been shared with you. 
      Please check on them by viewing their location:
      https://www.google.com/maps/dir/?api=1&destination=${destination.latitude},${destination.longitude}&travelmode=walking&dir_action=navigate`; //&dir_action=navigate can remove this
    //?saddr=${latitude},${longitude}&daddr=${destination.latitude},${destination.longitude}&directionsmode=walking&zoom=17`;

    await sendSms(message, ["1234567890"]);
  }
};

// import * as SMS from "expo-sms";
// import { Alert } from "react-native";

// // Define the Firebase-hosted page link to view live locations
// const FIREBASE_DYNAMIC_LINK = "https://beep-a485b/live-location.html?userId=";

// export const sendLocationSms = async (phoneNumber: string, userId: string, username: string = "User") => {
//   // Check if SMS is available on the device
//   const isAvailable = await SMS.isAvailableAsync();
//   if (!isAvailable) {
//     Alert.alert("SMS Not Available", "SMS functionality is not available on this device");
//     return;
//   }

//   const message = `${username} has shared their live location with you through Beep.
// View their location here: ${FIREBASE_DYNAMIC_LINK}${userId}`;

//   try {
//     const { result } = await SMS.sendSMSAsync([phoneNumber], message);
//     if (result === "sent") {
//       console.log("Message sent successfully");
//     } else {
//       console.log("Message not sent");
//     }
//   } catch (error) {
//     console.error("Error sending SMS:", error);
//   }
// };
