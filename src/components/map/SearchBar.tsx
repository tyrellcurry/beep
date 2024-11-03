import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { GooglePlaceDetail, GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { GOOGLE_API_KEY } from "@/environments";

type SearchBarProps = {
    placeholder?: string;
    onPlaceSelected: (details: GooglePlaceDetail | null) => void;
    clearDestination: () => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, onPlaceSelected, clearDestination }) => {
    const [inputText, setInputText] = useState('');
    const autocompleteRef = useRef<any>(null);

    const handleClearInput = () => {
        setInputText('');
        autocompleteRef.current?.setAddressText('');
        clearDestination();
    };

    return (
        <View style={styles.autocompleteContainer}>
            <GooglePlacesAutocomplete
                ref={autocompleteRef}
                styles={{
                    textInput: styles.input,
                    container: styles.inputContainer,
                }}
                placeholder={placeholder || 'Search Maps'}
                fetchDetails
                textInputProps={{
                    value: inputText,
                    onChangeText: (text) => setInputText(text),
                }}
                onPress={(data, details = null) => {
                    onPlaceSelected(details);
                    setInputText(details?.name || '');
                }}
                query={{
                    key: GOOGLE_API_KEY,
                    language: 'pt-BR',
                }}
            />
            {inputText.length > 0 && (
                <TouchableOpacity onPress={handleClearInput} style={styles.clearIcon}>
                    <EvilIcons name="close" size={24} color="black" />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    autocompleteContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
    inputContainer: {
        flex: 1,
        paddingRight: 30,
    },
    input: {
        flex: 1,
        fontSize: 16,
        height: 40,
        backgroundColor: 'transparent',
        textAlignVertical: 'center',
        marginTop: 4,
    },
    clearIcon: {
        position: 'absolute',
        right: 10,
        top: 8,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
});

export default SearchBar;
