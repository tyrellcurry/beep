import React, { useState } from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet, Platform } from "react-native";
import { LatLng } from "react-native-maps";

type ActionButtonsProps = {
  onCenterGPS: () => void;
  onCrimeDataToggle?: () => void;
  isCrimeDataVisible: boolean;
  onSOS: () => void;
};

const ActionButtons: React.FC<ActionButtonsProps> = ({ onCenterGPS, onCrimeDataToggle, isCrimeDataVisible, onSOS }) => {
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  const handleButtonPress = () => {
    setIsButtonPressed(!isButtonPressed);
    if (onCrimeDataToggle) onCrimeDataToggle(); 
  };

  return (
    <View style={styles.actionButtonsContainer}>
      {/* Center GPS Button */}
      <TouchableOpacity style={styles.centerGPSButton} onPress={onCenterGPS}>
        <Image source={require("../../assets/icons/GPSWhite.png")} style={styles.iconImageSmall} />
      </TouchableOpacity>

      {/* Crime Heatmap Layer Toggle Button */}
      <TouchableOpacity
        style={[
          styles.layerButton,
          { backgroundColor: isButtonPressed ? 'rgba(29, 27, 30, 0.9)' : '#651FD7' },
        ]}
        onPress={handleButtonPress}
      >
        <Image
          source={
            isCrimeDataVisible
              ? require("../../assets/icons/ExclaimationMarkWhite.png")
              : require("../../assets/icons/ExclaimationMarkWhiteFilled.png")
          }
          style={styles.iconImageSmall}
        />
      </TouchableOpacity>

      {/* SOS Button */}
      <TouchableOpacity style={styles.SOSButton} onPress={onSOS}>
        <Image source={require("../../assets/icons/SOSWhiteHollow.png")} style={styles.SOSiconImageSmall} />
        <Text style={styles.SOSText}>SOS</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  actionButtonsContainer: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? "9.5%" : 60,
    right: "5%",
    left: "5%",
    alignItems: "center",
  },
  centerGPSButton: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 20 : 22,
    right: Platform.OS === "ios" ? 0 : 0,
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: "rgba(29, 27, 30, 0.9)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  layerButton: {
    position: "absolute",
    bottom: 80,
    right: 0,
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: "rgba(29, 27, 30, 0.9) ",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  SOSButton: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 20 : 22,
    left: 0,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F7185B",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  SOSText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "900",
  },
  iconImage: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  iconImageSmall: {
    width: 26,
    height: 26,
    resizeMode: "contain",
  },
  SOSiconImageSmall: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
});

export default ActionButtons;
