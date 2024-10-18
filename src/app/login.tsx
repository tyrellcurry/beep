import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Login = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Page</Text>
      {/* Add mock login form here */}
      <Button title="Go Back" onPress={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default Login;
