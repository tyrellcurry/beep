import React from 'react';
import { View, StyleSheet } from 'react-native';

const CustomCrimeMarker = ({ size = 10 }) => (
  <View style={[styles.innerCircle, { width: size, height: size, borderRadius: size / 2 }]} />
);

const styles = StyleSheet.create({
  innerCircle: {
    backgroundColor: '#F7185B',
    borderWidth: 0.5,
  },
});

export default CustomCrimeMarker;