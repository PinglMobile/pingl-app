import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const AnimatedPath = Animated.createAnimatedComponent(Path);

const RadarPing = () => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(withTiming(1.2, { duration: 2000 }), -1, true);
    opacity.value = withRepeat(withTiming(0, { duration: 2000 }), -1, true);
  }, [scale, opacity]);

  const animatedProps = useAnimatedProps(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <View style={styles.container}>
      <Svg width="548" height="316" viewBox="0 0 548 316" fill="none">
        {/* Background and other SVG elements */}

        {/* Animated Radio Waves */}
        <AnimatedPath
          animatedProps={animatedProps}
          d="M231.443 56.463C212.065 38.509 181.927 38.5156 162.557 56.463C161.828 57.1379 161.814 58.2807 162.518 58.9808L166.263 62.7026C166.935 63.3709 168.016 63.3852 168.713 62.7442C184.673 48.0979 209.324 48.0946 225.288 62.7442C225.985 63.3852 227.066 63.3698 227.738 62.7026L231.483 58.9808C232.186 58.2807 232.172 57.1379 231.443 56.463Z"
          fill="#FF6F61"
        />
        <AnimatedPath
          animatedProps={animatedProps}
          d="M219.167 68.9016C206.56 57.7339 187.425 57.746 174.833 68.9016C174.078 69.57 174.054 70.7302 174.771 71.438L178.537 75.162C179.194 75.8106 180.25 75.8545 180.949 75.2497C190.131 67.2987 203.889 67.3163 213.05 75.2497C213.749 75.8545 214.805 75.8117 215.461 75.162L219.228 71.438C219.946 70.7302 219.921 69.5689 219.167 68.9016Z"
          fill="#FF6F61"
        />

        {/* Other SVG elements */}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RadarPing;
