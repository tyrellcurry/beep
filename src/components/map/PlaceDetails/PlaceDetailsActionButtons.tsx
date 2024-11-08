import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Linking } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
import { NativeViewGestureHandler } from 'react-native-gesture-handler';

type PlaceDetailsActionButtonsProps = {
    onTraceRoute: () => void;
    phoneNumber?: string;
    website?: string;
};

const PlaceDetailsActionButtons: React.FC<PlaceDetailsActionButtonsProps> = ({ onTraceRoute, phoneNumber, website }) => {

    const handleCallPress = () => {
        if (phoneNumber) {
            const phoneUrl = `tel:${phoneNumber}`;
            Linking.openURL(phoneUrl).catch((err) => console.error('Error opening phone URL:', err));
        } else {
            console.warn('No phone number available');
        }
    };

    const handleWebsiteLink = () => {
        if (website) {
            Linking.openURL(website).catch((err) => console.error('Error opening website URL:', err));
        } else {
            console.warn('No website URL available');
        }
    }

    return (
        <View style={styles.actionButtonsContainer}>
            <NativeViewGestureHandler disallowInterruption={true}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.PlaceDetailsctionButtonsContent} >

                    <TouchableOpacity style={styles.actionButton} onPress={onTraceRoute}>
                        <Ionicons name="navigate" size={20} color="#FFF" />
                        <Text style={styles.actionButtonText}>Directions</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionButton} onPress={handleWebsiteLink}>
                        <MaterialIcons name="web" size={20} color="#FFF" />
                        <Text style={styles.actionButtonText}>Website</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionButton} onPress={handleCallPress}>
                        <Ionicons name="call" size={20} color="#FFF" />
                        <Text style={styles.actionButtonText}>Call</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionButton}>
                        <Ionicons name="share-social" size={20} color="#FFF" />
                        <Text style={styles.actionButtonText}>Share</Text>
                    </TouchableOpacity>

                </ScrollView>

            </NativeViewGestureHandler>
        </View>

    );
};

const styles = StyleSheet.create({
    actionButtonsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 16,
    },
    actionButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#6200EE",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 24,
        marginRight: 5,
    },
    actionButtonText: {
        color: "#FFF",
        fontSize: 14,
        marginLeft: 8,
    },
    PlaceDetailsctionButtonsContent: {
        alignItems: 'center',
    }
});

export default PlaceDetailsActionButtons;
