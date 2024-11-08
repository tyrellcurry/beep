import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Audio, InterruptionModeIOS, InterruptionModeAndroid } from "expo-av";
import { sendLocationSms } from "@/src/components/sendLocationSms";

export default function EmergencyScreen() {
  const router = useRouter();
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const smsTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const initializeSound = async () => {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: InterruptionModeIOS.DoNotMix,
        playsInSilentModeIOS: true,
        interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
        playThroughEarpieceAndroid: false,
        shouldDuckAndroid: true,
        staysActiveInBackground: true,
      });

      const { sound } = await Audio.Sound.createAsync(require("../../assets/police.wav"));
      await sound.setIsLoopingAsync(true);
      setSound(sound);
      await sound.playAsync();

      // Set up the 2-minute timer to send SMS
      smsTimerRef.current = setTimeout(() => {
        sendLocationSms();
      }, 60 * 1000);
    };

    initializeSound();

    return () => {
      if (sound) {
        sound.stopAsync().then(() => sound.unloadAsync());
      }
      if (smsTimerRef.current) {
        clearTimeout(smsTimerRef.current);
      }
    };
  }, []);

  const stopSound = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
    }
    if (smsTimerRef.current) {
      clearTimeout(smsTimerRef.current);
    }
  };

  const notifyContactsImmediately = () => {
    sendLocationSms();
    if (smsTimerRef.current) {
      clearTimeout(smsTimerRef.current);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.alarmText}>Alarm Activated</Text>
        <Text style={styles.alarmSubText}>Loud alarm triggered</Text>
        <Text style={styles.alarmSubText}>Contact emergency contacts if needed</Text>
      </View>

      <View style={styles.sosWrapper}>
        <TouchableOpacity style={styles.sosButton}>
          <Text style={styles.sosText}>SOS</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={async () => {
            await stopSound();
            router.push("/(tabs)/Emergency");
          }}
        >
          <Text style={styles.cancelText}>Cancel SOS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.notifyButton} onPress={notifyContactsImmediately}>
          <Text style={styles.notifyText}>Notify Contacts</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7185B",
    paddingHorizontal: 20,
  },
  topContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 50,
  },
  alarmText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  alarmSubText: {
    color: "#FFFFFF",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 2,
  },
  sosWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sosButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 50,
  },
  sosText: {
    color: "#FF5975",
    fontSize: 40,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  cancelButton: {
    backgroundColor: "transparent",
    borderColor: "#FFFFFF",
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  notifyButton: {
    backgroundColor: "#000000",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  cancelText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  notifyText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});
