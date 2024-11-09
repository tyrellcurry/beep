import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Audio, InterruptionModeIOS, InterruptionModeAndroid } from "expo-av";
import { sendLocationSms } from "@/src/components/sendLocationSms";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

export default function EmergencyScreen() {
  const router = useRouter();
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(true); // Controls the countdown

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
    };

    initializeSound();

    return () => {
      if (sound) {
        sound.stopAsync().then(() => sound.unloadAsync());
      }
    };
  }, []);

  const stopSound = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
    }
  };

  const sendSmsImmediately = async () => {
    setIsPlaying(false);
    await sendLocationSms();
  };

  const handleCancelSOS = async () => {
    setIsPlaying(false);
    await stopSound();
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.alarmText}>Alarm Activated</Text>
        <Text style={styles.alarmSubText}>Loud alarm triggered</Text>
      </View>

      <View style={styles.sosWrapper}>
        <View style={styles.sosButton}>
          <CountdownCircleTimer
            isPlaying={isPlaying}
            duration={15}
            colors={["#651fd7", "#f7185b", "#A30000"]}
            colorsTime={[7, 5, 0]}
            onComplete={() => {
              sendLocationSms();
              return { shouldRepeat: false };
            }}
          >
            {({ remainingTime }) => <Text style={styles.sosText}>{remainingTime}</Text>}
          </CountdownCircleTimer>
        </View>
        <Text style={styles.sosButtonText}>SOS Timer</Text>
        <Text style={styles.sosButtonSubText}>
          In <Text style={styles.boldText}>15 seconds</Text>,, an SOS Message with your live location will be sent to your selected emergency contacts. Tap the button below to cancel if you're safe.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancelSOS}>
          <Text style={styles.cancelText}>Cancel SOS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.notifyButton} onPress={sendSmsImmediately}>
          <Text style={styles.notifyText}>Send SMS Now</Text>
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
    marginTop: 100,
  },
  alarmText: {
    color: "#FFFFFF",
    fontSize: 26,
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
    top: 60,
    alignItems: "center",
  },
  sosButtonText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 30,
  },
  sosButtonSubText: {
    color: "#cccccc",
    fontSize: 13,
    textAlign: "center",
    marginBottom: 2,
    padding: 10,
  },
  boldText: {
    fontWeight: "bold",
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
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  notifyButton: {
    backgroundColor: "#000000",
    borderRadius: 30,
    paddingVertical: 15,
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
