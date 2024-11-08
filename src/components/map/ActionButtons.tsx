import React, { useState } from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet, Platform } from 'react-native';
import { LatLng } from 'react-native-maps';

type ActionButtonsProps = {

    onCenterGPS: () => void;
    onCrimeDataToggle?: () => void;
    isCrimeDataVisible: boolean;
    onSOS: () => void;
};

const ActionButtons: React.FC<ActionButtonsProps> = ({ onCenterGPS, onCrimeDataToggle, isCrimeDataVisible, onSOS }) => {

    return (
        <View style={styles.actionButtonsContainer}>

            {/* Center GPS Button */}
            <TouchableOpacity style={styles.centerGPSButton} onPress={onCenterGPS}>
                <Image source={require("../../../assets/map/Black.png")} style={styles.iconImageSmall} />
            </TouchableOpacity>

            {/* Layer Toggle Button */}
            <TouchableOpacity style={styles.layerButton} onPress={onCrimeDataToggle}>
                <Image
                    source={
                        isCrimeDataVisible
                            ? require("../../../assets/map/ExclaimationMarkFilled.png")
                            : require("../../../assets/map/ExclaimationMark.png")
                    }
                    style={styles.iconImageSmall}
                />
            </TouchableOpacity>

            {/* SOS Button */}
            <TouchableOpacity style={styles.SOSButton} onPress={onSOS}>
                <Image source={require("../../../assets/map/SOSWhiteHollow.png")} style={styles.SOSiconImageSmall} />
                <Text style={styles.SOSText}>SOS</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    actionButtonsContainer: {
        position: "absolute",
        bottom: Platform.OS === "ios" ? 25 : 0,
        right: 0,
        alignItems: "center",
    },
    traceButton: {
        position: "absolute",
        bottom: 210,
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "#651FD7",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    centerGPSButton: {
        position: "absolute",
        bottom: 150,
        width: 50,
        height: 50,
        borderRadius: 30,
        backgroundColor: "#fff",
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
        bottom: 90,
        width: 50,
        height: 50,
        borderRadius: 30,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    SOSButton: {
        bottom: 90,
        right: 250,
        height: 52,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FF3B5F",
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
