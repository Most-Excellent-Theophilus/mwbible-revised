import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { useEffect, useRef, useState } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import {
  Button,
  Dimensions,
  Image,
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

import { useGlobalContext } from "@/context/GlobalContext";
import CustomToast from "@/components/preference/CustomToast";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
type BibleType = {
  biblename: string;
  BIBLEBOOK: [
    {
      bnumber: string;
      bname: string;
      CHAPTERS:
        | [
            {
              cnumber: string;
              VERS: [
                {
                  vnumber: string;
                  text: string;
                }
              ];
            }
          ]
        | any
        | null
        | undefined;
    }
  ];
};
const Home = () => {
  const { language, setLanguage } = useGlobalContext();
  const colorScheme = useColorScheme();
  const [message, setMessage] = useState("");

  const [expandSelectionModal, setExpandSelectionModal] = useState(false);
  const [bible, getBible] = useState<BibleType | undefined>(undefined);
  const [userBook, setUserBook] = useState<string>("1");
  const [userChapter, setUserChapter] = useState<string>("1");
  const themeColors = colorScheme === "dark" ? Colors.dark : Colors.light;
  const [isChapterSelection, setIsChapterSelection] = useState(false);

  const [chaptersContent, setChaptersContent] = useState<any | {} | []>([]);
  const scrollViewRef = useRef<ScrollView>(null);
  const [switching, setSwitching] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = () => {
    setToastVisible(true);
  };

  const hideToast = () => {
    setToastVisible(false);
  };

  const scrollToTop = () => {
    scrollViewRef.current!.scrollTo({ y: 0, animated: true }); // Use non-null assertion
  };

  const translateY = useSharedValue(SCREEN_HEIGHT);

  useEffect(() => {
    translateY.value = withTiming(SCREEN_HEIGHT, { duration: 500 });
  }, [translateY]);

  useEffect(() => {
    storeData();
  }, [language]);

  const storeData = async () => {
    try {
      setSwitching(true);
      switch (language) {
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
        case "Se":
          await import("../assets/Books/SenaMalawiBible.json").then(
            (bibleData) => getBible(bibleData.default as BibleType)
          );
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
    } finally {
      setSwitching(false);
      setMessage(`${language=="Ch"? " Chichewa ": language=="En"?" English ":" Sena "}Bible Loaded`);
      showToast();
    }
  };

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

  const handleChapterSelection = async ({
    numberOfChapters,
    bookNumber,
  }: {
    numberOfChapters: string | number;
    bookNumber: string;
  }) => {
    if (numberOfChapters != "1") {
      setIsChapterSelection(true);
      const chapterArray = createArray(numberOfChapters);
      setChaptersContent(chapterArray);
    }
    handleSelectionModalExpansion();

    scrollToTop();
    setUserBook(bookNumber);
    setUserChapter("1");
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
              onPress={() => {
                handleSelectionModalExpansion();

                setIsChapterSelection(false);
              }}
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
              setIsChapterSelection(false);
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
            light: themeColors.background2,
            dark: themeColors.background,
          }}
          noPadding={true}
          headerImage={
            <>
              <Image
                source={require("../assets/images/favicon.png")}
                style={styles.headerImage}
              />

              {switching && (
                <Animated.View style={{ position: "absolute" }}>
                  <ThemedView
                    style={{ padding: 5, borderRadius: 10, margin: 10 }}
                  >
                    <ThemedText style={{ paddingBottom: 5 }}>
                      Loading bible...
                    </ThemedText>

                    <SkeletonBox height={4} width={120} />
                  </ThemedView>
                </Animated.View>
              )}

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
                      <ThemedText
                        style={{ fontWeight: "bold", color: themeColors.tint }}
                      >
                        {number}
                      </ThemedText>
                    </TouchableOpacity>
                  ))}
              </ThemedView>
            )}

            {bible?.BIBLEBOOK.find((b) => b.bnumber == String(userBook))
              ?.CHAPTERS.length
              ? bible?.BIBLEBOOK.find((b) => b.bnumber == String(userBook))
                  ?.CHAPTERS.find((c: any) => c.cnumber == String(userChapter))
                  ?.VERS.map((item: any) => (
                    <TouchableOpacity
                      style={{ flexDirection: "row" }}
                      key={item.vnumber}
                    >
                      <ThemedText
                        style={{
                          paddingVertical: 10,
                          paddingHorizontal: 19,

                          letterSpacing: 0.5,
                          opacity: 0.7,

                          fontSize: 18,
                        }}
                      >
                        <ThemedText
                          style={{
                            color: themeColors.tabIconDefault,
                            fontWeight: "bold",
                          }}
                        >
                          {item.vnumber}.{" "}
                        </ThemedText>
                        {item.text}
                      </ThemedText>
                    </TouchableOpacity>
                  ))
              : bible?.BIBLEBOOK.find((b) => b.bnumber == String(userBook))
                  ?.CHAPTERS.cnumber == "1"
              ? bible?.BIBLEBOOK.find(
                  (b) => b.bnumber == String(userBook)
                )?.CHAPTERS.VERS.map((item: any) => (
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
                onPress={ async () => {
                  setMessage(`Book: ${books.bname}`);
                  showToast();

                await  handleChapterSelection({
                    numberOfChapters: books.CHAPTERS.length
                      ? books.CHAPTERS.length
                      : "1",
                    bookNumber: books.bnumber,
                  });
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
      {/* <Button title="Show Toast" onPress={showToast} /> */}
      <CustomToast
        message={message}
        visible={toastVisible}
        onClose={hideToast}
      />
    </>
  );
};

const styles = StyleSheet.create({
  headerImage: {
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

export default Home;
