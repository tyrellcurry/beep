import * as Location from "expo-location";
import { Alert } from "react-native";
import { sendSms } from "@/src/components/sendSms";

export const sendLocationSms = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    Alert.alert("Permission Denied", "Permission to access location was denied");
    return;
  }

  const location = await Location.getCurrentPositionAsync({});
  // todo : username
  const message = `Dora has sent an urgent alert through Beep. 
    Their location has been shared with you. 
    Please check on them by viewing their location: https://maps.google.com/?q=${location.coords.latitude},${location.coords.longitude}`;

  await sendSms(message, ["1234567890"]);
};
