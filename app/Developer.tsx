import { HelloWave } from "@/components/HelloWave";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { Image, StyleSheet } from "react-native";

const Developer = () => {
  const colorScheme = useColorScheme();
  const themeColors = colorScheme === "dark" ? Colors.dark : Colors.light;

  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        light: themeColors.background2,
        dark: themeColors.icon,
      }}
      headerImage={
        <>
          <Image
            source={require("../assets/images/samuel.png")}
            style={styles.headerImage}
          />
          <ThemedView style={{ ...styles.titleContainer, padding: 10 }}>
            <ThemedText type="title" style={{ color: themeColors.icon, }}>
              Samuel Mkamanga
            </ThemedText>
          </ThemedView>
        </>
      }
    >
      <ThemedView style={{ flexDirection: "row" }}>
        <ThemedText
          type="subtitle"
          style={{ letterSpacing: 0.5, color: themeColors.icon,  }}
        >
          Hello !
        </ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView>
        <ThemedText style={{opacity:0.7 }}>
          I am a Software Developer from Blantyre, Malawi, with a passion to
          Develop a Bible App that has all Native Malawian Languages, So i
          embarked on this Project Called "Malawian Bibles".
        </ThemedText>
      </ThemedView>
      <ThemedView style={{ flexDirection: "row" }}>
        <ThemedText
          type="subtitle"
          style={{ letterSpacing: 0.5, color: themeColors.icon, opacity:0.7  }}
        >
          Contacts
        </ThemedText>
      </ThemedView>
      <ThemedView style={{ flexDirection: "row" }}>
        <ThemedText
          style={{ letterSpacing: 0.5,color: themeColors.icon }}
        >
          Contacts
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",

    bottom: 0,
    right: 0,
    width: 300,
    height: "100%",
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

export default Developer;
