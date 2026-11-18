import { Tabs } from "expo-router";

const TabsLayout = () => (
  <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="Accounts" options={{ title: "Accounts" }} />
      <Tabs.Screen name="Categories" options={{ title: "Categories" }} />
      <Tabs.Screen name="Settings" options={{ title: "Settings" }} />
  </Tabs>
);

export default TabsLayout;