import { Text } from "react-native";
import { Link } from "expo-router";
import ScreenContainer from "../../components/layout/ScreenContainer";

export default function Index() {
  return (
    <ScreenContainer className="bg-background">
      <Text className="text-foreground">Welcome to Balansi</Text>
      <Link href="./Onboarding">
        <Text className="text-foreground">Go to Onboarding</Text>
      </Link>
    </ScreenContainer>
  );
}
