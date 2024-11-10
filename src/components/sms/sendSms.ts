import * as SMS from "expo-sms";

export const sendSms = async (message: string, phoneNumbers: string[]): Promise<void> => {
  const isAvailable = await SMS.isAvailableAsync();
  if (isAvailable) {
    const { result } = await SMS.sendSMSAsync(phoneNumbers, message);
    if (result === "sent") {
      console.log("Message sent successfully");
    } else {
      console.log("Message not sent");
    }
  } else {
    alert("SMS is not available on this device.");
  }
};
