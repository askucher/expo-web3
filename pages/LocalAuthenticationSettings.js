import React, { useState } from "react";
import {
  Left,
  Body,
  Right,
  Text,
  Button,
  View,
  Icon,
  Header,
  Item,
  Input
} from "native-base";
import styles from "../Styles.js";
import {
  ScrollView,
  StatusBar,
  Image,
  ImageBackground,
  runAfterInteractions,
  BackHandler,
  Alert
} from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import Toast from "@rimiti/react-native-toastify";
import * as SecureStore from "expo-secure-store";
import GradientButton from "react-native-gradient-buttons";
import Images from "../Images.js";
import getLang from "../wallet/get-lang.js";
import BackButton from "../components/BackButton.js";
import Background from "../components/Background.js";



//TODO: remove
// const LocalAuthSettingsPage = ({ store, web3t }) => {
//   const [hasKey, setHasKey] = useState(null);
//   const [toastify, setToastify] = useState(null);
//   const showToast = message => {
//     console.log("Trying to show toast", message);
//     toastify && toastify.show(message, 3000);
//   };
//   const lang = getLang(store);
//
//   const disable = async () => {
//     if (store.current.pin === store.current.pinSave) {
//       await SecureStore.deleteItemAsync("localAuthToken");
//       showToast("Local Authentication disabled");
//       store.current.page = "settings";
//       store.current.pin = "";
//     } else if (store.current.pin != store.current.pinSave) {
//       showToast("Incorrect password");
//       store.current.pin = "";
//     }
//   };
//
//   const enable = () => {
//     if (store.current.pin === store.current.pinSave) {
//       store.current.page = "LocalAuthenticationEnable";
//       store.current.pin = "";
//     } else if (store.current.pin != store.current.pinSave) {
//       showToast("Incorrect password");
//       store.current.pin = "";
//     }
//   };
//
//   if (hasKey === null) {
//     SecureStore.getItemAsync("localAuthToken").then(pin => {
//       setHasKey(pin !== null);
//     });
//   }
//   if (hasKey) {
//     return (
//       <>
//         <Toast ref={setToastify} position="top" style={styles.toastStyle1} />
//         <GradientButton
//           style={styles.gradientBtnPh}
//           text={lang.disable}
//           textStyle={{ fontSize: 14, color: Images.color1 }}
//           gradientBegin="#fff"
//           gradientEnd="#fff"
//           gradientDirection="diagonal"
//           height={45}
//           width="80%"
//           radius={5}
//           onPressAction={disable}
//         />
//       </>
//     );
//   }
//   return (
//     <>
//       <Toast ref={setToastify} position="top" style={styles.toastStyle1} />
//       <GradientButton
//         style={styles.gradientBtnPh}
//         text={lang.enable}
//         textStyle={{ fontSize: 14, color: Images.color1 }}
//         gradientBegin="#fff"
//         gradientEnd="#fff"
//         gradientDirection="diagonal"
//         height={45}
//         width="80%"
//         radius={5}
//         onPressAction={enable}
//       />
//     </>
//   );
// };

export default ({ store, web3t }) => {
  const lang = getLang(store);
  SecureStore.getItemAsync("localAuthToken").then(pin => {
    if (pin) {
      SecureStore.deleteItemAsync("localAuthToken").then(() => {
        //TODO: show toast
        // showToast("Local Authentication disabled");
        store.current.page = "settings";
        Alert.alert("Local Authentication now disabled", "", [
          { text: lang.ok, onPress: () => console.log("OK Pressed") }
        ]);
      });
    } else {
      store.current.page = "LocalAuthenticationEnable";
    }
  });

  return null;

//TODO: remove
  // const lang = getLang(store);
  // const regexPin = /[0-9a-zA-Z]{6,}/;
  // const validInputPin = !store.current.pin || regexPin.test(store.current.pin);
  // const handleChangePin = async text => {
  //   store.current.pin = text;
  // };
  // const inputSuccessPin = store => {
  //   return (
  //     <Item style={styles.borderItem}>
  //       <Icon active name='lock' style={{color: "#fff"}}/>
  //       <Input
  //         onChangeText={text => handleChangePin(text)}
  //         value={store.current.pin}
  //         autoCompleteType="off"
  //         minLength={6}
  //         // autoFocus
  //         secureTextEntry={true}
  //         returnKeyType="done"
  //         placeholder={lang.placeholderSignup}
  //         keyboardType="default"
  //         placeholderTextColor="rgba(255,255,255,0.60)"
  //         style={styles.inputSize}
  //         selectionColor={"#fff"}
  //         keyboardAppearance="dark"
  //       />
  //     </Item>
  //   );
  // };
  //
  // const back = () => {
  //   store.current.page = "settings";
  // };
  //
  // return (
  //   <View style={styles.viewFlex}>
  //     <Background fullscreen={true}/>
  //       <Header transparent style={styles.mtIphoneX}>
  //         <Left style={styles.viewFlexHeader}>
  //           <BackButton onBack={back}/>
  //         </Left>
  //         <Body style={styles.viewFlexHeader} />
  //         <Right style={styles.viewFlexHeader} />
  //       </Header>
  //       <StatusBar barStyle="light-content" translucent={true} backgroundColor={'transparent'}/>
  //       <View style={styles.containerFlexStart}>
  //       <Image
  //           source={Images.logo}
  //           style={styles.styleLogo}
  //         />
  //         <View style={styles.widthCard}>
  //           <View style={styles.titleInput}>
  //             <Text style={styles.textH1Seed}>{lang.yourPassword}</Text>
  //           </View>
  //           {inputSuccessPin(store)}
  //           {!validInputPin && (
  //             <Text style={styles.error}>{lang.validPin}</Text>
  //           )}
  //           {/* {Unlock(store)} */}
  //           {/* <Unlock store={store} web3t={web3t}/> */}
  //         </View>
  //         <View style={styles.viewMtLocal}/>
  //         <LocalAuthSettingsPage store={store} web3t={web3t} />
  //       </View>
  //   </View>
  // );
};
