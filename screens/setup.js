import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SetupScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Setup Screen</Text>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default SetupScreen;