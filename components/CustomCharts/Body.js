import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
function Body({ values }) {
  const [svgPath, setSvgPath] = useState("");
  const [bottomPath, setBottomPath] = useState("");
  const [orangePath, setOrangePath] = useState("");
  const [yellowPath, setYellowPath] = useState("");
  let val = values;
  useEffect(() => {
    let pathString = "M10 0 V100";
    let initial = true;
    let final = true;
    let less = 0;
    values[0] > values[1]
      ? ((val = [values[0] + 5, ...values]), (less = 1))
      : ((val = [values[0] - 5, ...values]), (less = 0));
    values[11] >= values[10]
      ? (val = [...values, values[11]])
      : (val = [...values, values[11] - 5]);
    setSvgPath(pathString);
    getBottomBorder(initial, final);
    getOrangeCurve(less);
    getYelloPath();
  }, []);
  function getBottomBorder(initial, final) {
    // let values = [10, 50, 70, 40, 30, 60, 50, 45, 37, 33, 47, 62];
    // d="M4 100 V62 Q5 62.5 6 63 V100 M20 70 Q20 80 60 50"
    let pathString = ``;

    for (let i = 0; i < 12; i++) {
      let val1 = 100 - val[i];
      let val2 = 100 - val[i + 1];
      if (val1 > val2) {
        pathString =
          pathString +
          `M${8.333 * i + 3} 100 V${(val2 - val1) / 2 + val1 + 2} Q${
            i * 8.333 + 4.5
          } ${(val2 - val1) / 2 + val1} ${i * 8.333 + 6} ${
            (val2 - val1) / 2 + val1 - 2
          } V100`;
      } else if (val2 > val1) {
        pathString =
          pathString +
          `M${8.333 * i + 3} 100 V${(val2 - val1) / 2 + val1 - 1} Q${
            i * 8.333 + 4.5
          } ${(val2 - val1) / 2 + val1} ${i * 8.333 + 6} ${
            (val2 - val1) / 2 + val1 + 2.5
          } V100`;
      } else {
        pathString =
          pathString +
          `M${8.333 * i + 3} 100 V${(val2 - val1) / 2 + val1} Q${
            i * 8.333 + 4.5
          } ${(val2 - val1) / 2 + val1} ${i * 8.333 + 6} ${
            (val2 - val1) / 2 + val1
          } V100`;
      }
    }

    setBottomPath(pathString);
  }
  function getOrangeCurve(less) {
    let less1 = less;
    let pathString = "";
    // let val1 = 100 - values[0];
    // let val2 = 100 - values[1];
    // d="M0 60 Q5 63  10 65 V99 Q9.8 100 9 100 H1 Q0 100 0 99 V60 M10 65 Q15 68 20 70 V99 Q19.8 100 19 100 H11 Q10 100 10 99 M20 70 Q24 71 30 71 V99 Q29.8 100 29 100 H21 Q20 100 20 99 M30 71 Q38 65 40 60 V99"
    // pathString = `M0 ${val1} Q4.1665 ${
    //   (val2 - val1) / 2 + val1 + 1
    // } 8.333 ${val2} V99 Q8.2 100 8 100 H1 Q0 100 0 99 V${val1} `;

    for (let i = 0; i < 12; i++) {
      var mpx = 100 - val[i];

      var mpy = 100 - val[i + 1];
      if (
        (less1 == 1 && val[i] > val[i + 1] && val[i + 1] > val[i + 2]) ||
        (less1 == 0 && val[i] < val[i + 1] && val[i + 1] < val[i + 2])
      ) {
        if (values[i] > values[i + 1]) {
          if (less1 == 1) {
            pathString =
              pathString +
              `M${8.333 * i} ${mpx} Q${8.333 * i + 4.1665} ${
                (mpy - mpx) / 2 + mpx + 1
              } ${8.333 * (i + 1)} ${mpy} V99 Q${8.333 * (i + 1) - 0.111} 100 ${
                8.333 * (i + 1) - 0.333
              } 100 H${8.333 * i + 1} Q${8.333 * i} 100 ${
                8.333 * i
              } 99 V${mpx} `;
          } else {
            less1 = 1;
          }
        } else {
          if (less1 == 0) {
            pathString =
              pathString +
              `M${8.333 * i} ${mpx} Q${8.333 * i + 4.1665} ${
                (mpy - mpx) / 2 + mpx + 1
              } ${8.333 * (i + 1)} ${mpy} V99 Q${8.333 * (i + 1) - 0.111} 100 ${
                8.333 * (i + 1) - 0.333
              } 100 H${8.333 * i + 1} Q${8.333 * i} 100 ${
                8.333 * i
              } 99 V${mpx} `;
          } else {
            less1 = 0;
          }
        }
      } else {
        if (values[i] > values[i + 1]) {
          pathString =
            pathString +
            `M${8.333 * i} ${mpx} Q${8.333 * i + 4.1665} ${
              less1 == 0 ? (mpy - mpx) / 2 + mpx - 4 : (mpy - mpx) / 2 + mpx + 3
            } ${8.333 * (i + 1)} ${mpy} V99 Q${8.333 * (i + 1) - 0.111} 100 ${
              8.333 * (i + 1) - 0.333
            } 100 H${8.333 * i + 1} Q${8.333 * i} 100 ${8.333 * i} 99 V${mpx} `;
          less1 = 1;
        } else if (values[i] < values[i + 1]) {
          pathString =
            pathString +
            `M${8.333 * i} ${mpx} Q${8.333 * i + 4.1665} ${
              less1 == 0
                ? (mpy - mpx) / 2 + mpx - 4
                : (mpy - mpx) / 2 + mpx + 3.5
            } ${8.333 * (i + 1)} ${mpy} V99 Q${8.333 * (i + 1) - 0.111} 100 ${
              8.333 * (i + 1) - 0.333
            } 100 H${8.333 * i + 1} Q${8.333 * i} 100 ${8.333 * i} 99 V${mpx} `;
          less1 = 0;
        } else {
          pathString =
            pathString +
            `M${8.333 * i} ${mpx} Q${8.333 * i + 4.1665} ${
              less1 == 0 ? (mpy - mpx) / 2 + mpx : (mpy - mpx) / 2 + mpx
            } ${8.333 * (i + 1)} ${mpy} V99 Q${8.333 * (i + 1) - 0.111} 100 ${
              8.333 * (i + 1) - 0.333
            } 100 H${8.333 * i + 1} Q${8.333 * i} 100 ${8.333 * i} 99 V${mpx} `;
        }

        //less = 0;
      }
    }
    // let vall1 = 100 - val[11];
    // let vall2 = 100 - val[11] + 5;
    // pathString =
    //   pathString +
    //   `M${8.333 * 11} ${vall1} Q${8.333 * 11 + 4.1665} ${
    //     (vall2 - vall1) / 2 + vall1 + 1
    //   } ${8.333 * 12} ${vall2} V99 Q${8.333 * 12 - 0.111} 100 ${
    //     8.333 * 11 - 1.333
    //   } 100 H${8.333 * 11 + 1} Q${8.333 * 11} 100 ${8.333 * 11} 99 V${vall1} `;

    setOrangePath(pathString);
  }
  function getYelloPath() {
    let pathString =
      "M0 95 Q25 95 30 50 Q50 -35 70 50 M70 50 Q75 95 100 95 V99 H0 V95";

    setYellowPath(pathString);
  }

  return (
    <View
      style={{
        width: width * 0.8,
        height: height * 0.4,
        // backgroundColor: "red",
      }}
    >
      <Svg
        viewBox="0 0 100 100"
        width={width * 0.85}
        style={{ opacity: 0.7 }}
        height={height * 0.65}
      >
        <Path
          d={`${yellowPath}`}
          fill="#E4E159"
          stroke="gray"
          strokeWidth="0"
          opacity="0.8"
        />
        <Path
          d={`${orangePath}`}
          fill="#FF7800"
          stroke="gray"
          strokeWidth="0.2"
          opacity="0.4"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        <Path
          d={`${bottomPath}`}
          fill="#FF7800"
          stroke="gray"
          strokeWidth="0"
          opacity="0.8"
        />
      </Svg>
    </View>
  );
}
export default Body;
