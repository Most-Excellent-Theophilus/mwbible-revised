import React, { ReactNode, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from '@/constants/Colors';


const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const SlideInView = ({ visible, direction = 'bottom', contWidth, children }:{visible: boolean, direction: string,contWidth:any , children:ReactNode}) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const colorScheme = useColorScheme();

  const themeColors = colorScheme === "dark" ? Colors.dark : Colors.light;

  useEffect(() => {
    if (direction === 'left') {
      translateX.value = visible ? withTiming(0, { duration: 200 }) : withTiming(-SCREEN_WIDTH, { duration: 500 });
    } else if (direction === 'right') {
      translateX.value = visible ? withTiming(0, { duration: 200 }) : withTiming(SCREEN_WIDTH, { duration: 500 });
    } else if (direction === 'top') {
      translateY.value = visible ? withTiming(0, { duration: 200 }) : withTiming(-SCREEN_HEIGHT, { duration: 500 });
    } else if (direction === 'bottom') {
      translateY.value = visible ? withTiming(0, { duration: 200 }) : withTiming(SCREEN_HEIGHT, { duration: 500 });
    }
  }, [visible, direction, translateX, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  return (
    <Animated.View style={[styles.container, {backgroundColor: themeColors.background,   shadowColor: themeColors.icon,  width: contWidth,}, animatedStyle]}>
      {children}
    </Animated.View>
  );
};



const styles = StyleSheet.create({
  container: {
    
    position: 'absolute',
   
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    alignSelf:'flex-end'
  },
});
export default SlideInView;