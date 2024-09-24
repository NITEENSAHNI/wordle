import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

const Timer = ({ initialTime, onTimeUp }) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    setTime(initialTime); // Reset timer when initialTime changes
  }, [initialTime]);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerId);
          onTimeUp(); // Trigger the callback when time is up
          return 0; // Prevent negative time
        }
        return prevTime - 1; // Decrease time
      });
    }, 1000);

    return () => clearInterval(timerId); // Cleanup on unmount
  }, [onTimeUp]); // Ensure onTimeUp is stable

  return (
    <View>
      <Text>Time Left: {time}s</Text>
    </View>
  );
};

export default Timer;
