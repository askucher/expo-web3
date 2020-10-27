import React from 'react';
import { Text, View, Button, Alert, Vibration, TouchableHighlight} from 'react-native';
import styles from "../Styles.js";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
import {shuffle} from "../utils/array.js";

export default function DemoMode({store}) {
  function onDemoClick() {
    store.current.seedIndex = 0;
    store.current.seedIndexes = shuffle([...Array(store.current.seed.split(' ').length).keys()]);
    store.current.page = "generatedseed";
  };

  function DemoModeContent() {
    return (
      <TouchableHighlight onPress={onDemoClick} onLongPress={onDemoClick} underlayColor="yellow">
        <View style={styles.demoView}>
            <Text style={styles.demoTxt}>
              This is a demo mode. Please save your seed phrase for full access to the wallet
            </Text>
        </View>
      </TouchableHighlight>
    );
  }

  return (
    <View>
      <DemoModeContent/>
    </View>
  );
}
