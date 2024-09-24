import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button } from 'react-native';
import Timer from './components/Timer'; // Import the Timer component
import WinnerScreen from './screens/WinnerScreen';
import levels from './data'; // Adjust the path as necessary


// Crossword words and hints (horizontal or vertical)
// const levels = [
//   {
//     words: [
//       { word: "gram", hint: "The original solar panel technology.", direction: "horizontal", start: [0, 0] },
//       { word: "gravity", hint: "What goes up must come down. Thanks, Newton!", direction: "vertical", start: [0, 5] },
//       { word: "atom", hint: "The building block of everything, even your snack.", direction: "horizontal", start: [2, 0] },
//       { word: "osmosis", hint: "The science of water being a little too clingy.", direction: "vertical", start: [1, 3] },
//       { word: "test", hint: "When water decides it's time for a solo flight.", direction: "vertical", start: [2, 4] },
//     ],
//   },
// ];

// Function to find the longest word length
const findLongestWordLength = (words) => {
  return Math.max(...words.map(wordObj => wordObj.word.length));
};

const App = () => {
  const [currentLevelIndex, updateCurrentLevelIndex] = useState(0)
  const [currentLevel, setCurrentLevel] = useState(levels[currentLevelIndex]);
  const [completedWords, setCompletedWords] = useState([]);
  const [matrixSize, setMatrixSize] = useState(findLongestWordLength(currentLevel.words) + 1);
  const [matrix, setMatrix] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [highlightedCells, setHighlightedCells] = useState(new Set());
  const [initialTime, setInitialTime] = useState(60); // Use state for timer value
  const [isWinner, setIsWinner] = useState(false);

  // Function to populate the letter matrix with words and random letters
  const createMatrix = () => {
    const grid = Array(matrixSize).fill(null).map(() => Array(matrixSize).fill(''));
    
    currentLevel.words.forEach(({ word, direction, start }) => {
      const [startRow, startCol] = start;
      let canPlaceWord = true;

      if (direction === "horizontal" && (startCol + word.length) <= matrixSize) {
        for (let i = 0; i < word.length; i++) {
          if (grid[startRow][startCol + i] !== '' && grid[startRow][startCol + i] !== word[i]) {
            canPlaceWord = false;
            break;
          }
        }
        if (canPlaceWord) {
          for (let i = 0; i < word.length; i++) {
            grid[startRow][startCol + i] = word[i];
          }
        }
      } else if (direction === "vertical" && (startRow + word.length) <= matrixSize) {
        for (let i = 0; i < word.length; i++) {
          if (grid[startRow + i][startCol] !== '' && grid[startRow + i][startCol] !== word[i]) {
            canPlaceWord = false;
            break;
          }
        }
        if (canPlaceWord) {
          for (let i = 0; i < word.length; i++) {
            grid[startRow + i][startCol] = word[i];
          }
        }
      }
    });

    for (let row = 0; row < matrixSize; row++) {
      for (let col = 0; col < matrixSize; col++) {
        if (grid[row][col] === '') {
          grid[row][col] = String.fromCharCode(97 + Math.floor(Math.random() * 26));
        }
      }
    }

    setMatrix(grid);
  };

  useEffect(() => {
    createMatrix();
  }, [currentLevel, matrixSize]);

  const resetGame = () => {
    // Reset the current level to the first one
    setCurrentLevel(levels[currentLevel]);
  
    // Reset the matrix size to its initial value
    setMatrixSize(matrixSize   + 1); // Adjust to the length of the first level
  
    // Reset the completed words array
    setCompletedWords([]);
  
    // Reset the highlighted cells
    setHighlightedCells(new Set());
  
    // Reset the user input
    setUserInput('');
  
    // Reset the timer to its initial value
    setInitialTime(10); // Reset to initial timer value (10 seconds or whatever your starting time is)
  
    // Recreate the letter matrix
    createMatrix();

    setIsWinner(false);
  };
  const nextLevel = () => {
    // Reset the current level to the first one
    
    
    setCurrentLevel(levels[currentLevel]);
  
    // Reset the matrix size to its initial value
    setMatrixSize(matrixSize   + 1); // Adjust to the length of the first level
  
    // Reset the completed words array
    setCompletedWords([]);
  
    // Reset the highlighted cells
    setHighlightedCells(new Set());
  
    // Reset the user input
    setUserInput('');
  
    // Reset the timer to its initial value
    setInitialTime(10); // Reset to initial timer value (10 seconds or whatever your starting time is)
  
    // Recreate the letter matrix
    createMatrix();

    setIsWinner(false);
  };
  
  // Create a function to handle the time-up scenario
  const handleTimeUp = () => {
    if (matrixSize >= 8) {
      alert('Game Over! You reached the maximum matrix size and lost the game.');
    } else {
      alert('Time is up! Try again!');
      resetGame();
    }
  };
  

  const handleLetterSelection = (letter) => {
    const formedWord = [...completedWords, letter].join('');
    checkSelectedWord(formedWord);
  };

  const checkSelectedWord = (formedWord) => {

    if(formedWord=='win'){
      setIsWinner(true)      
      console.log(isWinner)
    }
    const matchingWord = currentLevel.words.find(
      (wordObj) => wordObj.word === formedWord && !completedWords.includes(wordObj.word)
    );
    
    if (matchingWord) {
      setCompletedWords([...completedWords, matchingWord.word]);
      alert('Correct! You found: ' + matchingWord.word);
      highLightCorrectLetters(matchingWord);
  
      // Check for win condition
      if (completedWords.length + 1 === currentLevel.words.length) {
        setIsWinner(true);
      }
    }
  };
  

  const highLightCorrectLetters = ({ word, direction, start }) => {
    const [startRow, startCol] = start;
    const newHighlightedCells = new Set(highlightedCells);

    if (direction === "horizontal") {
      for (let i = 0; i < word.length; i++) {
        newHighlightedCells.add(`${startRow},${startCol + i}`);
      }
    } else if (direction === "vertical") {
      for (let i = 0; i < word.length; i++) {
        newHighlightedCells.add(`${startRow + i},${startCol}`);
      }
    }

    setHighlightedCells(newHighlightedCells);
  };

  const handleInputSubmit = () => {
    checkSelectedWord(userInput);
    setUserInput(''); // Clear the input after submission
  };

  return (
    <View style={styles.container}>
      {isWinner ? (
        <WinnerScreen onPlayAgain={nextLevel} />
      ) : (
        <>
          <Text style={styles.title}>Crossword Game</Text>
          <Timer onTimeUp={handleTimeUp} initialTime={initialTime} />
          <View style={styles.hintsContainer}>
            {currentLevel.words.map((wordObj, index) => (
              <Text key={index} style={styles.hintText}>
                {wordObj.hint} {completedWords.includes(wordObj.word) && '✔️'}
              </Text>
            ))}
          </View>
  
          <View style={styles.matrixContainer}>
            {matrix.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {row.map((letter, colIndex) => {
                  const cellKey = `${rowIndex},${colIndex}`;
                  const isHighlighted = highlightedCells.has(cellKey);
                  return (
                    <TouchableOpacity
                      key={colIndex}
                      style={[styles.letter, isHighlighted && styles.completedLetter]}
                      onPress={() => handleLetterSelection(letter)}
                    >
                      <Text style={styles.letterText}>{letter}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}
          </View>
  
          <TextInput
            style={styles.input}
            value={userInput}
            onChangeText={setUserInput}
            placeholder="Type your guess here"
          />
          <Button title="Submit" onPress={handleInputSubmit} />
        </>
      )}
    </View>
  );  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  hintsContainer: {
    marginVertical: 20,
  },
  hintText: {
    fontSize: 16,
    marginBottom: 10,
  },
  matrixContainer: {
    borderWidth: 2,
    borderColor: '#ddd',
    padding: 10,
    marginTop: 20,
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
    fontSize: 18,
    fontWeight: 'bold',
  },
  completedLetter: {
    backgroundColor: '#a0e0a0',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 20,
    width: '80%',
    padding: 10,
  },
});

export default App;
