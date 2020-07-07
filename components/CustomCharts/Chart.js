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
      <Body
        values={props.values}
        solarValues={props.solarValues}
        widthS={props.width}
        heightS={props.height}
      ></Body>
      {/* <Footer></Footer> */}
    </View>
  );
}
export default Chart;
