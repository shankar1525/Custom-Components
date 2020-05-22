import * as React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import SliderView from "./SliderView";
import Knob from "./Knob";

const { Value, max, add } = Animated;

function Slider({ SliderWidth, SliderHeight, TotalCount, knobWidth }) {
  const count = TotalCount;
  const width = SliderWidth / count;
  const height = width;
  const styles = StyleSheet.create({
    container: {
      width: SliderWidth,
      height: SliderHeight,
      //borderRadius: height / 2,
      backgroundColor: "transparent",
      // justifyContent: "center",
      // alignItems: "center",
    },
  });
  const x = new Value(0);
  //console.log(x);
  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          position: "absolute",
          top: SliderHeight * 0.5,
          left: 0,
          right: 0,
          backgroundColor: "#bd536d",

          width: add(max(x, 0), knobWidth),
          height: 3,
          borderRadius: height / 2,
        }}
      />
      {/* <SliderView size={height} {...{ x, count }} /> */}
      <Knob
        size={height}
        knobHeight={SliderHeight}
        knobWidth={knobWidth}
        {...{ x, count }}
      />
    </View>
  );
}
export default Slider;
