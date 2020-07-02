// Generated by LiveScript 1.5.0
(function(){
  var toJS, Alert, ref$, times, minus, div, createTransaction, pushTx, changeAmount, calcCryptoFromEur, calcCryptoFromUsd, notifyFormResult, getNameMask, resolveAddress, window, navigate, close, round, round5, round5edit, topup, getPrimaryInfo, createPendingTx, rebuildHistory, map, getAddressLink, getAddressTitle, web3, calcFee, confirm, getLang, applyTransactions;
  toJS = require('mobx').toJS;
  Alert = require('react-native').Alert;
  ref$ = require('./math.js'), times = ref$.times, minus = ref$.minus, div = ref$.div;
  ref$ = require('./api.js'), createTransaction = ref$.createTransaction, pushTx = ref$.pushTx;
  ref$ = require('./calc-amount.js'), changeAmount = ref$.changeAmount, calcCryptoFromEur = ref$.calcCryptoFromEur, calcCryptoFromUsd = ref$.calcCryptoFromUsd;
  notifyFormResult = require('./send-form.js').notifyFormResult;
  getNameMask = require('./get-name-mask.js');
  resolveAddress = require('./resolve-address.js');
  window = require('./browser/window.js');
  navigate = require('./navigate.js');
  close = require('./close.js');
  round = require('./round.js');
  round5 = require('./round5.js');
  round5edit = require('./round5edit.js');
  topup = require('./topup.js');
  getPrimaryInfo = require('./get-primary-info.js');
  createPendingTx = require('./pending-tx.js').createPendingTx;
  rebuildHistory = require('./transactions.js').rebuildHistory;
  map = require('prelude-ls').map;
  ref$ = require('./address-link.js'), getAddressLink = ref$.getAddressLink, getAddressTitle = ref$.getAddressTitle;
  web3 = require('./web3.js');
  calcFee = require('./api.js').calcFee;
  confirm = require('./pages/confirmation.js').confirm;
  getLang = require('./get-lang.js');
  applyTransactions = require('./apply-transactions.js');

  const confirmrn = (store, message, yesButtonText, cb) =>
    Alert.alert(
      "Confirmation",
      message,
      [
        {
          text: 'Cancel',
          onPress: () => cb(false),
          style: 'cancel',
        },
        {text: yesButtonText, onPress: () => cb(true)},
      ],
      {cancelable: false},
    );


  module.exports = function(store, web3t){
    var lang, sendTo, send, wallet, color, primaryButtonStyle, defaultButtonStyle, sendTx, performSendSafe, performSendUnsafe, checkEnough, sendMoney, sendEscrow, sendAnyway, sendTitle, cancel, recipientChange, getValue, amountChange, performAmountEurChange, performAmountUsdChange, amountEurChange, amountUsdChange, encodeDecode, showData, showLabel, whenEmpty, debug, history, network, invoice, token, feeToken, ref$, isData, chooseAuto, chooseCheap, chosenCheap, chosenAuto, sendOptions, pending, calcAmountAndFee, useMax, useMaxTryCatch, useMaxAmount;
    if (store == null || web3t == null) {
      console.log("no store or web3t");
      return null;
    }
    lang = getLang(store);
    sendTo = web3t.naming.sendTo;
    send = store.current.send;
    wallet = send.wallet;
    if (wallet == null) {
      console.log("no wallet");
      return null;
    }
    color = getPrimaryInfo(store).color;
    primaryButtonStyle = {
      background: color
    };
    defaultButtonStyle = {
      color: color
    };
    sendTx = function(arg$, cb){
      var to, wallet, network, amountSend, amountSendFee, data, coin, txType, token, tx;
      to = arg$.to, wallet = arg$.wallet, network = arg$.network, amountSend = arg$.amountSend, amountSendFee = arg$.amountSendFee, data = arg$.data, coin = arg$.coin, txType = arg$.txType;
      token = send.coin.token;
      tx = {
        account: {
          address: wallet.address,
          privateKey: wallet.privateKey
        },
        recipient: to,
        network: network,
        token: token,
        coin: coin,
        amount: amountSend,
        amountFee: amountSendFee,
        data: data
      };
      return createTransaction(tx, function(err, data){
        if (err != null) {
          return cb(err);
        }
        return confirm(store, "Are you sure to send " + tx.amount + " " + send.coin.token + " to " + send.to/*, "Yes, Send!"*/, function(agree){
          if (!agree) {
            return cb("You are not agree");
          }
          return pushTx((import$({
            token: token,
            txType: txType,
            network: network
          }, data)), function(err, tx){
            if (err != null) {
              return cb(err);
            }
            return createPendingTx({
              store: store,
              token: token,
              network: network,
              tx: tx,
              amountSend: amountSend,
              amountSendFee: amountSendFee
            }, function(err){
              return cb(err, tx);
            });
          });
        });
      });
    };
    performSendSafe = function(cb){
      return resolveAddress(web3t, send.to, send.coin, send.network, function(err, to){
        var resolved;
        resolved = (function(){
          switch (false) {
          case err == null:
            return send.to;
          default:
            return to;
          }
        }());
        send.to = resolved;
        return sendTx((import$({
          wallet: wallet
        }, send)), cb);
      });
    };
    performSendUnsafe = function(cb){
      return sendTx((import$({
        wallet: wallet
      }, send)), cb);
    };
    checkEnough = function(cb){
      var amount, ref$, err;
      try {
        amount = minus(minus(minus(wallet.balance, send.amountSend), (ref$ = wallet.pendingSent) != null ? ref$ : 0), send.amountSendFee);
        if (+amount < 0) {
          return cb("Insufficient funds");
        }
        return cb(null);
      } catch (e$) {
        err = e$;
        return cb(err);
      }
    };
    sendMoney = function(){
      if (wallet.balance === '...') {
        return;
      }
      if (send.sending === true) {
        return;
      }
      return checkEnough(function(err){
        var ref$;
        if (err != null) {
          return send.error = ((ref$ = err.message) != null ? ref$ : err) + "";
        }
        send.sending = true;
        return performSendSafe(function(err, data){
          var ref$;
          send.sending = false;
          if (err != null) {
            return send.error = ((ref$ = err.message) != null ? ref$ : err) + "";
          }
          notifyFormResult(send.id, null, data);
          store.current.lastTxUrl = send.network.api.url + "/tx/" + data;
          store.current.transaction = {
            hash: data
          };
          store.current.send.amountSend = 0;
          store.current.send.amountSendUsd = 0;

          navigate(store, web3t, 'sent');
          return web3t.refresh(function(){});
        });
      });
    };
    sendEscrow = function(){
      var name, amountEthers;
      name = send.to;
      amountEthers = send.amountSend;
      return sendTo({
        name: name,
        amountEthers: amountEthers
      }, function(err){});
    };
    sendAnyway = function(){
      if (send.proposeEscrow) {
        return sendEscrow();
      }
      return sendMoney();
    };
    sendTitle = (function(){
      switch (false) {
      case !send.proposeEscrow:
        return 'SEND (Escrow)';
      default:
        return lang.send;
      }
    }());
    cancel = function(event){
      navigate(store, web3t, 'wallets');
      return notifyFormResult(send.id, "Cancelled by user");
    };
    recipientChange = function(event){
      var ref$;
      return send.to = (ref$ = event.target.value) != null ? ref$ : "";
    };
    getValue = function(event){
      var value, ref$, value2;
      value = (ref$ = event.target.value.match(/^[0-9]+([.]([0-9]+)?)?$/)) != null ? ref$[0] : void 8;
      value2 = (function(){
        switch (false) {
        case !((value != null ? value[0] : void 8) === '0' && (value != null ? value[1] : void 8) != null && (value != null ? value[1] : void 8) !== '.'):
          return value.substr(1, value.length);
        default:
          return value;
        }
      }());
      return value2;
    };
    amountChange = function(event){
      var value;
      value = getValue(event);
      return changeAmount(store, value);
    };
    performAmountEurChange = function(value){
      var toSend;
      toSend = calcCryptoFromEur(store, value);
      return changeAmount(store, toSend, "skipUpdateFiat");
    };
    performAmountUsdChange = function(value){
      var toSend;
      toSend = calcCryptoFromUsd(store, value);
      return changeAmount(store, toSend, "skipUpdateFiat");
    };
    amountEurChange = function(event){
      var value;
      value = getValue(event);
      send.amountSendEur = value;
      amountEurChange.timer = clearTimeout(amountEurChange.timer);
      return amountEurChange.timer = setTimeout(function(){
        return performAmountEurChange(value);
      }, 100);
    };
    amountUsdChange = function(event){
      var value;
      value = getValue(event);
      send.amountSendUsd = value;
      amountUsdChange.timer = clearTimeout(amountUsdChange.timer);
      return amountUsdChange.timer = setTimeout(function(){
        return performAmountUsdChange(value);
      }, 100);
    };
    encodeDecode = function(){
      return send.showDataMode = (function(){
        switch (false) {
        case send.showDataMode !== 'decoded':
          return 'encoded';
        default:
          return 'decoded';
        }
      }());
    };
    showData = function(){
      switch (false) {
      case send.showDataMode !== 'decoded':
        return send.decodedData;
      default:
        return send.data;
      }
    };
    showLabel = function(){
      if (send.showDataMode === 'decoded') {
        return 'encoded';
      } else {
        return 'decoded';
      }
    };
    whenEmpty = function(str, def){
      if ((str != null ? str : "").length === 0) {
        return def;
      } else {
        return str;
      }
    };
    debug = function(cb){
      var token, address, tx, amountSend, amountSendFee;
      token = send.coin.token;
      address = wallet.address;
      tx = "fake tx";
      amountSend = 1;
      amountSendFee = 0.01;
      return createPendingTx({
        store: store,
        token: token,
        network: send.network,
        tx: tx,
        amountSend: amountSend,
        amountSendFee: amountSendFee
      }, function(err){
        return web3t.refresh(function(){
          return cb(null);
        });
      });
    };
    history = function(){
      store.current.sendMenuOpen = false;
      store.current.filter = ['IN', 'OUT', send.coin.token];
      applyTransactions(store);
      return navigate(store, web3t, 'history');
    };
    network = (function(){
      switch (false) {
      case store.current.network !== 'testnet':
        return " (TESTNET) ";
      default:
        return "";
      }
    }());
    invoice = function(wallet){
      var ref$, coin, network;
      store.current.sendMenuOpen = false;
      ref$ = store.current.send, coin = ref$.coin, network = ref$.network;
      importAll$(store.current.invoice, {
        coin: coin,
        wallet: wallet,
        network: network
      });
      return navigate(store, web3t, 'invoice');
    };
    token = send.coin.token.toUpperCase();
    feeToken = ((ref$ = wallet.network.txFeeIn) != null
      ? ref$
      : send.coin.token).toUpperCase();
    isData = ((ref$ = send.data) != null ? ref$ : "").length > 0;
    chooseAuto = function(){
      send.feeType = 'auto';
      return changeAmount(store, send.amountSend);
    };
    chooseCheap = function(){
      send.feeType = 'cheap';
      return changeAmount(store, send.amountSend);
    };
    chosenCheap = send.feeType === 'cheap' ? 'chosen' : "";
    chosenAuto = send.feeType === 'auto' ? 'chosen' : "";
    sendOptions = (ref$ = send.coin.txTypes) != null
      ? ref$
      : [];
    pending = wallet.pendingSent + ' ' + token;
    calcAmountAndFee = function(amountSend, trials, cb){
      var account;
      if (trials <= 0) {
        return cb("Cannot estimate max amount. Please try to type manually");
      }
      if (+amountSend === 0) {
        return cb("Balance is not enough to send tx");
      }
      account = {
        address: wallet.address,
        privateKey: wallet.privateKey
      };
      return calcFee({
        token: token,
        network: send.network,
        amount: amountSend,
        feeType: send.feeType,
        txType: send.txType,
        account: account
      }, function(err, amountSendFee){
        var next, nextAmount, nextTrials;
        if (err == null) {
          return cb(null, {
            amountSend: amountSend,
            amountSendFee: amountSendFee
          });
        }
        if (err != null && err !== "Balance is not enough to send tx") {
          return cb(err);
        }
        if (amountSendFee == null) {
          return cb("Fee cannot be calculated");
        }
        next = amountSendFee != null
          ? amountSendFee
          : div(10, Math.pow(10, send.network.decimals));
        nextAmount = minus(amountSend, next);
        nextTrials = trials - 1;
        return calcAmountAndFee(nextAmount, nextTrials, cb);
      });
    };
    useMax = function(cb){
      var ref$, amount;
      if (+((ref$ = send.amountSendFee) != null ? ref$ : 0) === 0) {
        return cb("Data is not ready yet");
      }
      amount = minus(minus(wallet.balance, (ref$ = wallet.pendingSent) != null ? ref$ : 0), send.amountSendFee);
      if (+amount <= 0) {
        return cb("Amount is too small");
      }
      return calcAmountAndFee(amount, 10, function(err, info){
        if (err != null) {
          return cb(err + "");
        }
        if (+info.amountSend === 0) {
          return cb("Amount is 0");
        }
        send.amountSend = info.amountSend;
        send.amountSendFee = info.amountSendFee;
        changeAmount(store, send.amountSend);
        return cb(null);
      });
    };
    useMaxTryCatch = function(cb){
      var err;
      try {
        return useMax(cb);
      } catch (e$) {
        err = e$;
        return cb(err);
      }
    };
    useMaxAmount = function(){
      return useMaxTryCatch(function(err){
        if (err != null) {
          return alert(err + "");
        }
      });
    };
    return {
      invoice: invoice,
      token: token,
      network: network,
      send: send,
      wallet: wallet,
      pending: pending,
      feeToken: feeToken,
      primaryButtonStyle: primaryButtonStyle,
      recipientChange: recipientChange,
      amountChange: amountChange,
      amountUsdChange: amountUsdChange,
      amountEurChange: amountEurChange,
      useMaxAmount: useMaxAmount,
      showData: showData,
      showLabel: showLabel,
      topup: topup(store),
      history: history,
      cancel: cancel,
      sendAnyway: sendAnyway,
      chooseAuto: chooseAuto,
      chooseCheap: chooseCheap,
      chosenAuto: chosenAuto,
      chosenCheap: chosenCheap,
      getAddressLink: getAddressLink,
      getAddressTitle: getAddressTitle,
      defaultButtonStyle: defaultButtonStyle,
      round5edit: round5edit,
      round5: round5,
      sendOptions: sendOptions,
      sendTitle: sendTitle,
      isData: isData,
      encodeDecode: encodeDecode,
      changeAmount: changeAmount
    };
  };
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
  function importAll$(obj, src){
    for (var key in src) obj[key] = src[key];
    return obj;
  }
}).call(this);
