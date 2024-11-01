import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Dimensions } from "react-native";

const SkeletonBox = ({ width, height }: { width: any; height: any }) => {
  const themeColors = useColorScheme() === "dark" ? Colors.dark : Colors.light;
  const shimmerAnim = useRef(new Animated.Value(-1)).current;
  const screenWidth = Dimensions.get("window").width;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();
  }, [shimmerAnim]);

  const shimmerTranslate = shimmerAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: [-screenWidth, screenWidth],
  });

  return (
    <View
      style={[
        styles.skeleton,
        { width, height },
        { backgroundColor: themeColors.icon },
      ]}
    >
      <Animated.View
        style={[
          styles.shimmer,
          { backgroundColor: themeColors.text},
          { transform: [{ translateX: shimmerTranslate }] },
        ]}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  skeleton: {
    overflow: "hidden",
    borderRadius: 4,
    marginBottom: 10,
    opacity: 0.4,

  },
  shimmer: {
    width: "100%",
    borderRadius: 4,

    height: "100%",
    position: "absolute",
    opacity: 0.4,
  },
});



export default SkeletonBox;
