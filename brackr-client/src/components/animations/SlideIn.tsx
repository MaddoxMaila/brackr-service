import React, { useRef, useEffect } from 'react';
import { Animated, Text, View } from 'react-native';

interface SlideInProps {}

const SlideIn: React.FC<SlideInProps> = ({children}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 10000,
        useNativeDriver: false
    }
    ).start();
  }, [fadeAnim])

  return (
    <Animated.View                 // Special animatable View
      style={{
        opacity: fadeAnim,         // Bind opacity to animated value
      }}
    >
        {children}
    </Animated.View>
  );
}

export default SlideIn
