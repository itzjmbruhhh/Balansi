import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={styles.container} className="flex-1 items-center justify-center bg-white">
      <Text>Balansi</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
