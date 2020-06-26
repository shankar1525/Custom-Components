import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Slider from "./components/CustomSlider/Slider";
import Chart from "./components/CustomCharts/Chart";
import AnimationScreen from "./components/Animations/Animation";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
export default function App() {
  const [value, setValue] = useState(0);
  function changeSliderValue(val) {
    console.log(val);
    // setValue(val);
  }
  return (
    <View style={styles.container}>
      {/* <Chart chartWidth={width * 0.8} chartHeight={height * 0.5}></Chart> */}
      {/* <Slider
        SliderWidth={width * 0.5}
        SliderHeight={height * 0.1}
        TotalCount={30}
        knobWidth={width * 0.07}
        changeVal={changeSliderValue}
      /> */}
      <AnimationScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});
