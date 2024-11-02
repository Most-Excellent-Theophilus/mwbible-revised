import { HelloWave } from "@/components/HelloWave";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import {
  makeCall,
  openWebsite,
  openWhatsApp,
  sendEmail,
} from "@/components/preference/Cascade";
import CustomToast from "@/components/preference/CustomToast";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { useState } from "react";
import * as Clipboard from "expo-clipboard";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

const Developer = () => {
  const colorScheme = useColorScheme();
  const themeColors = colorScheme === "dark" ? Colors.dark : Colors.light;
  const [message, setMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = () => {
    setToastVisible(true);
  };

  const hideToast = () => {
    setToastVisible(false);
  };

  const copyToClipboard = async ({ text }: { text: string }) => {
    await Clipboard.setStringAsync(text);
    setMessage("Text copied :" + " " + text);
    showToast();
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        light: themeColors.background2,
        dark: themeColors.background+"00",
      }}
      headerImage={
        <>
          <Image
            source={require("../assets/images/samuel.png")}
            style={styles.headerImage}
          />
          <ThemedView style={{ ...styles.titleContainer, padding: 10 }}>
            <ThemedText type="title" style={{ color: themeColors.icon }}>
              Samuel Mkamanga
            </ThemedText>
          </ThemedView>
        </>
      }
    >
      <ThemedView style={{ flexDirection: "row" }}>
        <ThemedText
          type="subtitle"
          style={{ letterSpacing: 0.5, color: themeColors.icon }}
        >
          Hello!
        </ThemedText>
        <HelloWave />
      </ThemedView>
      <View
        style={{ borderBottomWidth: 0.5, borderBottomColor: themeColors.icon }}
      />
      <ThemedView>
        <ThemedText style={{ opacity: 0.7 }}>
          I am a Software Developer from Blantyre, Malawi, with a passion to
          Develop a Bible App that has all Native Malawian Languages, So i
          embarked on this Project Called "Malawian Bibles".
        </ThemedText>
      </ThemedView>
      <ThemedView style={{ flexDirection: "row" }}>
        <ThemedText
          type="subtitle"
          style={{ letterSpacing: 0.5, color: themeColors.icon, opacity: 0.7 }}
        >
          Contact Me!
        </ThemedText>
      </ThemedView>
      <View
        style={{ borderBottomWidth: 0.5, borderBottomColor: themeColors.icon }}
      />
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
        onPress={() =>
          openWebsite({ url: "https://samuelmkamanga.vercel.app/" })
        }
      >
        <TabBarIcon name="globe-outline" color={themeColors.icon} />
        <ThemedText type="link" style={{ paddingLeft: 8 }}>
          Website : Samuel Mkamanga
        </ThemedText>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
        onPress={() =>
          openWhatsApp({
            phoneNumber: "+265990985138",
            message:
              " *Contact For more info!* Hello!, Samuel I came across Malawian Bible App an id like to learn more ",
          })
        }
      >
        <TabBarIcon name="logo-whatsapp" color={themeColors.icon} />
        <ThemedText type="link" style={{ paddingLeft: 8 }}>
          WhatsApp : +265 990 98 51 38
        </ThemedText>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
        onPress={() => makeCall({ phoneNumber: "+265884834071" })}
      >
        <TabBarIcon name="call-outline" color={themeColors.icon} />
        <ThemedText type="link" style={{ paddingLeft: 8 }}>
          Call : +265 884 83 40 71
        </ThemedText>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
        onPress={() =>
          sendEmail({
            email: "mkamangasamuel255@mail.com",
            subject: "Contact For more info!",
            body: "Hello!, Samuel I came across Malawian Bible App an id like to learn more",
          })
        }
      >
        <TabBarIcon name="mail-outline" color={themeColors.icon} />
        <ThemedText type="link" style={{ paddingLeft: 8 }}>
          Mail : mkamangasamuel255@gmail.com
        </ThemedText>
      </TouchableOpacity>
      <ThemedView style={{ flexDirection: "row", alignItems: "center" }}>
        <ThemedText
          type="subtitle"
          style={{ letterSpacing: 0.5, color: themeColors.icon, opacity: 0.7 }}
        >
          Support/Donate
        </ThemedText>
        <ThemedText style={{ opacity: 0.7, paddingLeft: 10 }}>
          (click to copy)
        </ThemedText>
      </ThemedView>
      <View
        style={{ borderBottomWidth: 0.5, borderBottomColor: themeColors.icon }}
      />
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
        onPress={() =>copyToClipboard({text:"1009577795"}) }
      >
       <TabBarIcon name="copy-outline" color={themeColors.icon} />
        <ThemedText type="link" style={{ paddingLeft: 8 }}>
          National Bank : 100 95 777 95
        </ThemedText>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
        onPress={() =>copyToClipboard({text:"+265884834071"}) }
      >
         <TabBarIcon name="copy-outline" color={themeColors.icon} />
        <ThemedText type="link" style={{ paddingLeft: 8 }}>
         Tnm Mpamba : +265 884 83 40 71
        </ThemedText>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
        onPress={()=>copyToClipboard({text:"+265993234963"}) }
      >
     <TabBarIcon name="copy-outline" color={themeColors.icon} />
        <ThemedText type="link" style={{ paddingLeft: 8 }}>
        Airtel Money: +265 993 23 49 63
        </ThemedText>
       
      </TouchableOpacity>

      {/* <Button title="Show Toast" onPress={showToast} /> */}
      <CustomToast
        message={message}
        visible={toastVisible}
        onClose={hideToast}
      />
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  headerImage: {
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
