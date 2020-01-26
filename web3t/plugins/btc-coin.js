// Generated by LiveScript 1.5.0
(function(){
  var mainnet, testnet, color, type, enabled, token, image, usdInfo, out$ = typeof exports != 'undefined' && exports || this;
  out$.mainnet = mainnet = {
    decimals: 8,
    txFee: '0.0000004',
    txFeeAutoMode: 'per-byte',
    txFeeOptions: {
      auto: '0.000001',
      cheap: '0.0000004',
      feePerByte: '0.000001'
    },
    mask: '1000000000000000000000000000000000',
    api: {
      provider: 'insight',
      url: 'https://insight.bitpay.com',
      decimal: 8,
      alternative: {
        balance: 'https://blockchain.info/q/addressbalance/:address'
      }
    },
    messagePrefix: '\x18Bitcoin Signed Message:\n',
    bech32: 'bc',
    bip32: {
      'public': 0x0488b21e,
      'private': 0x0488ade4
    },
    pubKeyHash: 0x00,
    scriptHash: 0x05,
    wif: 0x80
  };
  out$.testnet = testnet = {
    txFee: 0.0001,
    decimals: 8,
    mask: '1000000000000000000000000000000000',
    api: {
      provider: 'insight',
      url: 'https://testnet.blockexplorer.com',
      decimal: 8
    },
    messagePrefix: '\x18Bitcoin Signed Message:\n',
    topup: 'https://testnet.manu.backend.hamburg/faucet',
    bech32: 'tb',
    bip32: {
      'public': 0x043587cf,
      'private': 0x04358394
    },
    pubKeyHash: 0x6f,
    scriptHash: 0xc4,
    wif: 0xef
  };
  out$.color = color = '#4650E7';
  out$.type = type = 'coin';
  out$.enabled = enabled = true;
  out$.token = token = 'btc';
  out$.image = image = "data:image/png;base64,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";
  out$.usdInfo = usdInfo = "url(https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC,DASH,XEM,USDT,ETC&tsyms=USD).BTC.USD";
}).call(this);
