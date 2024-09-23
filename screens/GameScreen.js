import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import WordInput from './components/WordInput';
// import MathPuzzle from './components/MathPuzzle';

export default function App() {
  const [userWord, setUserWord] = useState('');
  const correctWord = 'matrix'; // Example correct word
  const mathQuestion = 'What is 2 + 2?'; // Example math question
  const mathAnswer = 4; // Example answer

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wordle Math Game</Text>
      <WordInput correctWord={correctWord} onWordChange={setUserWord} />
      <MathPuzzle question={mathQuestion} answer={mathAnswer} />
      <Text style={styles.result}>
        {userWord === correctWord ? "Correct!" : ""}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    color: 'green',
  },
});
