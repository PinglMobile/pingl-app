import React, { forwardRef } from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

interface EmailButtonProps {
  text: string;
  onPress: () => void;
}

const EmailButton = forwardRef<Pressable, EmailButtonProps>(
  ({ text, onPress }, ref) => (
    <Pressable ref={ref} style={styles.button} onPress={onPress}>
      <Icon name="email" size={25} color="white" style={styles.icon} />
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  )
);

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF7366",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 13,
  },
  icon: {
    marginRight: 11,
  },
  buttonText: {
    fontSize: 15,

    color: "white",
    fontFamily: "Roboto-Medium",
  },
});

export default EmailButton;
