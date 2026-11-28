import { Text, View } from "react-native";
import ScreenContainer from "../../components/layout/ScreenContainer";
import { getTimeGreeting } from "@/utils/greeting";

export default function Index() {
  const { text: greeting, icon: GreetingIcon } = getTimeGreeting();

  return (
    <ScreenContainer className="bg-background">
      <View className="home-header">
        <View className="home-greeting-container">
          <View className="flex-row items-center gap-2">
            <GreetingIcon width={24} height={24} accessible={false} />
            <Text className="home-header-greeting">{greeting}</Text>
          </View>
          <Text className="home-header-greeting">November 2026</Text>
        </View>
        <View>
          <Text className="home-header-title">Dashboard</Text>
        </View>
      </View>
    </ScreenContainer>
  );
}
