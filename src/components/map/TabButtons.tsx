// components/TabButtons.tsx
import React from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';

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
        top: 100,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '100%',
        marginTop: -30,
        height: 40,
    },
    tabButtonsContent: {
        paddingLeft: 20,
        alignItems: 'center',
    },
    tabButton: {
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 24,
        marginRight: 10,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        height: 30,
    },
    tabButtonText: {
        color: '#000',
        fontSize: 14,
    },
});

export default TabButtons;
