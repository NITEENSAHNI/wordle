import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const WinnerScreen = ({ onPlayAgain }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Congratulations!</Text>
      <Text style={styles.message}>You've found all the words!</Text>
      <Button title="Play Again" onPress={onPlayAgain} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0ffe0',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 18,
    marginVertical: 20,
  },
});

export default WinnerScreen