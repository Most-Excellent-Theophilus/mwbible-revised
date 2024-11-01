import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { Drawer } from "expo-router/drawer";
import { useColorScheme } from "@/hooks/useColorScheme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Colors } from "@/constants/Colors";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { ThemedText } from "@/components/ThemedText";
import { StyleSheet, Pressable, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ThemedView } from "@/components/ThemedView";
import { UserProvider } from "@/components/preference/UserContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  const themeColors = colorScheme === "dark" ? Colors.dark : Colors.light;
  return (
    <UserProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Drawer
            screenOptions={{
              headerStyle: {
                backgroundColor: themeColors.background,
                borderBottomWidth: 0.5
              },
              drawerStyle: {
                top: 40,
                backgroundColor: themeColors.background,
                borderRadius: 5,
              },
              headerTintColor: themeColors.tabIconDefault,
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerTitleContainerStyle: {
                margin: 0,
              },
              headerRightContainerStyle: {
                margin: 0,
              },
            }}
            
            drawerContent={() => (
              <ParallaxScrollView
                headerBackgroundColor={{ light: themeColors.icon, dark: themeColors.text }}
                headerImage={
                  <>
                    <Ionicons
                      size={310}
                      name="code-slash"
                      style={styles.headerImage}
                    />
                    <ThemedView style={styles.titleContainer}>
                      <ThemedText type="title">Malawian Bibles</ThemedText>
                    </ThemedView>
                  </>
                }
              >
                <Link href="/" asChild>
                  <Pressable
                    style={{
                      ...styles.drawerPressable,
                      borderBottomColor: themeColors.icon,
                    }}
                  >
                    <TabBarIcon
                      name="book"
                      size={20}
                      color={themeColors.icon}
                    />
                    <ThemedText
                      style={{ ...styles.drawerLink, color: themeColors.text }}
                    >
                      Bible
                    </ThemedText>
                  </Pressable>
                </Link>
                <Link href="./Favorites" asChild>
                  <Pressable
                    style={{
                      ...styles.drawerPressable,
                      borderBottomColor: themeColors.icon,
                    }}
                  >
                    <TabBarIcon
                      name="heart"
                      size={20}
                      color={themeColors.icon}
                    />
                    <ThemedText
                      style={{ ...styles.drawerLink, color: themeColors.text }}
                    >
                      Favorites
                    </ThemedText>
                  </Pressable>
                </Link>
                <Link href="./ReadingPlans" asChild>
                  <Pressable
                    style={{
                      ...styles.drawerPressable,
                      borderBottomColor: themeColors.icon,
                    }}
                  >
                    <TabBarIcon
                      name="calendar"
                      size={20}
                      color={themeColors.icon}
                    />
                    <ThemedText
                      style={{ ...styles.drawerLink, color: themeColors.text }}
                    >
                      Reading Plans
                    </ThemedText>
                  </Pressable>
                </Link>
                <Link href="./Notes" asChild>
                  <Pressable
                    style={{
                      ...styles.drawerPressable,
                      borderBottomColor: themeColors.icon,
                    }}
                  >
                    <TabBarIcon
                      name="document-text"
                      size={20}
                      color={themeColors.icon}
                    />
                    <ThemedText
                      style={{ ...styles.drawerLink, color: themeColors.text }}
                    >
                      Notes
                    </ThemedText>
                  </Pressable>
                </Link>
                <Link href="./TodaysVerse" asChild>
                  <Pressable
                    style={{
                      ...styles.drawerPressable,
                      borderBottomColor: themeColors.icon,
                    }}
                  >
                    <TabBarIcon
                      name="today"
                      size={20}
                      color={themeColors.icon}
                    />
                    <ThemedText
                      style={{ ...styles.drawerLink, color: themeColors.text }}
                    >
                      Todays Verse
                    </ThemedText>
                  </Pressable>
                </Link>
                <Link href="./Donate" asChild>
                  <Pressable
                    style={{
                      ...styles.drawerPressable,
                      borderBottomColor: themeColors.icon,
                    }}
                  >
                    <TabBarIcon
                      name="gift"
                      size={20}
                      color={themeColors.icon}
                    />
                    <ThemedText
                      style={{ ...styles.drawerLink, color: themeColors.text }}
                    >
                      Support\Donate
                    </ThemedText>
                  </Pressable>
                </Link>
                <Link href="./ShareApp" asChild>
                  <Pressable
                    style={{
                      ...styles.drawerPressable,
                      borderBottomColor: themeColors.icon,
                    }}
                  >
                    <TabBarIcon
                      name="share-social"
                      size={20}
                      color={themeColors.icon}
                    />
                    <ThemedText
                      style={{ ...styles.drawerLink, color: themeColors.text }}
                    >
                      Share App
                    </ThemedText>
                  </Pressable>
                </Link>
                <Link href="./Settings" asChild>
                  <Pressable
                    style={{
                      ...styles.drawerPressable,
                      borderBottomColor: themeColors.icon,
                    }}
                  >
                    <TabBarIcon
                      name="settings"
                      size={20}
                      color={themeColors.icon}
                    />
                    <ThemedText
                      style={{ ...styles.drawerLink, color: themeColors.text }}
                    >
                      Settings
                    </ThemedText>
                  </Pressable>
                </Link>
              </ParallaxScrollView>
            )}
          >
            <Drawer.Screen
              name="index"
              options={{
                // headerTitle: ()=> null,
                headerTitle: () => (
                  <ThemedView
                    style={{ flexDirection: "row", alignItems: "center" }}
                  >
                    <TouchableOpacity
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <ThemedText
                        type="subtitle"
                        style={{ color: themeColors.tabIconDefault }}
                      >
                        Chichewa
                      </ThemedText>
                    
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginLeft: 40,
                        borderColor: themeColors.icon,
                        borderWidth: 0.5,
                        paddingHorizontal: 15,
                        paddingVertical: 3,
                        borderRadius: 3,
                      }}
                    >
                      <TabBarIcon
                        name="language"
                        size={22}
                        color={themeColors.icon}
                      />
                    </TouchableOpacity>
                  </ThemedView>
                ),

                headerRight: () => (
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingRight: 20,
                    }}
                  >
                    <ThemedText>
                      <TabBarIcon
                        size={25}
                        name="search"
                        color={themeColors.icon}
                      />
                    </ThemedText>
                  </TouchableOpacity>
                ),
              }}
            />
            <Drawer.Screen
              name="ReadingPlans"
              options={{
                title: "Reading Plans",
              }}
            />
            <Drawer.Screen
              name="Favorites"
              options={{
                title: "Favorites",
              }}
            />
            <Drawer.Screen
              name="TodaysVerse"
              options={{
                title: "Todays Verse",
              }}
            />
            <Drawer.Screen
              name="Notes"
              options={{
                title: "Notes",
              }}
            />
            <Drawer.Screen
              name="Donate"
              options={{
                title: "Donate",
              }}
            />
            <Drawer.Screen
              name="ShareApp"
              options={{
                title: "Share App",
              }}
            />
            <Drawer.Screen
              name="Settings"
              options={{
                title: "Settings",
              }}
            />
          </Drawer>
        </GestureHandlerRootView>
      </ThemeProvider>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    opacity: 0.7,

    bottom: 2,
    position: "absolute",
    padding: 7,
    gap: 8,
  },
  drawerLink: { paddingLeft: 13, fontWeight: "bold" },
  drawerPressable: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
    paddingBottom: 12,
  },
});
