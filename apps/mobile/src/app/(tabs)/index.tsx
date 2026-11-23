import { Text } from "react-native";
import { Link } from "expo-router";
import ScreenContainer from "../../components/layout/ScreenContainer";
import DashboardScreen from  "@/src/features/dashboard/DashboardScreen";

export default function Index() {
  return (
    <ScreenContainer className="bg-background">
      <DashboardScreen />
    </ScreenContainer>
  );
}
