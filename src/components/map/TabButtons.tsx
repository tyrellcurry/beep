// components/TabButtons.tsx
import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Platform } from "react-native";

type TabButtonsProps = {
    onTabPress: (label: string) => void;
};

const TabButtons: React.FC<TabButtonsProps> = ({ onTabPress }) => {
    const [activeTab, setActiveTab] = useState<string | null>(null);

    const handlePress = (label: string) => {
        setActiveTab(label);
        onTabPress(label);
        applyFilter(label);
    };

    const applyFilter = (label: string) => {
        switch (label) {
            case 'Open Now':
                handleOpenNowFilter();
                break;
            case 'Nearby':
                handleNearbyFilter();
                break;
            case 'Safe Zones':
                handleSafeZonesFilter();
                break;
            case 'Public Service':
                handlePublicServiceFilter();
                break;
            default:
                break;
        }
    };

    //TODO: handle OpenNow map filter
    const handleOpenNowFilter = () => { };

    //TODO: handle Nearby map filter
    const handleNearbyFilter = () => { };

    //TODO: handle Safe Zones map filter
    const handleSafeZonesFilter = () => { };

    //TODO: handle Public Service map filter
    const handlePublicServiceFilter = () => { };

    return (
        <View style={styles.tabButtonsContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabButtonsContent}>
                {['Open Now', 'Nearby', 'Safe Zones', 'Public Service'].map((label) => (
                    <TouchableOpacity
                        key={label}
                        style={[
                            styles.tabButton,
                            activeTab === label && styles.activeTabButton,
                        ]}
                        onPress={() => handlePress(label)}
                    >
                        <Text
                            style={[
                                styles.tabButtonText,
                                activeTab === label && styles.activeTabButtonText,
                            ]}
                        >
                            {label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    tabButtonsContainer: {
        position: 'absolute',
        top: Platform.OS === "ios" ? "10%" : 115,
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
    activeTabButton: {
        backgroundColor: 'purple',
    },
    activeTabButtonText: {
        color: '#fff',
    },
});

export default TabButtons;
