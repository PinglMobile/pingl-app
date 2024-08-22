import React from "react";
import { View } from "react-native";
import * as Progress from "react-native-progress";

const ProgressBar = ({ step, steps }) => {
  const progress = step / steps;

  return (
    <View style={{ backgroundColor: "white", padding: 30 }}>
      <Progress.Bar
        progress={progress}
        width={null}
        height={6}
        color="#FF7366"
        style={{
          marginTop: 40,
          borderWidth: "none",
          backgroundColor: "#ECECEC",
        }}
      />
    </View>
  );
};

export default ProgressBar;
