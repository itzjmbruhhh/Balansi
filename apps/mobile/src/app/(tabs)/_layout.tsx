import { Tabs } from "expo-router";
import { tabs } from "@/constants/data";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNativeVariable } from "react-native-css/native";
import AddTabBarButton from "../../components/navigation/AddTabBarButton";

const TabsLayout = () => {
  const insets = useSafeAreaInsets();
  const primaryColor = useNativeVariable("--color-primary");
  const mutedColor = useNativeVariable("--color-muted-foreground");
  const surfaceColor = useNativeVariable("--color-surface");
  const borderColor = useNativeVariable("--color-border");
  const TabIcon = ({ icon: Icon, color }: TabIconProps) => {
    return (
      <View className="tab-icon-wrap">
        <Icon color={color} width={24} height={24} />
      </View>
    );
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        animation: "none",
        tabBarShowLabel: true,
        tabBarActiveTintColor: primaryColor,
        tabBarInactiveTintColor: mutedColor,
        tabBarStyle: {
          height: 70 + insets.bottom,
          paddingTop: 2,
          paddingBottom: Math.max(insets.bottom, 4),
          borderTopWidth: 1,
          backgroundColor: surfaceColor,
          borderTopColor: borderColor,
          borderColor,
        },
        tabBarItemStyle: {
          paddingTop: 2,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          lineHeight: 20,
          fontWeight: "700",
          marginTop: 0,
        },
      }}
    >
      {tabs.flatMap((tab) => [
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarButton: ({
              onPress,
              onLongPress,
              style,
              children,
              testID,
              role,
              "aria-label": accessibilityLabel,
              "aria-selected": selected,
            }) => (
              <Pressable
                onPress={onPress}
                onLongPress={onLongPress}
                style={style}
                testID={testID}
                role={role}
                aria-label={accessibilityLabel}
                aria-selected={selected}
              >
                {children}
              </Pressable>
            ),
            tabBarIcon: ({ focused, color }) => (
              <TabIcon
                icon={focused ? tab.activeIcon ?? tab.icon : tab.icon}
                color={color}
              />
            ),
          }}
        />,
        ...(tab.name === "Categories"
          ? [
              <Tabs.Screen
                key="Add"
                name="Add"
                options={{
                  title: "",
                  tabBarLabel: "",
                  tabBarAccessibilityLabel: "Add transaction",
                  tabBarButton: (buttonProps) => (
                    <AddTabBarButton {...buttonProps} />
                  ),
                }}
              />,
            ]
          : []),
      ])}
    </Tabs>
  );
};

export default TabsLayout;
