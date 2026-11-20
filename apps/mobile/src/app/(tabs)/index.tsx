import { Text, View } from "react-native";
import { Link } from "expo-router";
import ScreenContainer from "../../components/layout/ScreenContainer";

export default function Index() {
  return (
    <ScreenContainer className="bg-background">
      <Text className="text-foreground">Welcome to Balansi</Text>
      <Link href="./Onboarding">
        <Text className="text-foreground">Go to Onboarding</Text>
      </Link>
      <Link href="/(auth)/SignIn" className="mt-4 rounded bg-primary p-4">
        <Text className="text-foreground">Go to Sign in</Text>
      </Link>

      <Link href="/(auth)/SignUp" className="mt-4 rounded bg-primary p-4">
        <Text className="text-foreground">Go to Sign up</Text>
      </Link>
    </ScreenContainer>
  );
}
