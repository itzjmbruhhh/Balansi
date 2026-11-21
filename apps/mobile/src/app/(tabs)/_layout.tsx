import { Tabs } from "expo-router";
import { tabs } from "@/constants/data";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNativeVariable } from "react-native-css/native";

const TabsLayout = () => {
  const insets = useSafeAreaInsets();
  const foregroundColor = useNativeVariable("--color-foreground");
  const surfaceColor = useNativeVariable("--color-surface");
  const borderColor = useNativeVariable("--color-border");

  const TabIcon = ({ icon: Icon }: TabIconProps) => {
    return (
      <View className="tab-icon-wrap">
        <Icon width={32} height={32} />
      </View>
    );
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        animation: "none",
        tabBarShowLabel: true,
        tabBarActiveTintColor: foregroundColor,
        tabBarStyle: {
          height: 78 + insets.bottom,
          paddingTop: 8,
          paddingBottom: Math.max(insets.bottom, 8),
          borderTopWidth: 1,
          backgroundColor: surfaceColor,
          borderTopColor: borderColor,
          borderColor,
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
            tabBarIcon: ({ focused }) => <TabIcon
              icon={focused ? tab.activeIcon ?? tab.icon : tab.icon}
            />,
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabsLayout;
