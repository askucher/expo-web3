// Generated by LiveScript 1.6.0
(function(){
  var mainnet, testnet, type, enabled, token, image, usdInfo, out$ = typeof exports != 'undefined' && exports || this;
  out$.mainnet = mainnet = {
    incorrect: true,
    decimals: 8,
    txFee: '0.0001',
    mask: 'L000000000000000000000000000000000',
    api: {
      provider: 'insight',
      url: 'https://insight.litecore.io',
      decimal: 8
    },
    messagePrefix: '\x19Litecoin Signed Message:\n',
    bip32: {
      'public': 0x019da462,
      'private': 0x019d9cfe
    },
    pubKeyHash: 0x30,
    scriptHash: 0x32,
    wif: 0xb0
  };
  out$.testnet = testnet = {
    decimals: 8,
    txFee: '0.0001',
    mask: 'L000000000000000000000000000000000',
    api: {
      provider: 'insight',
      url: 'https://insight.litecore.io',
      decimal: 8
    },
    messagePrefix: '\x19Litecoin Signed Message:\n',
    bip32: {
      'public': 0x0432a9a8,
      'private': 0x0432a243
    },
    pubKeyHash: 0x71,
    scriptHash: 0xc4,
    wif: 241
  };
  out$.type = type = 'coin';
  out$.enabled = enabled = false;
  out$.token = token = 'doge';
  out$.image = image = './res/doge-ethnamed.png';
  out$.usdInfo = usdInfo = "url(https://min-api.cryptocompare.com/data/pricemulti?fsyms=DOGE&tsyms=USD).DOGE.USD";
}).call(this);
