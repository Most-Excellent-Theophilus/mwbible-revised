import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { useUserContext } from "@/components/preference/UserContext";
import { ThemedText } from "@/components/ThemedText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useRef, useState } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import {
  Dimensions,
  PanResponder,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import SkeletonBox from "@/components/loadingSkeleton";

import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import SlideInView from "@/components/SlideInView";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
type BibleType = {
  biblename: string;
  BIBLEBOOK: [
    {
      bnumber: string;
      bname: string;
      CHAPTERS: [
        {
          cnumber: string;
          VERS: [
            {
              vnumber: string;
              text: string;
            }
          ];
        }
      ];
    }
  ];
};
const Home = () => {
  const colorScheme = useColorScheme();

  const { user, UpdateUserContext, updateUserPreferences } = useUserContext();
  const [userLanguage, setUserLanguage] = useState<string | null>(
    user?.language.options || "Ch"
  );

  const [expandSelectionModal, setExpandSelectionModal] = useState(false);
  const [bible, getBible] = useState<BibleType | undefined>(undefined);
  const [userBook, setUserBook] = useState<string>(user?.book || "1");
  const [userChapter, setUserChapter] = useState<string>(user?.chapter || "1");
  const themeColors = colorScheme === "dark" ? Colors.dark : Colors.light;
  const [isChapterSelection, setIsChapterSelection] = useState(false);

  const [chaptersContent, setChaptersContent] = useState<any | {} | []>([]);
  const scrollViewRef = useRef<ScrollView>(null);

  const scrollToTop = () => {
    scrollViewRef.current!.scrollTo({ y: 0, animated: true }); // Use non-null assertion
  };

  const translateY = useSharedValue(SCREEN_HEIGHT);

  useEffect(() => {
    translateY.value = withTiming(SCREEN_HEIGHT, { duration: 500 });
  }, [translateY]);

  useEffect(() => {
    storeData();
  }, [userLanguage]);

  const storeData = async () => {
    try {
      const ifLanguage = await AsyncStorage.getItem("language");
      if (ifLanguage == null) {
        setUserLanguage("Ch");
        await AsyncStorage.setItem("language", "Ch");
      } else {
        setUserLanguage(ifLanguage);
      }
      const ifBook = await AsyncStorage.getItem("book");
      if (ifBook == null) {
        setUserBook("1");
        await AsyncStorage.setItem("book", "1");
      } else {
        setUserBook(ifBook);
      }
      const ifChapter = await AsyncStorage.getItem("chapter");
      if (ifChapter == null) {
        setUserChapter("1");
        await AsyncStorage.setItem("chapter", "1");
      } else {
        setUserChapter(ifChapter);
      }

      switch (userLanguage) {
        case "Ch":
          await import("../assets/Books/Chichewa.json").then((bibleData) =>
            getBible(bibleData.default as BibleType)
          );

          break;
        case "En":
          await import("../assets/Books/English.json").then((bibleData) =>
            getBible(bibleData.default as BibleType)
          );
          break;
        case "Tu":
          break;
        case "Yao":
          break;

        default:
          await import("../assets/Books/Chichewa.json").then((bibleData) =>
            getBible(bibleData.default as BibleType)
          );

          break;
      }
    } catch (error) {
      alert("some thing went wrong");
    }
  };

  // const chooseChapter = () => {
  //   const data = bible?.BIBLEBOOK.find((b) => b.bnumber == String(userBook) );
  //   const selectedChapter = data?.CHAPTERS.find((c) => (c.cnumber == String(userChapter) ));
  //  setChapterData(selectedChapter?.VERS)

  // };
  const handleForward = () => {
    scrollToTop();
    if (
      Number(userChapter) <
      Number(
        bible?.BIBLEBOOK.find((b) => b.bnumber == String(userBook))?.CHAPTERS
          .length
      )
    ) {
      setUserChapter(String(Number(userChapter) + 1)); // Go to the next chapter
    }

    if (
      Number(userChapter) ==
      Number(
        bible?.BIBLEBOOK.find((b) => b.bnumber == String(userBook))?.CHAPTERS
          .length
      )
    ) {
      if (Number(userBook) != 66) {
        setUserChapter(String(1));
        setUserBook(String(Number(userBook) + 1));
      } else {
        setUserChapter(String(1));

        setUserBook(String(1));
      }
    }
    if (
      !bible?.BIBLEBOOK.find((b) => b.bnumber == String(userBook))?.CHAPTERS
        .length
    ) {
      setUserBook(String(Number(userBook) + 1));
    }
  };
  const handleBackward = () => {
    scrollToTop();

    if (Number(userChapter) > 1) {
      setUserChapter(String(Number(userChapter) - 1)); // Go to the previous chapter
    }
    if (Number(userChapter) == 1) {
      if (Number(userBook) != 1) {
        const myBook =
          bible?.BIBLEBOOK.find(
            (b) => b.bnumber == String(Number(userBook) - 1)
          )?.CHAPTERS.length || 1;

        setUserChapter(String(myBook));
        setUserBook(String(Number(userBook) - 1));
      } else {
        setUserChapter(String(22));

        setUserBook(String(66));
      }
    }
    if (
      !bible?.BIBLEBOOK.find((b) => b.bnumber == String(userBook))?.CHAPTERS
        .length
    ) {
      setUserBook(String(Number(userBook) - 1));
    }
  };

  const handleSwipe = (direction: string) => {
    if (direction === "left") {
      handleForward();
    }

    if (direction === "right") {
      handleBackward();
    }
  };

  const handleSelectionModalExpansion = () => {
    if (!expandSelectionModal) {
      setExpandSelectionModal(true);
    } else {
      setExpandSelectionModal(false);
    }
  };
  // PanResponder for swipe detection
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return Math.abs(gestureState.dx) > 20; // Detect horizontal swipes
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx > 5) {
        handleSwipe("right"); // Swipe right
      } else if (gestureState.dx < -5) {
        handleSwipe("left"); // Swipe left
      }
    },
  });

  const swipetoClose = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return Math.abs(gestureState.dx) > 20; // Detect horizontal swipes
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx > 5) {
        setExpandSelectionModal(false); // Swipe right
      } else if (gestureState.dx < -5) {
        // Swipe left
        setExpandSelectionModal(false);
      }
    },
  });

  const handleChapterSelection = (numberOfBooks: string | number) => {
    if (numberOfBooks != "1") {
      setIsChapterSelection(true);
      const chapterArray = createArray(numberOfBooks);
      setChaptersContent(chapterArray);
    }
  };

  function createArray(size: any) {
    const array = [];
    const solidSize = Number(size);
    for (let i = 1; i <= solidSize; i++) {
      array.push(i);
    }
    return array;
  }

  return (
    <>
      <ThemedView
        style={{
          zIndex: 1,
          position: "absolute",
          bottom: 5,
          alignSelf: "center",
          margin: 1,
          borderRadius: 30,
          backgroundColor: themeColors.background2,

          borderColor: themeColors.tabIconDefault,
          shadowColor: themeColors.icon,
        }}
      >
        <Animated.View
          style={{
            margin: 3,
            flexDirection: "row",
            justifyContent: "space-evenly",
            borderRadius: 3,
          }}
        >
          <TouchableOpacity
            style={{ ...styles.buttonControls }}
            onPress={() => {
              setIsChapterSelection(false);
              handleBackward();
            }}
          >
            <TabBarIcon name="chevron-back" color={themeColors.icon} />
          </TouchableOpacity>
          {bible ? (
            <TouchableOpacity
              style={{
                ...styles.buttonControls,
                borderColor: themeColors.tint,
              }}
              onPress={() => handleSelectionModalExpansion()}
            >
              <ThemedText type="subtitle" style={{ color: themeColors.icon }}>
                {
                  bible?.BIBLEBOOK.find((b) => b.bnumber == String(userBook))
                    ?.bname
                }{" "}
                {userChapter}
              </ThemedText>
            </TouchableOpacity>
          ) : (
            <SkeletonBox width={"40%"} height={40} />
          )}

          <TouchableOpacity
            style={{ ...styles.buttonControls }}
            onPress={() => {
              setIsChapterSelection(false)
              handleForward();
            }}
          >
            <TabBarIcon name="chevron-forward" color={themeColors.icon} />
          </TouchableOpacity>
        </Animated.View>
      </ThemedView>
      <ScrollView ref={scrollViewRef}>
        <ParallaxScrollView
          headerBackgroundColor={{
            light: themeColors.background,
            dark: themeColors.background,
          }}
          noPadding={true}
          headerImage={
            <>
              <TabBarIcon size={310} name="book" style={styles.headerImage} />

              {bible ? (
                <ThemedView style={{ ...styles.titleContainer, padding: 10 }}>
                  <ThemedText type="title" style={{ color: themeColors.icon }}>
                    {
                      bible?.BIBLEBOOK.find(
                        (b) => b.bnumber == String(userBook)
                      )?.bname
                    }{" "}
                    {userChapter}
                  </ThemedText>
                </ThemedView>
              ) : (
                <View style={styles.titleContainer}>
                  <SkeletonBox width={"60%"} height={40} />
                </View>
              )}
            </>
          }
        >
          <ThemedView {...panResponder.panHandlers}>
            {isChapterSelection && (
              <ThemedView
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  padding: 10,
                  justifyContent: "flex-start",
                }}
              >
                {chaptersContent != "1" &&
                  chaptersContent.map((number: any, index: any) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setUserChapter(number);
                        setIsChapterSelection(false);
                      }}
                      style={{
                        margin: 2,
                        // padding: 15,
                        width: 50,
                        height: 50,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 9,
                        backgroundColor: themeColors.background2,
                      }}
                    >
                      <ThemedText>{number}</ThemedText>
                    </TouchableOpacity>
                  ))}
              </ThemedView>
            )}

            {bible?.BIBLEBOOK.find((b) => b.bnumber == String(userBook))
              ?.CHAPTERS.length
              ? bible?.BIBLEBOOK.find((b) => b.bnumber == String(userBook))
                  ?.CHAPTERS.find((c) => c.cnumber == String(userChapter))
                  ?.VERS.map((item) => (
                    <ThemedView
                      style={{ flexDirection: "row" }}
                      key={item.vnumber}
                    >
                      <ThemedText
                        style={{
                          paddingVertical: 10,
                          paddingHorizontal: 19,

                          letterSpacing: 0.5,
                          opacity: 0.7,
                        }}
                      >
                        <ThemedText
                          style={{ color: themeColors.tabIconDefault }}
                        >
                          {item.vnumber}.{" "}
                        </ThemedText>
                        {item.text}
                      </ThemedText>
                    </ThemedView>
                  ))
              : bible?.BIBLEBOOK.find((b) => b.bnumber == String(userBook))
                  ?.CHAPTERS.cnumber == "1"
              ? bible?.BIBLEBOOK.find(
                  (b) => b.bnumber == String(userBook)
                )?.CHAPTERS.VERS.map((item) => (
                  <ThemedView
                    style={{ flexDirection: "row" }}
                    key={item.vnumber}
                  >
                    <ThemedText
                      style={{
                        paddingVertical: 10,
                        paddingHorizontal: 19,

                        letterSpacing: 0.5,
                        opacity: 0.7,
                      }}
                    >
                      <ThemedText style={{ color: themeColors.tabIconDefault }}>
                        {item.vnumber}.{" "}
                      </ThemedText>
                      {item.text}
                    </ThemedText>
                  </ThemedView>
                ))
              : null}

            {!bible && (
              <View style={{ padding: 20 }}>
                <View style={{ marginBottom: 10 }}>
                  <SkeletonBox width={"100%"} height={10} />
                  <SkeletonBox width={"100%"} height={10} />
                  <SkeletonBox width={"40%"} height={10} />
                </View>
                <View style={{ marginBottom: 10 }}>
                  <SkeletonBox width={"100%"} height={10} />
                  <SkeletonBox width={"100%"} height={10} />
                  <SkeletonBox width={"40%"} height={10} />
                </View>
                <View style={{ marginBottom: 10 }}>
                  <SkeletonBox width={"100%"} height={10} />
                  <SkeletonBox width={"100%"} height={10} />
                  <SkeletonBox width={"40%"} height={10} />
                </View>
                <View style={{ marginBottom: 10 }}>
                  <SkeletonBox width={"100%"} height={10} />
                  <SkeletonBox width={"100%"} height={10} />
                  <SkeletonBox width={"40%"} height={10} />
                </View>
                <View style={{ marginBottom: 10 }}>
                  <SkeletonBox width={"100%"} height={10} />
                  <SkeletonBox width={"100%"} height={10} />
                  <SkeletonBox width={"40%"} height={10} />
                </View>
                <View style={{ marginBottom: 10 }}>
                  <SkeletonBox width={"100%"} height={10} />
                  <SkeletonBox width={"100%"} height={10} />
                  <SkeletonBox width={"40%"} height={10} />
                </View>
                <View style={{ marginBottom: 10 }}>
                  <SkeletonBox width={"100%"} height={10} />
                  <SkeletonBox width={"100%"} height={10} />
                  <SkeletonBox width={"40%"} height={10} />
                </View>
              </View>
            )}
          </ThemedView>
          <ThemedView style={{ paddingVertical: 90 }} />
        </ParallaxScrollView>
      </ScrollView>
      <SlideInView
        contWidth={"100%"}
        visible={expandSelectionModal}
        direction="right"
      >
        <ParallaxScrollView
          headerBackgroundColor={{
            light: themeColors.background,
            dark: themeColors.background,
          }}
          noPadding={true}
        >
          <ThemedView
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              paddingHorizontal: 20,
              paddingBottom: 150,
            }}
            {...swipetoClose.panHandlers}
          >
            {bible?.BIBLEBOOK.map((books) => (
              <TouchableOpacity
                key={books.bnumber}
                style={{
                  width: "100%",
                  paddingVertical: 15,
                  borderBottomWidth: 1,
                  borderBottomColor: themeColors.background2,
                }}
                onPress={() => {
                  setUserBook(books.bnumber);
                  setUserChapter("1");
                  handleChapterSelection(
                    books.CHAPTERS.length ? books.CHAPTERS.length : "1"
                  );

                  handleSelectionModalExpansion();
                  scrollToTop();

                  // setIsChapterSelection(true)
                }}
              >
                <ThemedText
                  style={{
                    color: themeColors.icon,
                    paddingLeft: 10,
                    letterSpacing: 0.5,
                  }}
                >
                  {books.bname}{" "}
                  {books.CHAPTERS.length ? books.CHAPTERS.length : "1"}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </ThemedView>
        </ParallaxScrollView>
      </SlideInView>
    </>
  );
};

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
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

export default Home;
