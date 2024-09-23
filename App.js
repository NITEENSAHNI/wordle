import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Matrix from './components/Matrix'; // Correctly importing default export

export default function App() {
  const words = ['matrix', 'react', 'guess']; // List of words to guess
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const correctWord = words[currentWordIndex];

  const handleWordSubmit = () => {
    if (userInput === correctWord) {
      alert('Correct! The word was: ' + correctWord);
      setUserInput(''); // Reset the user input
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length); // Move to the next word
    } else {
      alert('Try again!');
      setUserInput(''); // Reset if incorrect
    }
  };

  // Function to update the user input based on letter selection in Matrix
  const handleLetterSelection = (selectedLetters) => {
    setUserInput(selectedLetters.join('')); // Update userInput with selected letters
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wordle Math Game</Text>
      <Matrix 
        correctWord={correctWord} 
        onWordSubmit={handleWordSubmit} 
        onLetterSelection={handleLetterSelection} // Pass the update function
      />
      <Text style={styles.hint}>Current word test: {correctWord}</Text>
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
  hint: {
    marginTop: 20,
    fontSize: 16,
  },
});
