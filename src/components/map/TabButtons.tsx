// components/TabButtons.tsx
import React from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Platform } from "react-native";

type TabButtonsProps = {
    onTabPress: (label: string) => void;
};

const tabLabels = ['Open Now', 'Nearby', 'Safe Zones', 'Public Service'];

const TabButtons: React.FC<TabButtonsProps> = ({ onTabPress }) => {
    return (
        <View style={styles.tabButtonsContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabButtonsContent}>
                {tabLabels.map((label) => (
                    <TouchableOpacity key={label} style={styles.tabButton} onPress={() => onTabPress(label)}>
                        <Text style={styles.tabButtonText}>{label}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    tabButtonsContainer: {
        position: 'absolute',
        top: Platform.OS === "ios" ? "10%" : "14%",
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '100%',
        left: Platform.OS === "ios" ? "3%" : 0,
        height: 40,
    },
    tabButtonsContent: {
        paddingLeft: 20,
        alignItems: 'center',
    },
    tabButton: {
        backgroundColor: '#141216',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 24,
        marginRight: 10,
        height: 30,
    },
    tabButtonText: {
        color: '#fff',
        fontSize: 14,
    },
});

export default TabButtons;
