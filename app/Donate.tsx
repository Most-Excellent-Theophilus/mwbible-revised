import { ThemedText } from "@/components/ThemedText"
import ParallaxScrollView from "@/components/ParallaxScrollView"
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { Image, StyleSheet } from "react-native"
import React from "react";
import { ThemedView } from "@/components/ThemedView";
const Donate = () => {
    const colorScheme = useColorScheme();
    const themeColors = colorScheme === "dark" ? Colors.dark : Colors.light;
  
      return <ParallaxScrollView
      headerBackgroundColor={{
        light: themeColors.background2,
        dark: themeColors.background,
      }}
      noPadding={true}
      headerImage={
        <>
        <Image
          source={require("../assets/images/splash.png")}
          style={styles.headerImage}
        />
        <ThemedView style={{ ...styles.titleContainer, padding: 10 }}>
        <ThemedText type="title" style={{ color: themeColors.icon }}>
              Donate/Support
          </ThemedText>
        </ThemedView>
      </>
      }
    >
     
    </ParallaxScrollView>
  }
  
  
  const styles = StyleSheet.create({
      headerImage: {
        color: "#808080",
        bottom: -70,
        right: -70,
        width: 310,
        position: "absolute",
      },
      titleContainer: {
        flexDirection: "row",
        margin: 6,
        borderRadius: 5,
        bottom: 2,
        position: "absolute",
      },
      drawerLink: { paddingLeft: 13, fontWeight: "bold" },
      drawerPressable: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 0.5,
        paddingBottom: 12,
      },
      buttonControls: {
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 8,
        marginHorizontal: 10,
      },
    });
    
export default Donate