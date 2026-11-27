import { Text, View } from "react-native";
import ScreenContainer from "../../components/layout/ScreenContainer";

export default function Index() {
  return (
    <ScreenContainer className="bg-background">

      <View className="home-header">
        <View className="home-greeting-container">
          <Text className="home-header-greeting">Good Morning!</Text>
          <Text className="home-header-greeting">November 2026</Text>
        </View>
        <View>
          <Text className="home-header-title">Dashboard</Text>
        </View>
      </View>

    </ScreenContainer>
  );
}
