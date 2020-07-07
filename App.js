import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Slider from "./components/CustomSlider/Slider";
import Chart from "./components/CustomCharts/Chart";
// import Flow from "./components/Flow";
// import AnimationScreen from "./components/Animations/Animation";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
export default function App() {
  const [value, setValue] = useState(0);
  function changeSliderValue(val) {
    console.log(val);
    // setValue(val);
  }
  let values = [55, 50, 48, 45, 52, 55, 60, 62, 58, 53, 48, 45, 40];
  let solarValues = [10, 15, 15, 20, 30, 80, 95, 80, 30, 15, 15, 10, 10];
  return (
    <View style={styles.container}>
      {/* <Flow /> */}
      <Chart
        chartWidth={width * 0.8}
        chartHeight={height * 0.5}
        values={values}
        solarValues={solarValues}
        width={width * 0.8}
        height={height * 0.6}
      ></Chart>
      {/* <Slider
        SliderWidth={width * 0.5}
        SliderHeight={height * 0.1}
        TotalCount={30}
        knobWidth={width * 0.07}
        changeVal={changeSliderValue}
      /> */}
      {/* <AnimationScreen /> */}
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
