import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, TouchableOpacity, ART } from "react-native";
import Svg, { G, Rect, Line, Path } from "react-native-svg";
import * as d3 from "d3";
import * as shape from "d3-shape";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const GRAPH_MARGIN = 20;
const GRAPH_BAR_WIDTH = 5;
const colors = {
  axis: "#E4E4E4",
  bars: "#15AD13",
};
const { Shape } = ART;
function Body({ values, solarValues, widthS, heightS }) {
  const SVGHeight = heightS;
  const SVGWidth = widthS;
  const graphHeight = SVGHeight;
  const graphWidth = SVGWidth;
  const data = values;
  const xDomain = [0, 120];
  const xRange = [0, graphWidth];
  const x = d3.scaleLinear().domain(xDomain).range(xRange);

  // Y scale linear
  const yDomain = [0, 100];
  const yRange = [0, graphHeight];
  const y = d3.scaleLinear().domain(yDomain).range(yRange);
  let paths = "";
  function _createArea() {
    var area = shape
      .area()
      .x(function (d, i) {
        return x(i * 10);
      })
      .y0(graphHeight)
      .y1(function (d) {
        // console.log(d);
        return y(100 - d);
      })
      .curve(shape.curveMonotoneX)(values);

    // console.debug(`area: ${JSON.stringify(area)}`);

    return { path: area };
  }
  function _createArea2() {
    var area = shape
      .area()
      .x(function (d, i) {
        return x(i * 10);
      })
      .y0(graphHeight)
      .y1(function (d) {
        // console.log(d);
        return y(100 - d);
      })
      .curve(shape.curveMonotoneX)(solarValues);

    // console.debug(`area: ${JSON.stringify(area)}`);

    return { path: area };
  }
  for (let i = 0; i < values.length - 1; i++) {
    paths =
      paths +
      `M${x(i * 10 + 6)} ${y(100)} V${y(
        100 - values[i] - (values[i + 1] - values[i]) * 0.6
      )} Q${x(i * 10 + 5)} ${y(
        100 - values[i] - (values[i + 1] - values[i]) * 0.5
      )} ${x(i * 10 + 4)} ${y(
        100 - values[i] - (values[i + 1] - values[i]) * 0.4
      )} V${y(100)} `;
  }
  const xxx = _createArea();
  const yyy = _createArea2();

  return (
    <View
      style={{
        width: width * 0.85,
        height: height * 0.65,
        // backgroundColor: "red",
      }}
    >
      <Svg width={SVGWidth} style={{ opacity: 0.6 }} height={SVGHeight}>
        <Path d={`${yyy.path}`} fill={"yellow"} opacity={"0.85"} />
        <Path d={`${xxx.path}`} fill={"orange"} opacity={"0.7"} />
        <Path d={`${paths}`} fill={"red"} opacity={"0.8"} />
        <G y={graphHeight}>
          {/* bars */}
          {values.map((item, i) => (
            <Line
              key={i}
              x1={x(i * 10)}
              y1={y(0)}
              x2={x(i * 10)}
              y2={y(item) * -1}
              stroke={colors.axis}
              strokeWidth="0.5"
            />
          ))}
          {/* <Shape /> */}
          {/* bottom axis */}
        </G>
      </Svg>
    </View>
  );
}
export default Body;
