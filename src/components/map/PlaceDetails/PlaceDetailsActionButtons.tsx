import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet, Platform } from 'react-native';
import { LatLng } from 'react-native-maps';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
import { NativeViewGestureHandler } from 'react-native-gesture-handler';

type PlaceDetailsActionButtonsProps = {
    onTraceRoute: () => void;

};

const PlaceDetailsActionButtons: React.FC<PlaceDetailsActionButtonsProps> = ({ onTraceRoute }) => {
    return (
        <View style={styles.actionButtonsContainer}>
            <NativeViewGestureHandler disallowInterruption={true}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.PlaceDetailsctionButtonsContent} >
                    <TouchableOpacity style={styles.actionButton} onPress={onTraceRoute}>
                        <Ionicons name="navigate" size={20} color="#FFF" />
                        <Text style={styles.actionButtonText}>Directions</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                        <MaterialIcons name="web" size={20} color="#FFF" />
                        <Text style={styles.actionButtonText}>Website</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
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
