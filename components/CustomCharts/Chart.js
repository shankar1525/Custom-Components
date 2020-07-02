import React from "react";
import { View, Text } from "react-native";
import Footer from "./Footer";
import Body from "./Body";

function Chart(props) {
  return (
    <View
      style={{
        width: props.chartWidth,
        height: props.chartHeight,
      }}
    >
      <Body values={props.values}></Body>
      {/* <Footer></Footer> */}
    </View>
  );
}
export default Chart;
