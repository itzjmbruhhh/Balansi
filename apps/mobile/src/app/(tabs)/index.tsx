import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View>
      <Text>Welcome to Balansi</Text>
      <Link href="./Onboarding">Go to Onboarding</Link>
      <Link href="/(auth)/SignIn" className="mt-4 rounded bg-primary p-4">
        Go to Sign in
      </Link>

      <Link href="/(auth)/SignUp" className="mt-4 rounded bg-primary p-4">
        Go to Sign up
      </Link>
    </View>
  );
}
