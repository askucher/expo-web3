import React from "react";
import {
  Left,
  Right,
  Text,
  Button,
  View,
  Icon,
  Item,
  Input,
  Title,
  Body,
  Header,
  Thumbnail,
  Label
} from "native-base";
import { observe } from "mobx";
import styles from "../Styles.js";
// import StandardLinearGradient from "../components/StandardLinearGradient.js";
import Toast from "@rimiti/react-native-toastify";
import GradientButton from "../components/GradientButton.js";
import RefreshControl from "../components/RefreshControl.js";
import sendFuncs from "../wallet/send-funcs.js";
import walletsFuncs from "../wallet/wallets-funcs.js";
import Spinner from "../utils/spinner.js";
import StatusBar from "../components/StatusBar.js";
import getLang from "../wallet/get-lang.js";
import BackButton from "../components/BackButton.js";
import Background from "../components/Background.js";
import Images from "../Images.js";
import { LinearGradient } from "expo-linear-gradient";
import {
  Image, TouchableOpacity
} from "react-native";

const showToast = (message) => {
  // console.log(message);
  this.toastify.show(message, 3000);
};

const btnWithdrawBtc = ({ store, web3t }) => {
  const {
    token,
    feeToken,
    network,
    send,
    wallet,
    pending,
    recipientChange,
    amountChange,
    amountUsdChange,
    amountEurChange,
    useMaxAmount,
    showData,
    showLabel,
    topup,
    history,
    cancel,
    sendAnyway,
    chooseAuto,
    chooseCheap,
    chosenAuto,
    chosenCheap,
    getAddressLink,
    getAddressTitle,
    round5edit,
    round5,
    sendOptions,
    sendTitle,
    isData,
    encodeDecode,
    changeAmount,
    invoice,
  } = sendFuncs(store, web3t);

  const withdrawBtc = async () => {
    try {
      let withdrawSpinner = null;
      let checkingSpinner = new Spinner(store, "Checking balance", {
        displayDescription: true,
      });
      let disposerSend = null;
      let disposerCurrent = null;
      //The next code is made to watch sending process and display spinners with adequate text
      //Store's data changes step-by-step in the following way
      //0. sending is true, confirmation is null - checking balance, we display Checking balance spinner
      //1. sending is true, confirmation is not null - user is asked to confirm transaction - we must hide all spinners
      //2. sending is true, confirmation is again null - user confirmed, so we display Sending funds spinner
      //   If the user declined confirmation, we will see this state for a short time
      //3. sending is false, confirmation is null - sending is completed and we must hide all spinners

      store.current.send.error = "";
      // console.log("Before Change", store.current.send.sending, store.current.confirmation);
      const onChange = () => {
        // console.log("Change detected", store.current.send.sending, store.current.confirmation);
        if (
          store.current.send.sending &&
          !withdrawSpinner &&
          !store.current.confirmation &&
          !checkingSpinner
        ) {
          // console.log("Making withdraw spinner");
          withdrawSpinner = new Spinner(store, "Sending funds", {
            displayDescription: true,
          });
          return;
        }
        if (!store.current.send.sending && withdrawSpinner) {
          withdrawSpinner.finish();
          withdrawSpinner = null;
        }
        if (!store.current.send.sending && checkingSpinner) {
          checkingSpinner.finish();
          checkingSpinner = null;
        }
        if (!store.current.send.sending) {
          // console.log("Disposing observers spinner");
          disposerSend();
          disposerCurrent();
          return;
        }

        // console.log("Confirmation", store.current.confirmation);
        if (store.current.confirmation && checkingSpinner) {
          checkingSpinner.finish();
          checkingSpinner = null;
          return;
        }
      };

      disposerSend = observe(store.current.send, onChange);
      disposerCurrent = observe(store.current, onChange);

      sendAnyway();
    } catch (e) {
      console.error(e);
      this.toastify.show(e.message, 3000);
    }
  };
  const lang = getLang(store);

  const sendText = /*store.current.send.sending === true ? "..." : */ lang.send;

  return (
    <GradientButton
      style={styles.gradientBtnPh}
      text={sendText}
      textStyle={{ fontSize: 14, color: Images.color1 }}
      gradientBegin="#fff"
        gradientEnd="#fff"
        gradientDirection="diagonal"
        height={45}
        width="100%"
        radius={5}
      onPressAction={withdrawBtc}
    />
  );
};

const buttonInactive = ({ store }) => {
  const lang = getLang(store);
  return (
    <Button block style={styles.buttonInactive}>
    <Text style={styles.buttonTextInactive}>{lang.send}</Text>
  </Button>

  );
};

const wrapNumber = (text) => {
  return {
    target: {
      value: text.replace(",", ".").replace(/[^0-9\.]/g, ""),
    },
  };
};

const wrap = (text) => {
  return {
    target: {
      value: text,
    },
  };
};

export default ({ store, web3t }) => {
    const lang = getLang(store);
    const {
      token,
      feeToken,
      network,
      pending,
      recipientChange,
      amountChange,
      amountUsdChange,
      amountEurChange,
      useMaxAmount,
      showData,
      showLabel,
      topup,
      history,
      cancel,
      sendAnyway,
      chooseAuto,
      chooseCheap,
      chosenAuto,
      chosenCheap,
      getAddressLink,
      getAddressTitle,
      round5edit,
      round5,
      sendOptions,
      sendTitle,
      isData,
      encodeDecode,
      changeAmount,
      invoice,
    } = sendFuncs(store, web3t);

    const wallets = walletsFuncs(store, web3t).wallets;

    const wallet = wallets.find((x) => x.coin.token === store.current.wallet);

    const changePage = (tab) => () => {
      store.current.page = tab;
    };

    const send = store.current.send;
    const scanQRSend = () => {

      if(wallet.balance == "..") return;
      store.current.returnPage = 'send';
      return store.current.page = 'Scanner';
      //store.current.send.to = "VJWAMYt4A1o3pwSJLzvJqHBL1wxvLBSpsQ";
      //store.current.send.wallet = wallet;
      //store.current.send.coin = wallet.coin;
      //store.current.send.network = wallet.network;
      //navigate(store, web3t, "send", x=> {
      //
      //});

}

    const InputAddressWithdrawBtc = ({ send }) => (
      <Item style={styles.borderItem}>
        <Input
          onChangeText={(text) => recipientChange(wrap(text))}
          returnKeyType="done"
          selectionColor={"#fff"}
          keyboardAppearance="dark"
          placeholder={wallet.network.mask.substring(25, wallet.network.mask.length - 255 ) + "..."}
          style={[styles.inputStyle, { fontSize: 18 }]}
          value={send["to"]}
          keyboardType={"default"}
          placeholderTextColor="rgba(255,255,255,0.60)"
        />
        {/* <Icon name="ios-qr-code-outline" style={{ color: "#fff"}} onPress={scanQRSend}/> */}
        <TouchableOpacity
          onPress={scanQRSend}
          style={{ backgroundColor: 'transparent',  width: 50}}
        >
        <Image

          source={Images.scanImage}
          style={styles.sizeIconBtn1}
        />
        </TouchableOpacity>
      </Item>
    );

    const SendButton = ({ send }) =>
      send.amountSend
        ? btnWithdrawBtc({ store, web3t })
        : buttonInactive({ store, web3t })
    ;

    const refreshToken = async (bool) => {
      store.current.refreshingBalances = true;
      web3t.refresh((err, data) => {
        store.current.refreshingBalances = false;
      });
    };
    const pad =
      { paddingTop: 10 };
    const back = changePage("wallet", true);
    return (
      <View style={styles.viewFlex}>
        <Background fullscreen={true}/>
        <Toast
          ref={(c) => (this.toastify = c)}
          position={"top"}
          style={styles.toastStyle}
        />

        <Header transparent style={styles.mtAndroid}>
          <Left style={styles.viewFlexHeader}>
            <BackButton onBack={back} style={styles.arrowHeaderIconBlack} />
          </Left>
          <Body style={styles.viewFlexHeader}>
            <Title style={styles.titleBlack}>{lang.send}</Title>
          </Body>
          <Right style={styles.viewFlexHeader}>
            <Thumbnail square small source={{ uri: wallet.coin.image }} />
          </Right>
        </Header>
        <StatusBar barStyle="light-content" translucent={true} backgroundColor={'transparent'}/>
        {RefreshControl({swipeRefresh:refreshToken, store, children:<>
          <View style={styles.bodyBlockWallet}>
            {/* <View style={styles.bodyBalance}> */}
            <View style={styles.bodyBlock3}>
              <Text style={styles.nameTokenSwiper1}>{lang.totalBalance}</Text>
            </View>
            <View style={styles.bodyBlock3}>
              <Text style={styles.totalBalance}>
                {(wallet.balance || 0).toString().match(/^-?\d*(?:\.\d{0,8})?/)[0]}{" "}
                <Text style={styles.nameToken}>
                  {wallet.coin.token.toUpperCase()}
                </Text>
              </Text>
            </View>
            {/* </View> */}

            <View style={[styles.widthCard, { marginHorizontal: 20, width: '90%' }]}>
            <View style={styles.titleInputSend}>
                <Text style={styles.titleInput1}>{lang["to"]}:</Text>
              </View>
              {InputAddressWithdrawBtc({send: store.current.send})}
              <View style={pad}></View>

              <View style={styles.titleInputSend}>
                <Text style={styles.titleInput1}>{lang.amount}:</Text>
              </View>

                <View >
                    <Item style={styles.borderItem}>
                      {/* <Label style={{ color: Images.color6}}>{wallet.coin.token.toUpperCase()}</Label> */}
                        <Input
                          onChangeText={(text) => amountChange(wrapNumber(text))}
                          returnKeyType="done"
                          autoCompleteType="off"
                          style={[styles.inputStyle, { fontSize: 18 }]}
                          selectionColor={"#fff"}
                          keyboardAppearance="dark"
                          placeholder="0.00"
                          value={send.amountSend}
                          keyboardType="numeric"
                          placeholderTextColor="rgba(255,255,255,0.60)"
                        />
                    </Item>
                    <Item style={styles.borderItem}>
                        <Text style={{color: "white"}}>$ </Text>
                        <Input
                          onChangeText={(text) => amountUsdChange(wrapNumber(text))}
                          returnKeyType="done"
                          autoCompleteType="off"
                          style={[styles.inputStyle, { fontSize: 18}]}
                          selectionColor={"#fff"}
                          keyboardAppearance="dark"
                          placeholder="0.00"
                          value={send.amountSendUsd}
                          keyboardType="numeric"
                          placeholderTextColor="rgba(255,255,255,0.60)"
                        />
                    </Item>
               </View>


                <Text style={styles.textInputDownRight}>
                  {lang.fee} {send.amountSendFee}{" "} {wallet.coin.token.toUpperCase()} (${send.amountSendFeeUsd})
                </Text>
                <Text style={styles.error}>{send.error}</Text>

            </View>
            <View style={styles.containerScreen}>
              <View style={styles.marginBtn}>
                {SendButton({send: store.current.send})}
              </View>
            </View>
          </View>
        </>})}
      </View>
    );
}
