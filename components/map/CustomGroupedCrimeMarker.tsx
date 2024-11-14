import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const CustomGroupedCrimeMarker = ({ size = 10, pointCount = 0 }) => (
  <View style={[styles.outerCircle, { width: size + 10, height: size + 10, borderRadius: (size + 10) / 2 }]}>
    <View style={[styles.innerCircle, { width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={{ ...styles.text, fontSize: size / 2 }}>{pointCount}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  outerCircle: {
    backgroundColor: 'rgba(247, 24, 91, 0.2)',
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  innerCircle: {
    backgroundColor: 'rgba(247, 24, 91, 0.8)',
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default CustomGroupedCrimeMarker;
