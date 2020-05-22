import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Slider from "./components/CustomSlider/Slider";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
export default function App() {
  return (
    <View style={styles.container}>
      <Slider
        SliderWidth={width * 0.5}
        SliderHeight={height * 0.1}
        TotalCount={30}
        knobWidth={width * 0.07}
      />
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
