import React from "react";
import {
  Pressable,
  Text,
  Image,
  StyleSheet,
  ViewStyle,
  ImageSourcePropType,
} from "react-native";

interface AuthButtonProps {
  text: string;
  icon: ImageSourcePropType;
  onPress: () => void;
  style?: ViewStyle;
}

const AuthButton: React.FC<AuthButtonProps> = ({
  text,
  icon,
  onPress,
  style,
}) => (
  <Pressable style={[styles.button, style]} onPress={onPress}>
    <Image source={icon} style={styles.icon} />
    <Text style={styles.buttonText}>{text}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
    paddingHorizontal: 24,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 13,
  },
  icon: {
    width: 22,
    height: 24,
    marginRight: 12,
  },
  buttonText: {
    fontSize: 15,
    color: "black",
    fontFamily: "Roboto-Medium",
  },
});

export default AuthButton;
