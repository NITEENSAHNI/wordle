import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
const letters = [
  ['q', 'w', 'e', 'r', 't', 'y'],
  ['u', 'i', 'o', 'p', 'a', 's'],
  ['d', 'f', 'g', 'h', 'j', 'k'],
  ['l', 'z', 'x', 'c', 'v', 'b'],
];

const Matrix = ({ correctWord, onWordSubmit, onLetterSelection }) => {
  const [selectedLetters, setSelectedLetters] = useState([]);

  const handleLetterPress = (letter) => {
    if (selectedLetters.length < correctWord.length) {
      const updatedLetters = [...selectedLetters, letter];
      setSelectedLetters(updatedLetters);
      onLetterSelection(updatedLetters); // Update userInput in parent component
    }
  };

  const checkWord = () => {
    const formedWord = selectedLetters.join('');
    if (formedWord === correctWord) {
      onWordSubmit();
    } else {
      alert('Try again!');
    }
    setSelectedLetters([]); // Clear the selection after check
  };

  return (
    <View style={styles.matrixContainer}>
      {letters.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((letter, colIndex) => (
            <TouchableOpacity
              key={colIndex}
              style={[
                styles.letter,
                selectedLetters.includes(letter) && styles.selected,
              ]}
              onPress={() => handleLetterPress(letter)}
            >
              <Text style={styles.letterText}>{letter}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}

      {/* Display the selected letters here */}
      <Text style={styles.selectedLettersText}>
        Selected letters: {selectedLetters.join('')}
      </Text>

      <TouchableOpacity onPress={checkWord} style={styles.submitButton}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  matrixContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  letter: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    margin: 2,
  },
  letterText: {
    fontSize: 20,
  },
  selected: {
    backgroundColor: '#a0d8ef',
  },
  selectedLettersText: {
    fontSize: 18,
    marginTop: 10,
    color: '#333',
  },
  submitButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Matrix;
