import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
function Body() {
  const [svgPath, setSvgPath] = useState("");

  useEffect(() => {
    let values = [10, 50, 70, 40, 30, 60, 50, 45, 37, 33, 47, 62];
    let pathString = "M10 0 V100";

    setSvgPath(pathString);
  }, []);

  return (
    <View style={{ width: width * 0.8, height: height * 0.4 }}>
      <Svg
        viewBox="0 0 100 100"
        width={width * 0.8}
        style={{ borderColor: "green", borderWidth: 1 }}
        height={height * 0.35}
      >
        <Path d="M10 0 V100" fill="none" stroke="red" strokeWidth="0.2" />
        <Path d="M20 0 V100" fill="none" stroke="red" strokeWidth="0.2" />
        <Path d="M30 0 V100" fill="none" stroke="red" strokeWidth="0.2" />
        <Path d="M40 0 V100" fill="none" stroke="red" strokeWidth="0.2" />
        <Path d="M50 0 V100" fill="none" stroke="red" strokeWidth="0.2" />
        <Path d="M60 0 V100" fill="none" stroke="red" strokeWidth="0.2" />
        <Path d="M70 0 V100" fill="none" stroke="red" strokeWidth="0.2" />
        <Path d="M80 0 V100" fill="none" stroke="red" strokeWidth="0.2" />
        <Path d="M90 0 V100" fill="none" stroke="red" strokeWidth="0.2" />
        <Path d="M0 10 H100" fill="none" stroke="red" strokeWidth="0.2" />
        <Path d="M0 20 H100" fill="none" stroke="red" strokeWidth="0.2" />
        <Path d="M0 30 H100" fill="none" stroke="red" strokeWidth="0.2" />
        <Path d="M0 40 H100" fill="none" stroke="red" strokeWidth="0.2" />
        <Path d="M0 50 H100" fill="none" stroke="red" strokeWidth="0.2" />
        <Path d="M0 60 H100" fill="none" stroke="red" strokeWidth="0.2" />
        <Path d="M0 70 H100" fill="none" stroke="red" strokeWidth="0.2" />
        <Path d="M0 80 H100" fill="none" stroke="red" strokeWidth="0.2" />
        <Path d="M0 90 H100" fill="none" stroke="red" strokeWidth="0.2" />

        <Path
          d="M0 70 Q5 60  10 60 Q15 60 20 70"
          fill="none"
          stroke="black"
          strokeWidth="0.5"
        />
      </Svg>
    </View>
  );
}
export default Body;
