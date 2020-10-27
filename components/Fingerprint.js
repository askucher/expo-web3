import * as React from "react";
import {
  Text,
  View,
  Modal,
  Image,
  Platform,
  ImageBackground,
} from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import GradientButton from "../components/GradientButton.js";
import Images from "../Images.js";
import styles from "../Styles.js";
import Background from "./Background.js";
import { LinearGradient } from "expo-linear-gradient";

export default class Fingerprint extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    authenticated: false,
    modalVisible: false,
    failedCount: 0,
    error: null
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  clearState = () => {
    this.setState({ authenticated: false, failedCount: 0, error: null });
  };

  scanFingerPrint = async () => {
    try {
      console.log("scanFingerPrint");
      let results = await LocalAuthentication.authenticateAsync({
        promptMessage:
          "Please Authenticate yourself using Fingerprint or Face ID",
        fallbackLabel: "",
      });
      if (results.success) {
        this.setState({
          modalVisible: false,
          authenticated: true,
          failedCount: 0,
        });
        this.props.onSuccess();
      } else {
        console.log("authenticateAsync failed", result);

        if (results.error === "lockout") {
          alert("Too many failed tries. Restart wallet and try again.");
          return this.props.onCancel && this.props.onCancel();
        }
        this.setState(
          {
            failedCount: this.state.failedCount + 1,
            error: results.error
          },
          this.scanFingerPrint
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <View style={styles.viewFlexFp}>
        <Background fullscreen={true}/>
        {this.state.authenticated && (
          <Text style={styles.textFp}>Authentication Successful! 🎉</Text>
        )}

        <Modal
          animationType="slide"
          transparent={true}
          visible={true}
          onShow={this.scanFingerPrint}
        >
          <View style={styles.modalFp}>
            <LinearGradient
              colors={[Images.color1, Images.color1, Images.color2]}
              style={styles.linearGradientBg}
            >
              <View style={styles.containerScreen}>
                <Text style={[styles.titleBlack , {paddingVertical: 20}]}>
                  Authenticate with fingerprint
                </Text>
                <Image
                  style={styles.imageFinger}
                  source={Images.fingerPrint}
                />
                {this.state.failedCount > 0 && (
                <Text style={{ color: "white", fontSize: 14 }}>
                  Try again.
                </Text>
              )}
                <View style={styles.marginBtn}>
                  <GradientButton
                    style={styles.gradientBtnPh}
                    text={"Cancel"}
                    textStyle={{ fontSize: 14, color: Images.color1 }}
                    gradientBegin="#fff"
                    gradientEnd="#fff"
                    gradientDirection="diagonal"
                    height={45}
                    width="100%"
                    radius={5}
                    onPressAction={async () => {
                      try {
                        LocalAuthentication.cancelAuthenticate().catch(()=>{});
                      }catch(e){}
                      this.props.onCancel && this.props.onCancel();
                      this.setModalVisible(!this.state.modalVisible);
                    }}
                  />
                </View>
              </View>
            </LinearGradient>
          </View>
        </Modal>
      </View>
    );
  }
}
