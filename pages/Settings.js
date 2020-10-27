import React, {useState} from "react";
import {
  Content,
  ListItem,
  Left,
  Body,
  Right,
  Text,
  View,
  Title,
  Icon,
  Header,
  Separator,
  Button
} from "native-base";
import { Linking, Platform, ScrollView } from "react-native";
import Constants from 'expo-constants';
import styles from "../Styles.js";
import Footer from "./Footer.js";
import StatusBar from "../components/StatusBar.js";
import getLang from "../wallet/get-lang.js";
import PickerSetLang from "../components/PickerSetLang.js";
import PickerAccountIndex from "../components/PickerAccountIndex.js";
import * as LocalAuthentication from 'expo-local-authentication';
import Background from "../components/Background.js";
import Images from "../Images.js";
import { LinearGradient } from "expo-linear-gradient";

const LocalAuthListView = ({store}) => {
  // const [localAuthEnabled, setLocalAuthEnabled] = useState(null);
  // if (localAuthEnabled === null) {
  //   console.log("Requesting LocalAuthentication params");
  //   Promise.all([
  //     LocalAuthentication.hasHardwareAsync(),
  //     LocalAuthentication.supportedAuthenticationTypesAsync(),
  //     LocalAuthentication.isEnrolledAsync()
  //   ]).then(([hasHardware, supportedAuthTypes, isEnrolled]) => {
  //     console.log("LocalAuthentication params", hasHardware, supportedAuthTypes, isEnrolled);
  //     setLocalAuthEnabled(hasHardware && isEnrolled && supportedAuthTypes.length > 0);
  //   });
  // }
  // if (!localAuthEnabled) {
  //   return null;
  // }
  const lang = getLang(store);

  const touchFinger = () => {
    if (Platform.OS === 'android') {
    return <Text style={styles.txtSettings}>{lang.touchIdAndroid}</Text>;
    }
    else if (Platform.OS === 'ios') {
      return <Text style={styles.txtSettings}>{lang.touchId} / {lang.faceId}</Text>;
    }
  }

  return (
    <ListItem
      icon
      onPress={() => {
        store.current.page = "LocalAuthenticationSettings";
      }}
      style={styles.heightListItem}
    >
      <Left>
        <Icon name="finger-print" style={styles.styleTxtSettings}/>
      </Left>
      <Body style={styles.heightListItem}>
        {touchFinger()}
      </Body>
      <Right style={styles.heightListItem}>
        <Icon name="ios-arrow-forward" />
      </Right>
    </ListItem>
  );
};

export default ({ store, web3t }) => {
  const logoutBtn = async () => {
    store.current.page = "locked";
  };
  const lang = getLang(store);

  const termsBtn = async () => {
    store.current.page = "terms";
  };


  return (

      <View style={styles.viewFlex}>
      <Background fullscreen={true}/>


        <Header transparent style={styles.mtIphoneX}>
          <Left style={styles.viewFlexHeader} />
          <Body style={styles.viewFlexHeader}>
            <Title style={styles.titleBlack}>{lang.settings}</Title>
          </Body>
          <Right style={styles.viewFlexHeader}/>

        </Header>
        <StatusBar
              barStyle="light-content"
              translucent={true}
              backgroundColor={"transparent"}
            />

        <Content>
          <Separator bordered style={styles.seperatorStyle}>
            <Text style={styles.styleTxtSeparator}>{lang.help}</Text>
          </Separator>
          <ListItem
            icon
            onPress={() => {
              Linking.openURL(`https://support.velas.com/hc/en-150`);
            }}
            underlayColor={Images.color1}
            style={styles.heightListItem}
          >
            <Left>
              <Icon name="ios-text" style={styles.styleTxtSettings}/>
            </Left>
            <Body style={styles.heightListItem}>
              <Text style={styles.txtSettings}>{lang.support}</Text>
            </Body>
            <Right style={styles.heightListItem}>
              <Icon name="ios-arrow-forward" />
            </Right>
          </ListItem>

          <ListItem
            icon
            onPress={() => {
              Linking.openURL(`https://raw.githubusercontent.com/askucher/expo-web3/dev/Privacy.md`);
            }}
            underlayColor={Images.color1}
            style={styles.heightListItem}
          >
            <Left>
              <Icon name="md-document" style={styles.styleTxtSettings}/>
            </Left>
            <Body style={styles.heightListItem}>
              <Text style={styles.txtSettings}>{lang.privacyPolicy}</Text>
            </Body>
            <Right style={styles.heightListItem}>
              <Icon name="ios-arrow-forward" />
            </Right>
          </ListItem>

          <ListItem
            icon
            onPress={() => {
              Linking.openURL(
                `https://raw.githubusercontent.com/askucher/expo-web3/dev/TERMS.md`
              );
            }}
            underlayColor={Images.color1}
            style={styles.heightListItem}
          >
            <Left>
              <Icon name="md-document" style={styles.styleTxtSettings}/>
            </Left>
            <Body style={styles.heightListItem}>
              <Text style={styles.txtSettings}>{lang.termsOfUse}</Text>
            </Body>
            <Right style={styles.heightListItem}>
              <Icon name="ios-arrow-forward" />
            </Right>
          </ListItem>

          <Separator bordered style={styles.seperatorStyle}>
            <Text style={styles.styleTxtSeparator}>{lang.profile}</Text>
          </Separator>
          <ListItem icon style={styles.heightListItem} underlayColor={Images.color1}>
            <Left>
              <Icon name="ios-wallet" style={styles.styleTxtSettings}/>
            </Left>
            <Body style={styles.heightListItem}>
              {PickerAccountIndex({ store, web3t })}
            </Body>
            <Right style={styles.heightListItem}/>
          </ListItem>
          <ListItem icon style={styles.heightListItem} underlayColor={Images.color1}>
            <Left>
              <Icon name="md-globe" style={styles.styleTxtSettings}/>
            </Left>
            <Body style={styles.heightListItem}>
              {PickerSetLang({ store })}
            </Body>
            <Right style={styles.heightListItem} />
          </ListItem>
          <LocalAuthListView store={store}/>

          <Separator bordered style={styles.seperatorStyle}>
            <Text style={styles.styleTxtSeparator}>{lang.security}</Text>
          </Separator>

          <ListItem icon style={styles.heightListItem} last underlayColor={Images.color1} onPress={logoutBtn}>
            <Left>
              <Icon name="ios-log-out" style={styles.styleTxtSettings}/>
            </Left>
            <Body style={styles.heightListItem}>
              <Text style={styles.txtSettings}>{lang.logOut}</Text>
            </Body>
            <Right style={styles.heightListItem} />
          </ListItem>



            <Separator bordered style={[styles.seperatorStyle, {backgroundColor: "transparent", opacity: 0.50}]}>
              <Text style={[styles.styleTxtSeparator, {textAlign: "center"} ]}>{lang.version} {Constants.manifest.version}</Text>
            </Separator>


          <View style={styles.paddingSettings}/>
        </Content>

        <Footer store={store}></Footer>
      </View>

  );
};
