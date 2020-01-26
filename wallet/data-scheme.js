// Generated by LiveScript 1.5.0
(function(){
  var ref$, map, pairsToObj, saved, location, en, ru, ua, getDevice, savedSeed, createSend, store;
  ref$ = require('prelude-ls'), map = ref$.map, pairsToObj = ref$.pairsToObj;
  saved = require('./seed.js').saved;
  location = require('./browser/location.js');
  en = require('./langs/en.js');
  ru = require('./langs/ru.js');
  ua = require('./langs/ua.js');
  getDevice = require('./get-device.js');
  savedSeed = saved();
  createSend = function(){
    return {
      id: "",
      to: "",
      proposeEscrow: false,
      address: '',
      value: '0',
      feeType: 'auto',
      txType: 'regular',
      amountSend: '0',
      amountCharged: '0',
      amountChargedUsd: '0',
      amountSendUsd: '0',
      amountSendEur: '0',
      amountSendFee: '0',
      amountSendFeeUsd: '0',
      amountObtain: '0',
      data: "",
      decodedData: "",
      showDataMode: 'encoded',
      error: ''
    };
  };
  store = {
    root: null,
    theme: 'velas',
    lang: 'en',
    langs: {
      en: en,
      ru: ru,
      ua: ua
    },
    registry: [],
    terms: "Loading...",
    preference: {
      settingsVisible: true,
      invoiceVisible: true,
      usernameVisible: false,
      refreshVisible: true,
      lockVisible: true
    },
    receive: {
      wallet: null
    },
    menu: {
      active: 's2'
    },
    ask: {
      text: '',
      enabled: false,
      callback: null,
      image: "",
      type: ''
    },
    contractAddress: '',
    transactions: {
      all: [],
      applied: []
    },
    current: {
      device: getDevice(),
      list: 0,
      promptAnswer: "",
      prompt: false,
      sendMenuOpen: false,
      addCoin: false,
      walletIndex: 0,
      accountIndex: 1,
      manageAccount: false,
      filterPlugins: "",
      confirmation: null,
      demo: location.href.indexOf('web3.space/wallet') > -1,
      network: 'mainnet',
      pin: "",
      lastTxUrl: "",
      tryEditSeed: false,
      pinTrial: 0,
      refreshing: false,
      copied: "",
      page: 'locked',
      sendToMask: "",
      status: 'main',
      nickname: "",
      nicknamefull: 'nickname@domain.com',
      message: "",
      customDomain: false,
      canBuy: false,
      checkingName: false,
      seed: "",
      seedTemp: "",
      savedSeed: savedSeed,
      balanceUsd: '...',
      filter: ['IN', 'OUT'],
      loading: false,
      send: createSend(),
      invoice: createSend()
    },
    history: {
      filterOpen: false
    },
    rates: {},
    coins: []
  };
  module.exports = store;
}).call(this);