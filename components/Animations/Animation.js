import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Button,
  Animated,
  TouchableOpacity,
  Easing,
} from "react-native";

function AnimationScreen() {
  const [dd, setDd] = useState(false);
  const arrayVal = [];
  hello();
  function hello() {
    for (let i = 0; i < 40; i++) {
      const ani = useRef(new Animated.Value(10)).current;
      const radius = useRef(new Animated.Value(2)).current;
      const ss = Animated.divide(ani, radius);
      let xc = {
        name: ani,
        radius: ss,
      };
      arrayVal.push(xc);
    }
  }

  const ani = useRef(new Animated.Value(10)).current;
  const radius = useRef(new Animated.Value(2)).current;
  const ss = Animated.divide(ani, radius);

  // console.log(ani);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          flexDirection: "row",
          width: 200,
          height: 100,
          flexWrap: "wrap",
        }}
      >
        {arrayVal.map((item, index) => (
          <Animated.View
            key={index}
            style={{
              width: item.name,
              height: item.name,
              borderRadius: item.radius,
              borderColor: "black",
              borderWidth: 2,
            }}
          ></Animated.View>
        ))}
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "red",
          width: 100,
          height: 40,
          marginTop: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => {
          for (let i = 0; i < 40; i++) {
            Animated.loop(
              Animated.timing(arrayVal[i].name, {
                toValue: 20,
                duration: 500,
                easing: Easing.ease,
              }),
              { resetBeforeIteration: true, iterations: 100 }
            ).start();
          }
        }}
      >
        <Text style={{ color: "white" }}>Change</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "blue",
          width: 100,
          height: 40,
          marginTop: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => {
          for (let i = 0; i < 40; i++) {
            arrayVal[i].name.stopAnimation();
          }
        }}
      >
        <Text style={{ color: "white" }}>Stop</Text>
      </TouchableOpacity>
    </View>
  );
}
export default AnimationScreen;
