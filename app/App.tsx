import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { Drawer } from "expo-router/drawer";
import { useColorScheme } from "@/hooks/useColorScheme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Colors } from "@/constants/Colors";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { ThemedText } from "@/components/ThemedText";
import { StyleSheet, Pressable, TouchableOpacity, Image } from "react-native";
import { Link } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { useGlobalContext } from "@/context/GlobalContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { language, setLanguage } = useGlobalContext();
  const [languageSelection, openLanguageSelection] = useState(false);
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const handleLanguageSlection = () => {
    languageSelection
      ? openLanguageSelection(false)
      : openLanguageSelection(true);
  };

  const setLanguageFromSelection = (lang: string) => {
    setLanguage(lang);
    handleLanguageSlection();
  };
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const LeftHeaderArrow = () => (
    <Link href="/" asChild>
      <TouchableOpacity
        style={{
          ...styles.LeftHeaderArrow,
        }}
      >
        <TabBarIcon name="chevron-back" size={30} color={themeColors.icon} />
      </TouchableOpacity>
    </Link>
  );

  const themeColors = colorScheme === "dark" ? Colors.dark : Colors.light;
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer
          screenOptions={{
            headerStyle: {
              backgroundColor: themeColors.background,
              borderBottomWidth: 0.5,
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
              headerBackgroundColor={{
                light: themeColors.background2,
                dark: themeColors.background2,
              }}
              headerImage={
                <>
                  <Image
                    source={require("../assets/images/favicon.png")}
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
                  <TabBarIcon name="book" size={20} color={themeColors.icon} />
                  <ThemedText
                    style={{ ...styles.drawerLink, color: themeColors.icon }}
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
                  <TabBarIcon name="heart" size={20} color={themeColors.icon} />
                  <ThemedText
                    style={{ ...styles.drawerLink, color: themeColors.icon }}
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
                    style={{ ...styles.drawerLink, color: themeColors.icon }}
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
                    style={{ ...styles.drawerLink, color: themeColors.icon }}
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
                  <TabBarIcon name="today" size={20} color={themeColors.icon} />
                  <ThemedText
                    style={{ ...styles.drawerLink, color: themeColors.icon }}
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
                  <TabBarIcon name="gift" size={20} color={themeColors.icon} />
                  <ThemedText
                    style={{ ...styles.drawerLink, color: themeColors.icon }}
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
                    style={{ ...styles.drawerLink, color: themeColors.icon }}
                  >
                    Share App
                  </ThemedText>
                </Pressable>
              </Link>
              <Link href="./Developer" asChild>
                <Pressable
                  style={{
                    ...styles.drawerPressable,
                    borderBottomColor: themeColors.icon,
                  }}
                >
                  <TabBarIcon
                    name="code-slash"
                    size={20}
                    color={themeColors.icon}
                  />
                  <ThemedText
                    style={{ ...styles.drawerLink, color: themeColors.icon }}
                  >
                    About Developer
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
                    style={{ ...styles.drawerLink, color: themeColors.icon }}
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
                <>
                  {languageSelection && (
                    <ThemedView
                      style={{
                        position: "absolute",
                        bottom: -130,
                        zIndex: 1,
                        backgroundColor: themeColors.tabIconDefault,
                        padding: 10,
                        borderRadius: 4,
                      }}
                    >
                      <TouchableOpacity
                        style={{ paddingRight: 40, paddingVertical: 7 }}
                        onPress={() => {
                          setLanguageFromSelection("Ch");
                        }}
                      >
                        <ThemedText
                          style={{
                            color: themeColors.background,
                            borderBottomWidth: 0.5,
                            borderBottomColor: themeColors.background2,
                          }}
                        >
                          {" "}
                          Chichewa
                        </ThemedText>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{ paddingRight: 40, paddingVertical: 7 }}
                        onPress={() => {
                          setLanguageFromSelection("En");
                        }}
                      >
                        <ThemedText
                          style={{
                            color: themeColors.background,
                            borderBottomWidth: 0.5,
                            borderBottomColor: themeColors.background2,
                          }}
                        >
                          {" "}
                          English
                        </ThemedText>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{ paddingRight: 40, paddingVertical: 7 }}
                        onPress={() => {
                          setLanguageFromSelection("Se");
                        }}
                      >
                        <ThemedText
                          style={{
                            color: themeColors.background,
                            borderBottomWidth: 0.5,
                            borderBottomColor: themeColors.background2,
                          }}
                        >
                          {" "}
                          Sena
                        </ThemedText>
                      </TouchableOpacity>
                    </ThemedView>
                  )}
                  <ThemedView
                    style={{ flexDirection: "row", alignItems: "center" }}
                  >
                    <TouchableOpacity
                      style={{ flexDirection: "row", alignItems: "center" }}
                      onPress={() => {
                        handleLanguageSlection();

                        console.log("clicked");
                      }}
                    >
                      <ThemedText
                        type="subtitle"
                        style={{ color: themeColors.tabIconDefault }}
                      >
                        {language == "Ch"
                          ? "Chichewa"
                          : language == "En"
                          ? "English"
                          : "Sena"}
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
                      onPress={() => handleLanguageSlection()}
                    >
                      <TabBarIcon
                        name="language"
                        size={22}
                        color={themeColors.icon}
                      />
                    </TouchableOpacity>
                  </ThemedView>
                </>
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
              headerLeft: () => <LeftHeaderArrow />
            }}
          />
          <Drawer.Screen
            name="Favorites"
            options={{
              title: "Favorites",
              headerLeft: () => <LeftHeaderArrow />
            }}
          />
          <Drawer.Screen
            name="TodaysVerse"
            options={{
              title: "Todays Verse",
              headerLeft: () => <LeftHeaderArrow />
            }}
          />
          <Drawer.Screen
            name="Notes"
            options={{
              title: "Notes",
              headerLeft: () => <LeftHeaderArrow />
            }}
          />
          <Drawer.Screen
            name="Donate"
            options={{
              title: "Donate",
              headerLeft: () => <LeftHeaderArrow />
            }}
          />
          <Drawer.Screen
            name="ShareApp"
            options={{
              title: "Share App",
              headerLeft: () => <LeftHeaderArrow />
            }}
          />
           <Drawer.Screen
            name="Developer"
            options={{
              title: "About Developer",
              headerLeft: () => <LeftHeaderArrow />
            }}
          />
          <Drawer.Screen
            name="Settings"
            options={{
              title: "Settings",
              headerLeft: () => <LeftHeaderArrow />
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    
    bottom: -70,
    right: -70,
    width: 310,
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
  LeftHeaderArrow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },
});
