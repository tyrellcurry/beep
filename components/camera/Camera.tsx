import React, { useState, useRef } from "react";
import { View, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { CameraView, CameraType } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import PhotoPreview from "./PhotoPreview";
import { doc, setDoc } from "firebase/firestore";
import { FIREBASE_DB } from "@/firebaseConfig";
import { useUser } from "../auth/userContext";

interface CameraComponentProps {
  onClose: () => void;
  onCapture: (photo: string) => void;
}

const CameraComponent: React.FC<CameraComponentProps> = ({ onClose, onCapture }) => {
  const [facing, setFacing] = useState<CameraType>("back");
  const [photo, setPhoto] = useState<string | null>(null);
  const cameraRef = useRef<CameraView>(null);
  const { user } = useUser();

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const takePhoto = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        if (photo && photo.uri) {
          setPhoto(photo.uri);
          onCapture(photo.uri);
          // await savePhoto(photo.uri);
        } else {
          console.log("Failed to capture photo: photo or photo.uri is undefined");
        }
      } catch (error) {
        console.error("Error taking photo:", error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {photo ? (
        <PhotoPreview photo={photo} onRetake={() => setPhoto(null)} />
      ) : (
        <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
          <View style={styles.bottomControls}>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={28} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.captureButton} onPress={takePhoto}>
              <View style={styles.captureButtonInner} />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleCameraFacing}>
              <Ionicons name="camera-reverse" size={36} color="white" />
            </TouchableOpacity>
          </View>
        </CameraView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  camera: {
    flex: 1,
  },
  bottomControls: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  captureButtonInner: {
    width: 65,
    height: 65,
    borderRadius: 35,
    backgroundColor: "white",
  },
});

export default CameraComponent;
