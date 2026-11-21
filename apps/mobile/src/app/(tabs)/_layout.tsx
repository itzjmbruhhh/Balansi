import { Tabs } from "expo-router";
import { tabs } from "@/constants/data";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNativeVariable } from "react-native-css/native";

const TabsLayout = () => {
  const insets = useSafeAreaInsets();
  const activeIconColor = useNativeVariable("--color-surface-secondary");
  const inactiveIconColor = useNativeVariable("--color-muted-foreground");

  const TabIcon = ({ icon: Icon, color }: TabIconProps) => {
    return (
      <View className="tab-icon-wrap">
        <Icon color={color} width={32} height={32} />
      </View>
    );
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        animation: "none",
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#1f1a2b",
        tabBarInactiveTintColor: "#6e6480",
        tabBarStyle: {
          height: 78 + insets.bottom,
          paddingTop: 8,
          paddingBottom: Math.max(insets.bottom, 8),
          borderTopWidth: 1,
          borderTopColor: "#6e6480",
          borderLeftWidth: 1,
          borderRightWidth: 1,
          borderColor: "#6e6480",
        },
        tabBarItemStyle: {
          paddingTop: 2,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          lineHeight: 16,
          fontWeight: "700",
          marginTop: 0,
        },
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarButton: ({
              href,
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
                href={href}
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
            tabBarIcon: ({ focused }) => <TabIcon
              icon={focused ? tab.activeIcon ?? tab.icon : tab.icon}
              color={focused ? activeIconColor : inactiveIconColor}
            />,
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabsLayout;
