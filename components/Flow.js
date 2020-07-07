import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Image,
  Animated,
  Switch,
  FlatList,
  Easing,
  LayoutAnimation,
  Alert,
  PanResponder,
} from "react-native";
// var _ = require("lodash");
import { Feather, Entypo, AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import Slider from "react-native-slider";
import {
  ScrollView,
  TapGestureHandler,
  gestureHandlerRootHOC,
} from "react-native-gesture-handler";

import { Value } from "react-native-reanimated";
import { translate, delay } from "react-native-redash";
// import { onChange, Easing } from "react-native-reanimated";

// import { BlurView } from "expo";
var width = Dimensions.get("window").width;
var height = Dimensions.get("window").height;
let wid = (data) => {
  let value = data / 1024;
  return Dimensions.get("window").width * value;
};

export default class Flow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "morning",
      popup: false,
      popupValue: null,
      playerNode: 0,
      towerLight: [],
      width: new Animated.Value(0),
      // pan: new Animated.ValueXY({}),
      roofLightsAnimation: new Animated.ValueXY({ x: 0, y: 0 }),
      backgroundAnim: new Animated.Value(1),
      backgroundInverseAnim: new Animated.Value(1),
      playerAnime: new Animated.Value(0.216),
      bgImg: require("../assets/Battery/Flow/morning-b-p7.jpg"),
      prevImg: require("../assets/Battery/Flow/night-b-p7.jpg"),
      roofLight: [],
      midInverter: [],
      batteryLight: [],
      arrowTime: new Animated.Value(0),
    };
  }
  roofLightsAnimation = { x: new Animated.Value(0) };
  pan = new Animated.ValueXY({ x: 200, y: 0 });
  screenValue = 0;
  panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => !this.state.popup,
    onPanResponderGrant: (evt, gestureState) => {
      this.pan.x.setValue(evt.nativeEvent.pageX);
    },
    onPanResponderMove: (evt, gestureState) => {
      this.pan.x.setValue(evt.nativeEvent.pageX);
      let value = {};
      value.x = evt.nativeEvent.pageX;
      value.x > 850
        ? this.setState({
            mode: "morning",
            popup: false,
            bgImg: require("../assets/Battery/Flow/morning-b-p7.jpg"),
            prevImg: require("../assets/Battery/Flow/night-b-p7.jpg"),
          })
        : value.x > 600
        ? this.setState({
            mode: "night",
            popup: false,
            bgImg: require("../assets/Battery/Flow/midday-b-p7.jpg"),
            prevImg: require("../assets/Battery/Flow/night-b-p7.jpg"),
          })
        : value.x > 400
        ? this.setState({
            mode: "midday",
            popup: false,
            bgImg: require("../assets/Battery/Flow/midday-b-p7.jpg"),
            prevImg: require("../assets/Battery/Flow/midday-b-p7.jpg"),
          })
        : value.x > 250
        ? this.setState({
            mode: "morning",
            popup: false,
            bgImg: require("../assets/Battery/Flow/morning-b-p7.jpg"),
            prevImg: require("../assets/Battery/Flow/midday-b-p7.jpg"),
          })
        : value.x > 150
        ? this.setState({
            mode: "morning",
            popup: false,
            bgImg: require("../assets/Battery/Flow/morning-b-p7.jpg"),
            prevImg: require("../assets/Battery/Flow/night-b-p7.jpg"),
          })
        : null;
      // });
      this.state.backgroundAnim = this.pan.x.interpolate({
        inputRange: [100, 150, 250, 450, 550, 600, 700, 1100],
        outputRange: [0, 1, 1, 0, 1, 1, 0, 0],
        extrapolate: "clamp",
      });

      this.state.backgroundInverseAnim = this.pan.x.interpolate({
        inputRange: [100, 150, 250, 450, 550, 600, 700, 1100],
        outputRange: [1, 1, 1, 1, 1, 1, 1, 1],
        extrapolate: "clamp",
      });
    },
    onPanResponderRelease: (evt, gestureState) => {
      let mode = this.state.mode;
      let value = {};
      value.x = evt.nativeEvent.pageX;

      Animated.timing(this.pan.x, {
        toValue:
          value.x < 300
            ? 200
            : value.x < 400
            ? 200
            : value.x < 500
            ? 500
            : value.x < 600
            ? 500
            : value.x < 700
            ? 700
            : value.x < 800
            ? 700
            : value.x < 900
            ? 700
            : 1000,
        duration: 1000,
      }).start(() => {
        if (value.x > 900) {
          Animated.sequence([
            Animated.timing(this.pan.x, {
              toValue: 0,
              duration: 0,
            }),
            Animated.timing(this.pan.x, {
              toValue: 200,
              duration: 1000,
              easing: Easing.linear,
            }),
          ]).start();
        }
      });

      this.state.backgroundAnim = this.pan.x.interpolate({
        inputRange: [100, 150, 200, 250, 450, 500, 600, 700, 1100],
        outputRange: [0, 1, 1, 1, 0, 1, 1, 0, 0],
        extrapolate: "clamp",
      });
      this.state.backgroundInverseAnim = this.pan.x.interpolate({
        inputRange: [100, 150, 200, 250, 450, 500, 600, 700, 1100],
        outputRange: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        extrapolate: "clamp",
      });
      // setTimeout(() => {
      //   Animated.timing(this.pan.x).stop();
      // }, 2000);
    },
  });

  changeBackground = (i) => {
    // this.state.prevImg = this.state.bgImg;
    let mode = this.state.mode;
    var image;
    let node = 0;

    if (mode == "morning") {
      this.setState({
        mode: "midday",
        popup: false,
        bgImg: require("../assets/Battery/Flow/morning-b-p7.jpg"),
        prevImg: require("../assets/Battery/Flow/midday-b-p7.jpg"),
      });
      node = 500;
      setTimeout(() => {
        this.setState({
          mode: "midday",
          popup: false,
          bgImg: require("../assets/Battery/Flow/midday-b-p7.jpg"),
          prevImg: require("../assets/Battery/Flow/midday-b-p7.jpg"),
        });
        node = 500;
      }, 1000);
    }
    // ,
    else if (mode == "midday") {
      this.setState({
        mode: "night",
        popup: false,
        bgImg: require("../assets/Battery/Flow/midday-b-p7.jpg"),
        prevImg: require("../assets/Battery/Flow/night-b-p7.jpg"),
      }),
        (node = 700);
    } else if (mode == "night") {
      this.setState({
        mode: "morning",
        popup: false,
        bgImg: require("../assets/Battery/Flow/morning-b-p7.jpg"),
        prevImg: require("../assets/Battery/Flow/night-b-p7.jpg"),
      }),
        (node = 200);
    }

    i
      ? (this.setState({
          mode: "night",
          popup: true,
          bgImg: require("../assets/Battery/Flow/night-b-p7.jpg"),
        }),
        (node = 900))
      : null;

    this.fadeIn(node);
  };

  fadeIn = (node) => {
    // this.state.backgroundAnim = null;
    // this.state.backgroundAnim = new Animated.Value(0.5);
    // this.state.backgroundInverseAnim = null;
    // this.state.backgroundInverseAnim = new Animated.Value(0.8);
    // Animated.timing(this.state.backgroundAnim, {
    //   toValue: this.state.popup ? 0.68 : 1,
    //   duration: 1000,
    // }).start();
    this.state.backgroundAnim = this.pan.x.interpolate({
      inputRange: [100, 150, 200, 250, 450, 500, 600, 700, 1100],
      outputRange: [0, 1, 1, 1, 0, 1, 1, 0, 0],
      extrapolate: "clamp",
    });
    this.state.backgroundInverseAnim = this.pan.x.interpolate({
      inputRange: [100, 150, 200, 250, 450, 500, 600, 700, 1100],
      outputRange: [1, 1, 1, 1, 1, 1, 1, 1, 1],
      extrapolate: "clamp",
    });

    this.state.mode == "night"
      ? Animated.timing(this.pan.x, {
          toValue: 1000,
          duration: 1000,
          easing: Easing.linear,
        }).start(() => {
          Animated.timing(this.pan.x, {
            toValue: 0,
            duration: 0,
          }).start(() =>
            Animated.timing(this.pan.x, {
              toValue: 200,
              duration: 1000,
              easing: Easing.linear,
            }).start()
          );
        })
      : Animated.timing(this.pan.x, {
          toValue: node,
          duration: 2000,
          easing: Easing.linear,
        }).start();
  };

  componentWillMount = () => {
    let roofLight = this.state.roofLight;
    let ss1 = {
      animation: new Animated.ValueXY({ x: 0, y: wid(3) }),
      id: 0,
      opacity: new Animated.Value(1),
    };
    let ss2 = {
      animation: new Animated.ValueXY({ x: 0, y: wid(3) }),
      id: 0,
      opacity: new Animated.Value(1),
    };
    let ss3 = {
      animation: new Animated.ValueXY({ x: 0, y: wid(3) }),
      id: 0,
      opacity: new Animated.Value(1),
    };

    let a = {
      animation: new Animated.ValueXY({ x: 0, y: wid(3) }),
      id: 0,
      opacity: new Animated.Value(1),
    };
    let b = {
      animation: new Animated.ValueXY({ x: 0, y: wid(3) }),
      id: 0,
      opacity: new Animated.Value(1),
    };
    let c = {
      animation: new Animated.ValueXY({ x: 0, y: wid(3) }),
      id: 0,
      opacity: new Animated.Value(1),
    };
    let m1 = {
      animation: new Animated.ValueXY({ x: 0, y: wid(3) }),
      id: 0,
      opacity: new Animated.Value(1),
    };
    let m2 = {
      animation: new Animated.ValueXY({ x: 0, y: wid(3) }),
      id: 0,
      opacity: new Animated.Value(1),
    };
    let m3 = {
      animation: new Animated.ValueXY({ x: 0, y: wid(3) }),
      id: 0,
      opacity: new Animated.Value(1),
    };

    let m4 = {
      animation: new Animated.ValueXY({ x: 0, y: wid(3) }),
      id: 0,
      opacity: new Animated.Value(1),
    };
    let mi0 = {
      animation: new Animated.ValueXY({ x: 0, y: wid(3) }),
      opacity: new Animated.Value(1),
    };

    let mi1 = {
      animation: new Animated.ValueXY({ x: 0, y: wid(3) }),
      opacity: new Animated.Value(1),
    };
    let b1 = {
      animation: new Animated.ValueXY({ x: 0, y: 0 }),
      opacity: new Animated.Value(1),
    };

    let b2 = {
      animation: new Animated.ValueXY({ x: 0, y: 0 }),
      opacity: new Animated.Value(1),
    };

    this.setState({
      towerLight: [a, b, c],
      roofLight: [ss1, ss2, ss3],
      midRoofLight: [m1, m2, m3, m4],
      midInverter: [mi0, mi1],
      batteryLight: [b1, b2],
    });
  };

  componentDidMount() {
    this.roof();
    this.towerAnim();
    this.arrowAnimation();
  }

  animate = () => {
    if (this.state.mode == "morning") {
      this.roof();
      this.towerAnim();
      this.midRoof();
      this.midInverter();
      this.midBattery();
      this.arrowAnimation();
    } else if (this.state.mode == "midday") {
      this.nightInverter();
      this.nightBattery();
    }
  };

  arrowAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.arrowTime, { toValue: 1, duration: 1000 }),
      ]),
      {
        resetBeforeIteration: true,
        iterations: 1000,
      }
    ).start();
  };

  nightInverter = () => {
    this.state.midInverter[0].animation.y.stopAnimation();
    this.state.midInverter[0].animation.x.stopAnimation();
    this.state.midInverter[1].animation.y.stopAnimation();
    this.state.midInverter[1].animation.x.stopAnimation();
    this.state.midInverter[0].opacity.stopAnimation();
    this.state.midInverter[1].opacity.stopAnimation();

    Animated.loop(
      Animated.sequence([
        // Animated.timing(this.state.midInverter[0].animation.y, {
        //   toValue: -12,
        //   duration: 10,
        // }),
        Animated.timing(this.state.midInverter[0].animation.y, {
          toValue: -8,
        }),
        Animated.timing(this.state.midInverter[0].opacity, { toValue: 0 }),
      ]),
      { resetBeforeIteration: true, iterations: 1000 }
    ).start();
    setTimeout(() => {
      Animated.loop(
        Animated.sequence([
          // Animated.timing(this.state.midInverter[1].animation.y, {
          //   toValue: -10,
          //   duration: 10,
          // }),
          Animated.timing(this.state.midInverter[1].animation.y, {
            toValue: -7,
          }),
          Animated.timing(this.state.midInverter[1].opacity, { toValue: 0 }),
        ]),
        { resetBeforeIteration: true, iterations: 1000 }
      ).start(() => {
        if (this.state.mode != "night") {
          this.state.midInverter[0].animation.y.stopAnimation();
          this.state.midInverter[0].animation.x.stopAnimation();
          this.state.midInverter[1].animation.y.stopAnimation();
          this.state.midInverter[1].animation.x.stopAnimation();
          this.state.midInverter[0].opacity.stopAnimation();
          this.state.midInverter[1].opacity.stopAnimation();
        }
      });
    }, 400);
  };

  nightBattery = () => {
    Animated.timing(this.state.batteryLight[0].animation.y).stop();
    Animated.timing(this.state.batteryLight[0].animation.x).stop();
    Animated.timing(this.state.batteryLight[1].animation.y).stop();
    Animated.timing(this.state.batteryLight[1].animation.x).stop();
    Animated.timing(this.state.batteryLight[0].opacity).stop();
    Animated.timing(this.state.batteryLight[1].opacity).stop();

    Animated.loop(
      Animated.sequence([
        // Animated.timing(this.state.batteryLight[0].animation.x, {
        //   toValue: -5,
        //   duration: 6,
        // }),
        Animated.parallel([
          Animated.timing(this.state.batteryLight[0].animation.x, {
            toValue: 75,
            duration: 6,
          }),
          Animated.timing(this.state.batteryLight[0].animation.y, {
            toValue: -3,
            duration: 6,
          }),
        ]),
        Animated.parallel([
          Animated.timing(this.state.batteryLight[0].animation.x, {
            toValue: 65,
            duration: 100,
          }),
          Animated.timing(this.state.batteryLight[0].animation.y, {
            toValue: 0,
            duration: 100,
          }),
        ]),
        Animated.timing(this.state.batteryLight[0].animation.x, {
          toValue: -3,
          // duration: 100,
        }),
        Animated.timing(this.state.batteryLight[0].opacity, {
          toValue: 0,
        }),
      ]),
      {
        resetBeforeIteration: true,
        iterations: 1000,
      }
    ).start(() => {
      if (this.state.mode != "night") {
        Animated.timing(this.state.batteryLight[0].animation.y).stop();
        Animated.timing(this.state.batteryLight[0].animation.x).stop();
        Animated.timing(this.state.batteryLight[0].opacity).stop();
      }
    });

    setTimeout(() => {
      Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(this.state.batteryLight[1].animation.x, {
              toValue: 75,
              duration: 6,
            }),
            Animated.timing(this.state.batteryLight[1].animation.y, {
              toValue: -3,
              duration: 6,
            }),
          ]),
          Animated.parallel([
            Animated.timing(this.state.batteryLight[1].animation.x, {
              toValue: 65,
              duration: 100,
            }),
            Animated.timing(this.state.batteryLight[1].animation.y, {
              toValue: 0,
              duration: 100,
            }),
          ]),
          Animated.timing(this.state.batteryLight[1].animation.x, {
            toValue: -3,
            // duration: 100,
          }),
          Animated.timing(this.state.batteryLight[1].opacity, {
            toValue: 0,
          }),
        ]),
        {
          resetBeforeIteration: true,
          iterations: 1000,
        }
      ).start(() => {
        if (this.state.mode != "night") {
          Animated.timing(this.state.batteryLight[1].animation.y).stop();
          Animated.timing(this.state.batteryLight[1].animation.x).stop();
          Animated.timing(this.state.batteryLight[1].opacity).stop();
        }
      });
    }, 500);
  };

  midBattery = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.batteryLight[0].animation.x, {
          toValue: -5,
          duration: 10,
        }),
        Animated.timing(this.state.batteryLight[0].animation.x, {
          toValue: 65,
        }),
        Animated.parallel([
          Animated.timing(this.state.batteryLight[0].animation.x, {
            toValue: 74,
            duration: 50,
          }),
          Animated.timing(this.state.batteryLight[0].animation.y, {
            toValue: -3,
            duration: 50,
          }),
        ]),
        Animated.timing(this.state.batteryLight[0].opacity, {
          toValue: 0,
          // duration: 250,
        }),
      ]),
      {
        resetBeforeIteration: true,
        iterations: 1000,
      }
    ).start(() => {
      if (this.state.mode != "midday") {
        Animated.timing(this.state.batteryLight[0].animation.y).stop();
        Animated.timing(this.state.batteryLight[0].animation.x).stop();
        Animated.timing(this.state.batteryLight[0].opacity).stop();
      }
    });

    setTimeout(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(this.state.batteryLight[1].animation.x, {
            toValue: -5,
            duration: 10,
          }),
          Animated.timing(this.state.batteryLight[1].animation.x, {
            toValue: 65,
          }),
          Animated.parallel([
            Animated.timing(this.state.batteryLight[1].animation.x, {
              toValue: 74,
              duration: 50,
            }),
            Animated.timing(this.state.batteryLight[1].animation.y, {
              toValue: -3,
              duration: 50,
            }),
          ]),
          Animated.timing(this.state.batteryLight[1].opacity, {
            toValue: 0,
          }),
        ]),
        {
          resetBeforeIteration: true,
          iterations: 1000,
        }
      ).start(() => {
        if (this.state.mode != "midday") {
          Animated.timing(this.state.batteryLight[1].animation.y).stop();
          Animated.timing(this.state.batteryLight[1].animation.x).stop();
          Animated.timing(this.state.batteryLight[1].opacity).stop();
        }
      });
    }, 500);
  };

  midInverter = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.midInverter[0].animation.y, {
          toValue: -12,
          duration: 10,
        }),
        Animated.timing(this.state.midInverter[0].animation.y, { toValue: 6 }),
        Animated.timing(this.state.midInverter[0].opacity, { toValue: 0 }),
      ]),
      { resetBeforeIteration: true, iterations: 1000 }
    ).start(() => {
      if (this.state.mode != "midday") {
        Animated.timing(this.state.batteryLight[0].animation.y).stop();
        Animated.timing(this.state.batteryLight[0].animation.x).stop();
        Animated.timing(this.state.batteryLight[0].opacity).stop();
      }
    });
    setTimeout(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(this.state.midInverter[1].animation.y, {
            toValue: -10,
            duration: 10,
          }),
          Animated.timing(this.state.midInverter[1].animation.y, {
            toValue: 6,
          }),
          Animated.timing(this.state.midInverter[1].opacity, { toValue: 0 }),
        ]),
        { resetBeforeIteration: true, iterations: 1000 }
      ).start(() => {
        if (this.state.mode != "midday") {
          Animated.timing(this.state.batteryLight[1].animation.y).stop();
          Animated.timing(this.state.batteryLight[1].animation.x).stop();
          Animated.timing(this.state.batteryLight[1].opacity).stop();
        }
      });
    }, 400);
  };

  towerAnim = () => {
    // this.state.towerLight.map((item, i) => {
    // for (let i = 0; i < 4; i++) {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.towerLight[0].animation.y, {
          toValue: 30,
          duration: 250,
          // easing: Easing.linear,
        }),
        Animated.parallel([
          Animated.timing(this.state.towerLight[0].animation.y, {
            toValue: 40,
            duration: 200,
          }),
          Animated.timing(this.state.towerLight[0].animation.x, {
            toValue: 80,
          }),
        ]),
        Animated.timing(this.state.towerLight[0].opacity, {
          toValue: 0,
          // duration: 250,
        }),
      ]),
      {
        resetBeforeIteration: true,
        iterations: 1000,
      }
    ).start(() => {
      if (this.state.mode != "morning") {
        Animated.timing(this.state.towerLight[0].animation.y).stop();
        Animated.timing(this.state.towerLight[0].animation.x).stop();
        Animated.timing(this.state.towerLight[0].opacity).stop();
      }
    });

    setTimeout(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(this.state.towerLight[1].animation.y, {
            toValue: 30,
            duration: 250,
            // easing: Easing.linear,
          }),
          Animated.parallel([
            Animated.timing(this.state.towerLight[1].animation.y, {
              toValue: 40,
              duration: 200,
            }),
            Animated.timing(this.state.towerLight[1].animation.x, {
              toValue: 80,
            }),
          ]),
          Animated.timing(this.state.towerLight[1].opacity, {
            toValue: 0,
            // duration: 250,
          }),
        ]),
        {
          resetBeforeIteration: true,
          iterations: 1000,
        }
      ).start(() => {
        if (this.state.mode != "midday") {
          Animated.timing(this.state.towerLight[1].animation.y).stop();
          Animated.timing(this.state.towerLight[1].animation.x).stop();
          Animated.timing(this.state.towerLight[1].opacity).stop();
        }
      });
    }, 400);
    setTimeout(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(this.state.towerLight[2].animation.y, {
            toValue: 30,
            duration: 250,
            // easing: Easing.linear,
          }),
          Animated.parallel([
            Animated.timing(this.state.towerLight[2].animation.y, {
              toValue: 40,
              duration: 200,
            }),
            Animated.timing(this.state.towerLight[2].animation.x, {
              toValue: 80,
            }),
          ]),
          Animated.timing(this.state.towerLight[2].opacity, {
            toValue: 0,
            // duration: 250,
          }),
        ]),
        {
          resetBeforeIteration: true,
          iterations: 1000,
        }
      ).start(() => {
        if (this.state.mode != "midday") {
          Animated.timing(this.state.towerLight[2].animation.y).stop();
          Animated.timing(this.state.towerLight[2].animation.x).stop();
          Animated.timing(this.state.towerLight[2].opacity).stop();
        }
      });
    }, 700);
  };
  midRoof = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.midRoofLight[0].animation.x, {
          toValue: wid(-25),
        }),
        Animated.parallel([
          Animated.timing(this.state.midRoofLight[0].animation.x, {
            toValue: wid(-30),
            duration: 100,
          }),
          Animated.timing(this.state.midRoofLight[0].animation.y, {
            toValue: wid(155),
          }),
        ]),
        Animated.timing(this.state.midRoofLight[0].opacity, {
          toValue: 0,
        }),
      ]),
      {
        resetBeforeIteration: true,
        iterations: 1000,
      }
    ).start(() => {
      if (this.state.mode != "midday") {
        Animated.timing(this.state.midRoofLight[0].animation.y).stop();
        Animated.timing(this.state.midRoofLight[0].animation.x).stop();
        Animated.timing(this.state.midRoofLight[0].opacity).stop();
      }
    });

    setTimeout(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(this.state.midRoofLight[1].animation.x, {
            toValue: wid(-25),
          }),
          Animated.parallel([
            Animated.timing(this.state.midRoofLight[1].animation.x, {
              toValue: wid(-30),
              duration: 100,
            }),
            Animated.timing(this.state.midRoofLight[1].animation.y, {
              toValue: wid(155),
            }),
          ]),
          Animated.timing(this.state.midRoofLight[1].opacity, {
            toValue: 0,
          }),
        ]),
        {
          resetBeforeIteration: true,
          iterations: 1000,
        }
      ).start(() => {
        if (this.state.mode != "morning") {
          Animated.timing(this.state.midRoofLight[1].animation.y).stop();
          Animated.timing(this.state.midRoofLight[1].animation.x).stop();
          Animated.timing(this.state.midRoofLight[1].opacity).stop();
        }
      });
    }, 500);

    setTimeout(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(this.state.midRoofLight[2].animation.x, {
            toValue: wid(-25),
          }),
          Animated.parallel([
            Animated.timing(this.state.midRoofLight[2].animation.x, {
              toValue: wid(-30),
              duration: 100,
            }),
            Animated.timing(this.state.midRoofLight[2].animation.y, {
              toValue: wid(155),
            }),
          ]),
          Animated.timing(this.state.midRoofLight[2].opacity, {
            toValue: 0,
          }),
        ]),
        {
          resetBeforeIteration: true,
          iterations: 1000,
        }
      ).start(() => {
        if (this.state.mode != "midday") {
          Animated.timing(this.state.towerLight[2].animation.y).stop();
          Animated.timing(this.state.towerLight[2].animation.x).stop();
          Animated.timing(this.state.towerLight[2].opacity).stop();
        }
      });
    }, 1000);
  };

  roof = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.roofLight[0].animation.x, {
          toValue: wid(-30),
        }),
        Animated.timing(this.state.roofLight[0].animation.y, {
          toValue: wid(120),
        }),
        Animated.timing(this.state.roofLight[0].opacity, {
          toValue: 0,
        }),
      ]),
      {
        resetBeforeIteration: true,
        iterations: 1000,
      }
    ).start(() => {
      if (this.state.mode != "morning") {
        Animated.timing(this.state.roofLight[0].animation.y).stop();
        Animated.timing(this.state.roofLight[0].animation.x).stop();
        Animated.timing(this.state.roofLight[0].opacity).stop();
      }
    });

    setTimeout(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(this.state.roofLight[1].animation.x, {
            toValue: wid(-30),
          }),
          Animated.timing(this.state.roofLight[1].animation.y, {
            toValue: wid(120),
          }),
          Animated.timing(this.state.roofLight[1].opacity, {
            toValue: 0,
          }),
        ]),
        {
          resetBeforeIteration: true,
          iterations: 1000,
        }
      ).start(() => {
        if (this.state.mode != "morning") {
          Animated.timing(this.state.roofLight[1].animation.y).stop();
          Animated.timing(this.state.roofLight[1].animation.x).stop();
          Animated.timing(this.state.roofLight[1].opacity).stop();
        }
      });
    }, 500);

    setTimeout(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(this.state.roofLight[2].animation.x, {
            toValue: wid(-30),
          }),
          Animated.timing(this.state.roofLight[2].animation.y, {
            toValue: wid(120),
          }),
          Animated.timing(this.state.roofLight[2].opacity, {
            toValue: 0,
          }),
        ]),
        {
          resetBeforeIteration: true,
          iterations: 1000,
        }
      ).start(() => {
        if (this.state.mode != "morning") {
          Animated.timing(this.state.roofLight[2].animation.y).stop();
          Animated.timing(this.state.roofLight[2].animation.x).stop();
          Animated.timing(this.state.roofLight[2].opacity).stop();
        }
      });
    }, 1000);
  };
  stopAnimation = () => {
    if (
      this.state.roofLight[0].animation.x &&
      this.state.roofLight[1].animation.x &&
      this.state.roofLight[2].animation.opacity
    ) {
      this.state.roofLight[0].animation.x.stopAnimation();
      this.state.roofLight[0].animation.y.stopAnimation();
      this.state.roofLight[0].animation.opacity.stopAnimation();
      this.state.roofLight[1].animation.x.stopAnimation();
      this.state.roofLight[1].animation.y.stopAnimation();
      this.state.roofLight[1].animation.opacity.stopAnimation();
      this.state.roofLight[2].animation.x.stopAnimation();
      this.state.roofLight[2].animation.y.stopAnimation();
      this.state.roofLight[2].animation.opacity.stopAnimation();
    }
  };

  render() {
    const { mode, popup, popupValue } = this.state;
    let arrow1 = new Animated.Value(0);
    let arrow2 = new Animated.Value(0);
    let arrow3 = new Animated.Value(0);
    let arrow4 = new Animated.Value(0);
    arrow1 = this.state.arrowTime.interpolate({
      inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
      outputRange: [0.6, 0.8, 1, 0, 0.2, 0.4],
    });

    arrow2 = this.state.arrowTime.interpolate({
      inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
      outputRange: [0.4, 0.6, 0.8, 1, 0, 0.2],
    });
    arrow3 = this.state.arrowTime.interpolate({
      inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
      outputRange: [0.2, 0.4, 0.6, 0.8, 1, 0],
    });
    arrow4 = this.state.arrowTime.interpolate({
      inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
      outputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
    });
    this.stopAnimation();
    this.animate();
    return (
      <View style={{ flex: 1, backgroundColor: popup ? "#222222" : "white" }}>
        <Animated.Image
          style={{
            width: width,
            height: height,
            resizeMode: "contain",
            top: wid(-97),
            position: "absolute",
            opacity: this.state.backgroundInverseAnim,
            zIndex: 0,
          }}
          source={this.state.prevImg}
        />
        <Animated.Image
          style={{
            width: width,
            height: height,
            resizeMode: "contain",
            top: wid(-97),
            position: "absolute",
            zIndex: 0,
            opacity: this.state.backgroundAnim,
          }}
          source={this.state.bgImg}
        />
        <Animated.Image
          source={require("../assets/Battery/Flow/white-light-b-p7.png")}
          style={{
            resizeMode: "contain",
            position: "absolute",
            display: this.state.mode == "morning" ? "flex" : "none",
            transform: [
              { translateY: this.state.towerLight[1].animation.y },
              { translateX: this.state.towerLight[1].animation.x },
            ],
            width: 20,
            height: 20,
            left: 130,
            // backgroundColor: "green",
            top: 277,
            opacity: this.state.towerLight[1].opacity,
          }}
        />
        <Animated.Image
          source={require("../assets/Battery/Flow/white-light-b-p7.png")}
          style={{
            resizeMode: "contain",
            position: "absolute",
            display: this.state.mode == "morning" ? "flex" : "none",
            transform: [
              { translateY: this.state.towerLight[2].animation.y },
              { translateX: this.state.towerLight[2].animation.x },
            ],
            width: 20,
            height: 20,
            left: 130,
            top: 277,
            opacity: this.state.towerLight[2].opacity,
          }}
        />
        <Animated.Image
          source={require("../assets/Battery/Flow/white-light-b-p7.png")}
          style={{
            resizeMode: "contain",
            position: "absolute",
            display: this.state.mode == "morning" ? "flex" : "none",
            transform: [
              { translateY: this.state.towerLight[0].animation.y },
              { translateX: this.state.towerLight[0].animation.x },
            ],
            width: 20,
            height: 20,
            // backgroundColor: "yellow",
            left: 130,
            top: 277,
            opacity: this.state.towerLight[0].opacity,
          }}
        />

        <Animated.Image
          source={require("../assets/Battery/Flow/yellow-light-b-p7.png")}
          style={{
            transform: [
              { translateY: this.state.roofLight[0].animation.y },
              { translateX: this.state.roofLight[0].animation.x },
            ],
            resizeMode: "contain",
            position: "absolute",
            width: 20,
            display: this.state.mode == "morning" ? "flex" : "none",
            height: 20,
            left: 432,
            top: 121.5,
            opacity: this.state.roofLight[0].opacity,
          }}
        />
        <Animated.Image
          source={require("../assets/Battery/Flow/yellow-light-b-p7.png")}
          style={{
            transform: [
              { translateY: this.state.roofLight[1].animation.y },
              { translateX: this.state.roofLight[1].animation.x },
            ],
            resizeMode: "contain",
            display: this.state.mode == "morning" ? "flex" : "none",
            position: "absolute",
            // width: 20,
            // height: 20,
            // left: 402,
            // top: 168,
            width: 20,
            height: 20,
            left: 432,
            top: 121.5,
            opacity: this.state.roofLight[1].opacity,
          }}
        />
        <Animated.Image
          source={require("../assets/Battery/Flow/yellow-light-b-p7.png")}
          style={{
            transform: [
              { translateY: this.state.roofLight[2].animation.y },
              { translateX: this.state.roofLight[2].animation.x },
            ],
            resizeMode: "contain",
            position: "absolute",
            display: this.state.mode == "morning" ? "flex" : "none",

            // width: 20,
            // height: 20,
            // left: 402,
            // top: 230,
            width: 20,
            height: 20,
            left: 432,
            top: 121.5,
            opacity: this.state.roofLight[2].opacity,
          }}
        />
        <Animated.Image
          source={require("../assets/Battery/Flow/yellow-wire-b-p7.png")}
          style={{
            resizeMode: "contain",
            position: "absolute",
            display: this.state.mode == "morning" ? "flex" : "none",
            width: 50,
            height: 120,
            left: 402,
            top: 133,
          }}
        />

        <Animated.Image
          source={require("../assets/Battery/Flow/yellow-light-b-p7.png")}
          style={{
            transform: [
              { translateY: this.state.midRoofLight[0].animation.y },
              { translateX: this.state.midRoofLight[0].animation.x },
            ],
            resizeMode: "contain",
            position: "absolute",
            width: 20,
            display: this.state.mode == "midday" ? "flex" : "none",
            height: 20,
            left: 432,
            top: 90,
            opacity: this.state.midRoofLight[0].opacity,
          }}
        />
        <Animated.Image
          source={require("../assets/Battery/Flow/yellow-light-b-p7.png")}
          style={{
            transform: [
              { translateY: this.state.midRoofLight[1].animation.y },
              { translateX: this.state.midRoofLight[1].animation.x },
            ],
            resizeMode: "contain",
            display: this.state.mode == "midday" ? "flex" : "none",
            position: "absolute",
            // width: 20,
            // height: 20,
            // left: 402,
            // top: 168,
            width: 20,
            height: 20,
            left: 432,
            top: 90,

            opacity: this.state.midRoofLight[1].opacity,
          }}
        />
        <Animated.Image
          source={require("../assets/Battery/Flow/yellow-light-b-p7.png")}
          style={{
            transform: [
              { translateY: this.state.midRoofLight[2].animation.y },
              { translateX: this.state.midRoofLight[2].animation.x },
            ],
            resizeMode: "contain",
            position: "absolute",
            display: this.state.mode == "midday" ? "flex" : "none",
            width: 20,
            height: 20,
            left: 432,
            top: 90,
            opacity: this.state.midRoofLight[2].opacity,
          }}
        />

        <Animated.Image
          source={require("../assets/Battery/Flow/yellow-tall-wire-b-p7.png")}
          style={{
            resizeMode: "contain",
            position: "absolute",
            display: this.state.mode == "midday" ? "flex" : "none",
            width: 72,
            height: 152,
            left: 391,
            top: 102,
          }}
        />
        <Animated.Image
          // source={require("../assets/Battery/Flow/blue-wire-b-p7.png")}
          source={
            this.state.mode == "night"
              ? require("../assets/Battery/Flow/green-wire-b-p7.png")
              : require("../assets/Battery/Flow/blue-wire-b-p7.png")
          }
          style={{
            resizeMode: "contain",
            position: "absolute",
            // display: this.state.mode == "midday" ? "flex" : "none",
            display: this.state.mode != "morning" ? "flex" : "none",
            width: 103,
            height: 110,
            left: 750,
            top: 250,
          }}
        />
        <Animated.Image
          // source={require("../assets/Battery/Flow/blue-line-wire-b-p7.png")}
          source={
            this.state.mode == "night"
              ? require("../assets/Battery/Flow/green-line-wire-b-p7.png")
              : require("../assets/Battery/Flow/blue-line-wire-b-p7.png")
          }
          style={{
            resizeMode: "contain",
            position: "absolute",
            // display: this.state.mode == "midday" ? "flex" : "none",
            display: this.state.mode != "morning" ? "flex" : "none",
            width: 5,
            height: 16,
            left: 720,
            top: 345,
          }}
        />
        <Animated.Image
          source={
            this.state.mode == "night"
              ? require("../assets/Battery/Flow/green-light-b-p7.png")
              : require("../assets/Battery/Flow/blue-light-b-p7.png")
          }
          style={{
            resizeMode: "contain",
            position: "absolute",
            display: this.state.mode != "morning" ? "flex" : "none",
            width: 20,
            height: 20,
            left: 712,
            top: 345,
            transform: [
              { translateY: this.state.midInverter[0].animation.y },
              { translateX: this.state.midInverter[0].animation.x },
            ],
            opacity: this.state.midInverter[0].opacity,
          }}
        />

        <Animated.Image
          source={
            this.state.mode == "night"
              ? require("../assets/Battery/Flow/green-light-b-p7.png")
              : require("../assets/Battery/Flow/blue-light-b-p7.png")
          }
          style={{
            resizeMode: "contain",
            position: "absolute",
            display: this.state.mode != "morning" ? "flex" : "none",
            width: 20,
            height: 20,
            left: 747,
            top: 349,
            // backgroundColor: "red",
            transform: [
              { translateY: this.state.batteryLight[0].animation.y },
              { translateX: this.state.batteryLight[0].animation.x },
            ],
            opacity: this.state.batteryLight[0].opacity,
          }}
        />
        <Animated.Image
          source={
            this.state.mode == "night"
              ? require("../assets/Battery/Flow/green-light-b-p7.png")
              : require("../assets/Battery/Flow/blue-light-b-p7.png")
          }
          style={{
            resizeMode: "contain",
            position: "absolute",
            display: this.state.mode != "morning" ? "flex" : "none",
            width: 20,
            height: 20,
            left: 747,
            top: 349,
            transform: [
              { translateY: this.state.batteryLight[1].animation.y },
              { translateX: this.state.batteryLight[1].animation.x },
            ],
            opacity: this.state.batteryLight[1].opacity,
          }}
        />

        <Animated.Image
          source={
            this.state.mode == "night"
              ? require("../assets/Battery/Flow/green-light-b-p7.png")
              : require("../assets/Battery/Flow/blue-light-b-p7.png")
          }
          style={{
            resizeMode: "contain",
            position: "absolute",
            display: this.state.mode != "morning" ? "flex" : "none",
            width: 20,
            height: 20,
            left: 701,
            top: 346,
            transform: [
              { translateY: this.state.midInverter[1].animation.y },
              { translateX: this.state.midInverter[1].animation.x },
            ],
            opacity: this.state.midInverter[1].opacity,
          }}
        />

        <Animated.Image
          source={
            this.state.mode == "night"
              ? require("../assets/Battery/Flow/green-line-wire-b-p7.png")
              : require("../assets/Battery/Flow/blue-line-wire-b-p7.png")
          }
          // source={require("../assets/Battery/Flow/blue-line-wire-b-p7.png")}
          style={{
            resizeMode: "contain",
            position: "absolute",
            display: this.state.mode != "morning" ? "flex" : "none",
            width: 6,
            height: 15,
            left: 708,
            top: 346,
          }}
        />

        <Animated.Image
          source={require("../assets/Battery/Flow/white-wire-b-p7.png")}
          style={{
            resizeMode: "contain",
            position: "absolute",
            display: this.state.mode == "morning" ? "flex" : "none",
            width: wid(80),
            // backgroundColor: "red",
            height: 80,
            left: 139,
            top: 260,
          }}
        />

        <View style={{ flex: 1.8, flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => this.props.back()}
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              top: -width * (9.5 / 1024),
            }}
          >
            <Image
              source={require("../assets/home-p4.png")}
              style={styles.headerImage}
            />
          </TouchableOpacity>
          <View
            style={{
              width: wid(300),
              height: wid(140),
              left: wid(170),
              top: wid(-0.3),
              //   opacity: 0.5,
              position: "absolute",
              justifyContent: "center",
            }}
          >
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
              <Text
                style={{
                  // fontFamily: "roboto-light",
                  fontSize: width * (23 / 1024),
                  left: width * (4.5 / 1024),
                  top: width * (6 / 1024),
                  letterSpacing: width * (1.9 / 1024),
                  color: "#FFFFFF",
                  opacity: 0.39,
                }}
              >
                {popup ? "Cost effective" : "Electricity flow"}
              </Text>
            </View>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text
                style={{
                  // fontFamily: "roboto-light",
                  fontSize: width * (23 / 1024),
                  left: width * (4.5 / 1024),
                  top: width * (-6.5 / 1024),
                  letterSpacing: width * (1.8 / 1024),
                  color: "#FFFFFF",
                }}
              >
                {popup
                  ? "PAYS FOR ITSELF"
                  : mode == "morning"
                  ? "MORNING"
                  : mode == "midday"
                  ? "MIDDAY"
                  : "NIGHT"}
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 6,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              top: -width * (12 / 1024),
              left: wid(252),
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                left: width * (0.5 / 1024),
                top: width * (0.5 / 1024),
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "white",
                  width: Dimensions.get("window").width * (110 / 1024),
                  alignItems: "center",
                  borderColor: "white",
                  borderWidth: wid(1),
                  justifyContent: "center",
                  borderRadius: Dimensions.get("window").width * 0.035,
                  height: Dimensions.get("window").width * 0.04,
                  marginRight: Dimensions.get("window").width * 0.015,
                  marginTop: Dimensions.get("window").width * 0.01,
                  left: width * (1 / 1024),
                }}
              >
                <Text
                  style={{
                    color: "#444444",
                    fontSize: Dimensions.get("window").width * (12 / 1024),
                    // fontFamily: "roboto-regular",
                    letterSpacing:
                      Dimensions.get("window").width * (0.4 / 1024),
                    left:
                      Dimensions.get("screen").width > 1024
                        ? width * (1 / 1024)
                        : wid(1.5),
                    top: width * (1 / 1024),
                  }}
                >
                  FLOW
                </Text>
              </TouchableOpacity>

              <Image
                source={require("../assets/down-arrow-p4.png")}
                style={{
                  width: Dimensions.get("window").width * 0.015,
                  height: Dimensions.get("window").width * 0.015,
                  marginTop: -(Dimensions.get("window").width * 0.008),
                  marginLeft: -(Dimensions.get("window").width * (12 / 1024)),
                }}
              />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                left: width * (-0.5 / 1024),
                top: width * (0.5 / 1024),
              }}
            >
              <TouchableOpacity
                onPress={() => this.props.changeDay()}
                style={{
                  backgroundColor: "transparent",
                  width: Dimensions.get("window").width * (110 / 1024),
                  borderColor: "#FFFFFF60",
                  borderWidth: wid(1),
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: Dimensions.get("window").width * 0.046,
                  height: Dimensions.get("window").width * 0.04,
                  marginLeft: Dimensions.get("window").width * 0.015,
                  marginTop: wid(1),
                }}
              >
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: Dimensions.get("window").width * (12 / 1024),
                    // fontFamily: "roboto-regular",
                    letterSpacing:
                      Dimensions.get("window").width * (0.4 / 1024),
                    left: width * (0.5 / 1024),
                    top: width * (1 / 1024),
                  }}
                >
                  USAGE
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              top: -width * (9.5 / 1024),
            }}
          >
            <Image
              source={require("../assets/nav-p4.png")}
              style={styles.headerImage}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 6 }}>
          <View style={{ flex: 1.7 }}>
            {popup && (
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                }}
              >
                <TapGestureHandler
                  enabled={popup}
                  onHandlerStateChange={() => {
                    this.changeBackground();
                    this.setState({ popup: false, popupValue: null });
                  }}
                >
                  <View style={{ flex: 1 }} />
                </TapGestureHandler>
                <View
                  style={{
                    flex: 3,
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  {popup && popupValue == 0 && (
                    <Text
                      style={{
                        position: "absolute",
                        // fontFamily: "roboto-medium",
                        fontSize: wid(77),
                        top: wid(100),
                        color: "white",
                        left: wid(192),
                        zIndex: 5,
                      }}
                    >
                      -
                    </Text>
                  )}
                  {popup && popupValue == 0 && (
                    <Text
                      style={{
                        position: "absolute",
                        // fontFamily: "roboto-medium",
                        fontSize: wid(75),
                        top: wid(101),
                        color: "white",
                        left: wid(359),
                        zIndex: 5,
                      }}
                    >
                      =
                    </Text>
                  )}
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => this.setState({ popupValue: 1 })}
                  >
                    <BlurView
                      intensity={popupValue && popupValue == 1 ? 100 : 100}
                      style={{
                        left: wid(-13.5),
                        width: wid(177.5),
                        top: wid(-15),
                        height: wid(231),
                        borderRadius: wid(10),
                      }}
                      tint={"dark"}
                    >
                      <View
                        style={{
                          flex: 1,
                          backgroundColor:
                            !popupValue || popupValue == 1
                              ? "#22222299"
                              : "#222222",
                        }}
                      >
                        <View
                          style={{
                            flex: 1,
                            justifyContent: "flex-end",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              // fontFamily: "roboto-medium",
                              fontSize: wid(23),
                              top: wid(-11.5),
                              left: wid(1),
                              letterSpacing: wid(1.8),
                              opacity: popupValue && popupValue != 1 ? 0.26 : 1,
                              color: "#ff3636",
                            }}
                          >
                            $5.16
                          </Text>
                          <Text
                            style={{
                              // fontFamily: "roboto-light",
                              fontSize: wid(10),
                              top: wid(-5),
                              left: wid(1),
                              letterSpacing: wid(-0.1),
                              opacity: popupValue && popupValue != 1 ? 0.26 : 1,

                              color: "white",
                            }}
                          >
                            Per day
                          </Text>
                        </View>
                        <View
                          style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "row",
                            opacity: popupValue && popupValue != 1 ? 0.26 : 1,
                          }}
                        >
                          <Text
                            style={{
                              // fontFamily: "roboto-light",
                              fontSize: wid(21),
                              color: "#444444",
                              letterSpacing: wid(1.8),
                            }}
                          >
                            {"("}
                          </Text>
                          <Text
                            style={{
                              // fontFamily: "roboto-medium",
                              fontSize: wid(12),
                              color: "#FF3636",
                              letterSpacing: wid(-0.3),
                            }}
                          >
                            {" 43¢  x  12 kWh "}
                          </Text>
                          <Text
                            style={{
                              // fontFamily: "roboto-light",
                              fontSize: wid(21),
                              color: "#444444",
                              letterSpacing: wid(1.8),
                              left: wid(2.5),
                              // top: -2,
                            }}
                          >
                            {")"}
                          </Text>
                        </View>
                        <View
                          style={{
                            flex: 1,
                            opacity: popupValue && popupValue != 1 ? 0.26 : 1,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: wid(24),
                              top: wid(-5),
                              left: wid(2),
                              // fontFamily: "roboto-medium",
                              letterSpacing: wid(1.8),
                              color: "#FF3636",
                            }}
                          >
                            PEAK
                          </Text>
                        </View>
                      </View>
                    </BlurView>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => this.setState({ popupValue: 2 })}
                  >
                    <BlurView
                      intensity={popupValue && popupValue == 2 ? 100 : 100}
                      style={{
                        left: wid(-13.5),
                        width: wid(177.5),
                        marginLeft: wid(1),
                        marginRight: wid(1),
                        top: wid(-15),
                        height: wid(231),
                        borderRadius: 10,
                      }}
                      tint={"dark"}
                    >
                      <View
                        style={{
                          flex: 1,
                          backgroundColor:
                            !popupValue || popupValue == 2
                              ? "#22222299"
                              : "#222222",
                        }}
                      >
                        <View
                          style={{
                            flex: 1,
                            justifyContent: "flex-end",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              // fontFamily: "roboto-medium",
                              fontSize: wid(23),
                              top: -wid(11.5),
                              left: wid(1),
                              letterSpacing: wid(1.8),
                              opacity: popupValue && popupValue != 2 ? 0.26 : 1,

                              color: "#00B0FF",
                            }}
                          >
                            $2.40
                          </Text>
                          <Text
                            style={{
                              // fontFamily: "roboto-light",
                              fontSize: wid(10),
                              top: wid(-5),
                              left: wid(1.5),
                              letterSpacing: wid(-0.1),
                              opacity: popupValue && popupValue != 2 ? 0.26 : 1,

                              color: "white",
                            }}
                          >
                            Per day
                          </Text>
                        </View>
                        <View
                          style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "row",
                          }}
                        >
                          <Text
                            style={{
                              // fontFamily: "roboto-light",
                              fontSize: wid(21),
                              color: "#444444",
                              opacity: popupValue && popupValue != 2 ? 0.26 : 1,
                              letterSpacing: wid(1.8),
                            }}
                          >
                            (
                          </Text>
                          <Text
                            style={{
                              // fontFamily: "roboto-medium",
                              fontSize: wid(12),
                              color: "#00A1F7",
                              left: wid(1),
                              letterSpacing: wid(-0.4),
                              opacity: popupValue && popupValue != 2 ? 0.26 : 1,
                            }}
                          >
                            {" 23¢  x  12 kWh "}
                          </Text>
                          <Text
                            style={{
                              // fontFamily: "roboto-light",
                              fontSize: wid(21),
                              color: "#444444",
                              letterSpacing: wid(1.8),
                              opacity: popupValue && popupValue != 2 ? 0.26 : 1,
                              left: wid(3),
                            }}
                          >
                            )
                          </Text>
                        </View>
                        <View
                          style={{
                            flex: 1,
                            // backgroundColor: "red",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: wid(24),
                              top: wid(-4),
                              left: wid(2),
                              // fontFamily: "roboto-medium",
                              letterSpacing: wid(1.2),
                              opacity: popupValue && popupValue != 2 ? 0.26 : 1,
                              color: "#00B0FF",
                            }}
                          >
                            OFF-PEAK
                          </Text>
                        </View>
                      </View>
                    </BlurView>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => this.setState({ popupValue: 3 })}
                  >
                    <BlurView
                      intensity={popupValue && popupValue == 3 ? 100 : 100}
                      style={{
                        left:
                          Dimensions.get("screen").width > 1024
                            ? wid(-13)
                            : wid(-14.2),
                        width: wid(177.5),
                        top: wid(-15),
                        height: wid(231),
                        borderRadius: wid(10),
                      }}
                      tint={"dark"}
                    >
                      <View
                        style={{
                          flex: 1,
                          backgroundColor:
                            !popupValue || popupValue == 3
                              ? "#22222299"
                              : "#222222",
                          left:
                            Dimensions.get("screen").width > 1024
                              ? wid(-0.5)
                              : null,
                        }}
                      >
                        <View
                          style={{
                            flex: 1,
                            justifyContent: "flex-end",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              // fontFamily: "roboto-medium",
                              fontSize: wid(23),
                              top: wid(-12),
                              left: wid(1),
                              letterSpacing: wid(1.8),
                              opacity: popupValue && popupValue != 3 ? 0.26 : 1,
                              color: "#15D951",
                            }}
                          >
                            $2.40
                          </Text>
                          <Text
                            style={{
                              // fontFamily: "roboto-light",
                              fontSize: wid(10),
                              top: wid(-5),
                              left: wid(2),
                              letterSpacing: wid(-0.1),
                              opacity: popupValue && popupValue != 3 ? 0.26 : 1,
                              color: "#FFFFFF",
                            }}
                          >
                            Per day
                          </Text>
                        </View>
                        <View
                          style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "row",
                          }}
                        >
                          <Text
                            style={{
                              // fontFamily: "roboto-medium",
                              fontSize: wid(34),
                              color: "#15D951",
                              opacity: popupValue && popupValue != 3 ? 0.26 : 1,
                              top: wid(3),
                            }}
                          >
                            $
                          </Text>
                          <Text
                            style={{
                              // fontFamily: "roboto-medium",
                              fontSize: wid(49),
                              top: wid(-2),
                              left: wid(-1),
                              color: "#15D951",
                              opacity: popupValue && popupValue != 3 ? 0.26 : 1,
                            }}
                          >
                            72
                          </Text>
                        </View>
                        <Text
                          style={{
                            // fontFamily: "roboto-light",
                            fontSize: wid(10),
                            position: "absolute",
                            color: "#FFFFFF",
                            bottom: wid(76),
                            opacity: popupValue && popupValue != 3 ? 0.26 : 1,
                            alignSelf: "center",
                          }}
                        >
                          Per month
                        </Text>
                        <View
                          style={{
                            flex: 1,
                            // backgroundColor: "red",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: wid(24),
                              top: wid(-4.5),
                              left: wid(2.5),
                              // fontFamily: "roboto-medium",
                              letterSpacing: wid(1.2),
                              color: "#15D951",
                              opacity: popupValue && popupValue != 3 ? 0.26 : 1,
                            }}
                          >
                            SAVED
                          </Text>
                        </View>
                      </View>
                    </BlurView>
                  </TouchableOpacity>
                </View>
                <TapGestureHandler
                  enabled={popup}
                  onHandlerStateChange={() => {
                    this.changeBackground();
                    this.setState({ popup: false, popupValue: null });
                  }}
                >
                  <View style={{ flex: 1 }} />
                </TapGestureHandler>
              </View>
            )}
            <Image
              style={{
                top: wid(55),
                right: wid(44),
                position: "absolute",
                alignSelf: "flex-end",
                resizeMode: "contain",
                width: wid(199),
                opacity: mode == "morning" ? 0.3 : 1,
                height: wid(177.6),
              }}
              source={require("../assets/Battery/Flow/battery-b-p2-p7.png")}
            />
            {mode !== "morning" && (
              <View
                style={{
                  top: wid(84.5),
                  right: wid(178),
                  position: "absolute",
                  alignSelf: "flex-end",
                  resizeMode: "contain",
                  width: wid(4.3),
                  borderRadius: wid(5),
                  overflow: "hidden",
                  borderWidth: wid(0.5),
                  borderColor: "#222222",
                  height: wid(135),
                }}
              >
                <View style={{ flex: 1, top: wid(-2.5) }}>
                  <View style={{ flex: 1 }} />
                  <Animated.Image
                    style={{
                      width: wid(3.1),
                      height: wid(3.3),
                      flex: 1,
                      opacity: mode == "midday" ? arrow4 : arrow1,
                      top: wid(1.5),
                    }}
                    resizeMode={"contain"}
                    source={
                      mode == "midday"
                        ? require("../assets/Battery/Flow/up-arrow-b-p7.png")
                        : require("../assets/Battery/Flow/down-arrow-b-p7.png")
                    }
                  />
                  <Animated.Image
                    style={{
                      width: wid(3.1),
                      height: wid(3.3),
                      flex: 1,
                      resizeMode: "contain",
                      opacity: mode == "midday" ? arrow3 : arrow2,
                      top: wid(1.5),
                    }}
                    resizeMode={"contain"}
                    source={
                      mode == "midday"
                        ? require("../assets/Battery/Flow/up-arrow-b-p7.png")
                        : require("../assets/Battery/Flow/down-arrow-b-p7.png")
                    }
                  />
                  <Animated.Image
                    style={{
                      width: wid(3.1),
                      height: wid(3.3),
                      flex: 1,
                      opacity: mode == "midday" ? arrow2 : arrow3,
                    }}
                    resizeMode={"contain"}
                    source={
                      mode == "midday"
                        ? require("../assets/Battery/Flow/up-arrow-b-p7.png")
                        : require("../assets/Battery/Flow/down-arrow-b-p7.png")
                    }
                  />
                  <Animated.Image
                    style={{
                      width: wid(3.1),
                      height: wid(3.3),
                      flex: 1,
                      opacity: mode == "midday" ? arrow1 : arrow4,
                    }}
                    resizeMode={"contain"}
                    source={
                      mode == "midday"
                        ? require("../assets/Battery/Flow/up-arrow-b-p7.png")
                        : require("../assets/Battery/Flow/down-arrow-b-p7.png")
                    }
                  />
                </View>
                <View
                  style={{
                    flex: 2,
                    backgroundColor: mode == "midday" ? "#00B0FF" : "#15D951",
                    left:
                      Dimensions.get("screen").width > 1024 ? -wid(0.3) : null,
                  }}
                />
              </View>
            )}
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
            }}
          >
            <Animated.View
              {...this.panResponder.panHandlers}
              style={{
                width: width,
                height: "95%",
                position: "absolute",
                zIndex: 4,
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  width: wid(29),
                  height: wid(29),
                  position: "absolute",
                  justifyContent: "flex-end",
                  right: wid(34),
                  top: wid(-4),
                  zIndex: 4,
                }}
              >
                {/* {!this.state.popup && ( */}
                <TouchableOpacity
                  onPress={() => {
                    this.setState(
                      {
                        mode: "night",
                        popup: !this.state.popup,
                        popupValue: this.state.popup ? null : 0,
                      },
                      () => {
                        this.changeBackground(this.state.popup);
                      }
                    );
                  }}
                >
                  <Image
                    source={require("../assets/Battery/Flow/info-b-p7.png")}
                    style={{
                      resizeMode: "contain",
                      width: wid(27),
                      height: wid(27),
                      left: wid(1),
                      top: -wid(0.8),
                    }}
                  />
                </TouchableOpacity>
                {/* )} */}
              </View>
              <Animated.View
                {...this.panResponder.panHandlers}
                style={{
                  // backgroundColor: "red",
                  flex: 0.01,
                  display: this.state.popup,
                  transform: [{ translateX: this.pan.x }],
                  borderRightWidth: wid(1),
                  top: wid(5),
                  left:
                    this.state.mode == "midday"
                      ? wid(-0.5)
                      : this.state.popup
                      ? Dimensions.get("screen").width > 1024
                        ? null
                        : wid(-0.5)
                      : wid(0.5),
                  borderRightColor: "#FFFFFF30",
                }}
              />
              <TouchableOpacity
                style={{ display: this.state.popup }}
                hitSlop={
                  this.state.popup
                    ? Dimensions.get("screen") > 1024
                      ? {
                          left: wid(-20),
                          right: wid(10),
                        }
                      : null
                    : {
                        left: wid(30),
                        right: wid(30),
                        bottom: wid(30),
                        top: wid(30),
                      }
                }
                onPress={() => {
                  this.changeBackground();
                  popup
                    ? this.setState(
                        { popup: false, popupValue: null, mode: "night" },
                        () => {
                          this.changeBackground();
                        }
                      )
                    : null;
                }}
              >
                <Animated.Image
                  source={require("../assets/Battery/Flow/player-knob-b-p7.png")}
                  style={{
                    transform: [{ translateX: this.pan.x }],
                    resizeMode: "contain",
                    width: width * (27 / 1024),
                    height: width * (27 / 1024),
                    top: wid(-3),
                    left: this.state.popup
                      ? Dimensions.get("screen").width > 1024
                        ? wid(-14.5)
                        : wid(-15)
                      : this.state.mode == "morning"
                      ? Dimensions.get("screen").width > 1024
                        ? wid(-13.5)
                        : wid(-13)
                      : this.state.mode == "night"
                      ? -wid(14)
                      : this.state.mode == "midday"
                      ? -wid(15)
                      : null,
                  }}
                />
              </TouchableOpacity>
            </Animated.View>
            <Image
              style={{
                width: width,
                height: wid(180),
                top: wid(8),
                resizeMode: "contain",
              }}
              source={
                popup
                  ? popupValue == 0
                    ? require("../assets/Battery/Flow/player-bg1-b-p7.png")
                    : popupValue && popupValue == 1
                    ? require("../assets/Battery/Flow/player-bg2-b-p7.png")
                    : popupValue && popupValue == 2
                    ? require("../assets/Battery/Flow/player-bg3-b-p7.png")
                    : require("../assets/Battery/Flow/player-bg4-b-p7.png")
                  : require("../assets/Battery/Flow/player-bg-b-p7.png")
              }
            />
            {popupValue == 2 || popupValue == 0 ? (
              <TouchableOpacity
                onPress={() => this.setState({ popupValue: 2 })}
                style={{
                  position: "absolute",
                  top: wid(45),
                  left: wid(512),
                  zIndex: 10,
                }}
              >
                <Text // stored power
                  style={{
                    // fontFamily: "roboto-medium",
                    fontSize: wid(20),
                    color: "white",
                    letterSpacing: wid(1.0),
                  }}
                >
                  $ 0.23 ¢
                </Text>
              </TouchableOpacity>
            ) : null}
            {popupValue == 3 || popupValue == 0 ? (
              <TouchableOpacity
                hitSlop={{ left: 50, right: 50, top: 50, bottom: 50 }}
                onPress={() => this.setState({ popupValue: 3 })}
                style={{
                  top: wid(45.5),
                  left: wid(768),
                  position: "absolute",
                  zIndex: 20,
                }}
              >
                <Text //Stored
                  style={{
                    // fontFamily: "roboto-medium",
                    fontSize: wid(19),
                    color: "#FFFFFF",
                    letterSpacing: wid(1.8),
                  }}
                >
                  STORED
                </Text>
              </TouchableOpacity>
            ) : null}

            {/* {popupValue == 1 || popupValue == 0 ? (
              <TouchableOpacity
                onPress={() => this.setState({ popupValue: 1 })}
                style={{
                  top: wid(116),
                  left: wid(768),
                  position: "absolute",
                  zIndex: 10,
                }}
              >
                <Text //
                  style={{
                    // fontFamily: "roboto-medium",
                    fontSize: wid(19),
                    color: "#FFFFFF",
                    // position: "absolute",
                    letterSpacing: wid(1.5),
                    // zIndex: 1,
                  }}
                >
                  $ 0.43 ¢
                </Text>
              </TouchableOpacity>
            ) : null} */}

            {popupValue == 2 || popupValue == 0 ? (
              <Text // stored power
                style={{
                  // fontFamily: "roboto-light",
                  fontSize: wid(10),
                  color: "#3EC3FF",
                  position: "absolute",
                  top: wid(20),
                  letterSpacing: wid(0.2),
                  left: wid(496),
                }}
              >
                Stored power at low rate
              </Text>
            ) : null}
            {popup ? (
              <Text
                style={{
                  // fontFamily: "roboto-light",
                  fontSize: wid(10),
                  color: "#FF3636",
                  position: "absolute",
                  letterSpacing: wid(0.15),
                  top: wid(150.5),
                  left: wid(728.5),
                }}
              >
                Peak rate you pay without a battery
              </Text>
            ) : null}

            {!popup || popupValue == 2 || popupValue == 0 ? (
              <Text
                style={{
                  // fontFamily: "roboto-regular",
                  fontSize: wid(10),
                  color: "#3EC3FF",
                  position: "absolute",
                  top: wid(38),
                  letterSpacing: wid(0.2),
                  left: wid(294.7),
                }}
              >
                Battery charging begins
              </Text>
            ) : null}
            {!popup || popupValue == 2 || popupValue == 0 ? (
              <Text
                style={{
                  // fontFamily: "roboto-regular",
                  fontSize: wid(10),
                  color: "#3EC3FF",
                  position: "absolute",
                  top: wid(38),
                  letterSpacing: wid(0.1),
                  left: wid(512.5),
                }}
              >
                Peak charging
              </Text>
            ) : null}

            {!popup || popupValue == 3 || popupValue == 0 ? (
              <Text
                style={{
                  // fontFamily: "roboto-regular",
                  fontSize: wid(10),
                  color: "#15D951",
                  position: "absolute",
                  top: popup ? wid(20) : wid(38),
                  letterSpacing: wid(0.2),
                  left: popup ? wid(777) : wid(730),
                }}
              >
                Battery in use
              </Text>
            ) : null}
            <Text
              style={{
                // fontFamily: "roboto-regular",
                fontSize: wid(10),
                color: "#FF8900",
                position: "absolute",
                top: wid(99.5),
                letterSpacing: wid(0.1),
                left: wid(37.5),
              }}
            >
              Power usage
            </Text>
            <Text
              style={{
                // fontFamily: "roboto-regular",
                fontSize: wid(10),
                color: "#EBC51B",
                position: "absolute",
                top: wid(86.5),
                letterSpacing: wid(0.1),
                left: wid(421),
              }}
            >
              Solar production
            </Text>
            {!popup && (
              <Text
                style={{
                  // fontFamily: "roboto-regular",
                  fontSize: wid(10),
                  color: "#FF3636",
                  position: "absolute",
                  top: wid(162),
                  letterSpacing: wid(0.2),
                  left: wid(610.5),
                }}
              >
                Peak rate period
              </Text>
            )}
          </View>
          <View
            style={{
              position: "absolute",
              width: width,
              flexDirection: "row",
              bottom: popup ? wid(40) : wid(37),
              opacity: 0.6,
            }}
          >
            <Text
              style={{
                flex: 1,
                textAlign: "center",
                fontSize: wid(10),
                left: wid(-13),
                // fontFamily: "roboto-regular",
                color: "#FFFFFF",
              }}
            >
              2am
            </Text>
            <Text
              style={{
                flex: 1,
                textAlign: "center",
                fontSize: wid(10),
                left: wid(-14.5),
                // fontFamily: "roboto-regular",
                color: "white",
              }}
            >
              4am
            </Text>
            <Text
              style={{
                flex: 1,
                textAlign: "center",
                fontSize: wid(10),
                left: wid(-15),
                // fontFamily: "roboto-regular",
                color: "white",
              }}
            >
              6am
            </Text>

            <Text
              style={{
                flex: 1,
                textAlign: "center",
                fontSize: wid(10),
                left: wid(-16.5),
                // fontFamily: "roboto-regular",
                color: "white",
              }}
            >
              8am
            </Text>

            <Text
              style={{
                flex: 1,
                textAlign: "center",
                fontSize: wid(10),
                left: wid(-13.5),
                // fontFamily: "roboto-regular",
                color: "white",
              }}
            >
              10am
            </Text>

            <Text
              style={{
                flex: 1,
                textAlign: "center",
                fontSize: wid(10),
                left: wid(-8),
                // fontFamily: "roboto-regular",
                color: "white",
              }}
            >
              12pm
            </Text>

            <Text
              style={{
                flex: 1,
                textAlign: "center",
                fontSize: wid(10),
                left: wid(-4),
                // fontFamily: "roboto-regular",
                color: "white",
              }}
            >
              2pm
            </Text>
            <Text
              style={{
                flex: 1,
                textAlign: "center",
                fontSize: wid(10),
                left: wid(-3.5),
                // fontFamily: "roboto-regular",
                color: "white",
              }}
            >
              4pm
            </Text>

            <Text
              style={{
                flex: 1,
                textAlign: "center",
                fontSize: wid(10),
                left: wid(-2),
                // fontFamily: "roboto-regular",
                color: "white",
              }}
            >
              6pm
            </Text>
            <Text
              style={{
                flex: 1,
                textAlign: "center",
                fontSize: wid(10),
                left: wid(-2),
                // fontFamily: "roboto-regular",
                color: "white",
              }}
            >
              {"8pm"}
            </Text>
            <Text
              style={{
                flex: 1,
                textAlign: "center",
                fontSize: wid(10),
                left: wid(2),
                // fontFamily: "roboto-regular",
                color: "white",
              }}
            >
              10pm
            </Text>

            <Text
              style={{
                flex: 1,
                textAlign: "center",
                fontSize: wid(10),
                left: wid(9.5),
                // fontFamily: "roboto-regular",
                color: "white",
              }}
            >
              12am
            </Text>
          </View>

          {this.state.popupValue == 0 || this.state.popupValue == 1 ? (
            <View
              style={{
                position: "absolute",
                top: wid(450),
                left: wid(757),
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "center",
                height: wid(10),
                width: wid(100),
              }}
            >
              <ImageBackground
                resizeMode={"contain"}
                source={require("../assets/Battery/Flow/peak-b-b7.png")}
                style={{ width: wid(197), height: wid(92) }}
              >
                <TouchableOpacity
                  onPress={() => this.setState({ popupValue: 1 })}
                  style={{
                    top: wid(92 / 3),
                    left: wid(55.5),
                  }}
                >
                  <Text
                    style={{
                      // fontFamily: "roboto-medium",
                      fontSize: wid(19),
                      color: "#FFFFFF",
                      letterSpacing: wid(1.5),
                      left: wid(-1),
                    }}
                  >
                    $ 0.43 ¢
                  </Text>
                </TouchableOpacity>
              </ImageBackground>
            </View>
          ) : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: Dimensions.get("window").width * 0.015,
  },
  headerImage: {
    width: Dimensions.get("window").width * (55.5 / 1024),
    height: Dimensions.get("window").width * (55.5 / 1024),
  },
  titleText: {
    color: "white",
    fontSize: Dimensions.get("window").width * (24 / 1024),
    // fontFamily: "roboto-light",
    letterSpacing: Dimensions.get("window").width * (1.8 / 1024),
    color: "#FFFFFF",
  },
  titleDescription: {
    color: "#FFFFFF",
    fontSize: Dimensions.get("window").width * (15 / 1024),
    // fontFamily: "roboto-light",
    letterSpacing: width * (0.5 / 1024),
    lineHeight: Dimensions.get("window").width * 0.018,
    // fontWeight: "900"
  },
  sliderText: {
    letterSpacing: Dimensions.get("window").width * 0.002,
    fontSize: Dimensions.get("window").width * 0.006,
    color: "#777",
    paddingTop: Dimensions.get("window").height * 0.01,
    // fontFamily: "roboto-regular",
  },
});
