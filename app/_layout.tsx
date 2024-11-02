import { SafeAreaView, StyleSheet } from "react-native";
import RootLayout from "./App";
import { GlobalProvider } from "@/context/GlobalContext";

export default function App() {
  return (
    <GlobalProvider>
      <SafeAreaView style={styles.container}>
        <RootLayout />
      </SafeAreaView>
    </GlobalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
