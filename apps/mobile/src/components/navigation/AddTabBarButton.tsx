import {
  default as Animated,
  interpolateColor,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Pressable, Text, View } from "react-native";
import { useNativeVariable } from "react-native-css/native";
import type { GestureResponderEvent, StyleProp, ViewStyle } from "react-native";

type AddTabBarButtonProps = {
  accessibilityLabel?: string;
  accessibilityState?: { selected?: boolean };
  onLongPress?: (event: GestureResponderEvent) => void;
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function AddTabBarButton({
  accessibilityLabel = "Add transaction",
  accessibilityState,
  onLongPress,
  onPress,
  style,
  testID,
}: AddTabBarButtonProps) {
  const baseColor = useNativeVariable("--color-tab-add");
  const pressedColor = useNativeVariable("--color-tab-add-pressed");
  const pressProgress = useSharedValue(0);
  const reduceMotion = useReducedMotion();

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      pressProgress.value,
      [0, 1],
      [baseColor, pressedColor],
    ),
    transform: [{ scale: 1 - pressProgress.value * 0.02 }],
  }));

  const setPressed = (pressed: boolean) => {
    const nextValue = pressed ? 1 : 0;
    pressProgress.value = reduceMotion
      ? nextValue
      : withTiming(nextValue, { duration: pressed ? 80 : 120 });
  };

  return (
    <View style={style}>
      <View className="tab-add-hitbox-position">
        <Pressable
          onPress={onPress}
          onLongPress={onLongPress}
          onPressIn={() => setPressed(true)}
          onPressOut={() => setPressed(false)}
          accessibilityRole="button"
          accessibilityLabel={accessibilityLabel}
          accessibilityState={accessibilityState}
          testID={testID}
          className="tab-add-touch-target"
        >
          <Animated.View className="tab-add-button" style={animatedStyle}>
            <Text className="tab-add-icon">+</Text>
          </Animated.View>
        </Pressable>
      </View>
    </View>
  );
}
