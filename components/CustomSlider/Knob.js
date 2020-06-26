import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions, ImageBackground } from "react-native";
import {
  ReText,
  clamp,
  onGestureEvent,
  snapPoint,
  timing,
} from "react-native-redash";
import Animated, {
  cond,
  eq,
  floor,
  lessThan,
  modulo,
  set,
  useCode,
} from "react-native-reanimated";
import { PanGestureHandler, State } from "react-native-gesture-handler";

const { Value, round, divide, concat, add } = Animated;

function Knob({ size, count, x, knobHeight, knobWidth, changeVal }) {
  const snapPoints = new Array(count).fill(0).map((e, i) => i * size);
  const index = round(divide(x, size));

  const [translationX, setTranslationX] = useState(new Value(0));
  const [trnsx, setTransx] = useState(0);
  const [statex, setStateX] = useState(new Value(State.UNDETERMINED));
  const velocityX = 0;
  //const state = new Value(State.UNDETERMINED);
  //const gestureHandler = onGestureEvent({ state, translationX, velocityX });
  const offset = new Value(0);
  const value = add(offset, translationX);
  const translateX = clamp(
    cond(
      eq(statex, State.END),
      set(
        offset,
        timing({
          from: value,
          to: snapPoint(value, velocityX, snapPoints),
        })
      ),
      value
    ),
    0,
    (count - 1) * size
  );

  useCode(() => set(x, translateX), [x, translateX]);

  return (
    <PanGestureHandler
      onGestureEvent={(e) => {
        let xx = translationX;
        xx.setValue(e.nativeEvent.translationX);
        // console.log(cond(snapPoint(value, 0, snapPoints)).toString());
        // setTransx(e.nativeEvent.translationX);
        // let yy = statex;
        // yy.setValue(e.nativeEvent.state);
        setTranslationX(xx);
        // setStateX(yy);

        // setStateX(e.nativeEvent.state);
      }}
    >
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          width: Dimensions.get("window").width * 0.07,
          height: knobHeight,
          // borderRadius: size / 2,
          backgroundColor: "transparent",
          elevation: 5,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          justifyContent: "center",
          alignItems: "center",
          transform: [{ translateX: x }],
        }}
      >
        <ImageBackground
          style={{
            width: Dimensions.get("window").width * 0.07,
            height: knobHeight,
            justifyContent: "center",
            alignItems: "center",
          }}
          source={require("../../assets/Icons/knob-t-p6.png")}
        >
          <ReText
            style={{ fontSize: knobWidth * 0.5 }}
            text={concat(add(index, 1))}
          />
        </ImageBackground>
      </Animated.View>
    </PanGestureHandler>
  );
}
export default Knob;
