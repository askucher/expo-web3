export mainnet =
    decimals: 8
    tx-fee: \0.0001
    tx-fee-options: 
        cheap: \0.00005546
        auto: \0.0002
    tx-fee-in: \btc
    mask: '1000000000000000000000000000000000'
    api: 
        api-url: \https://api.omniwallet.org
        api-url-btc: \https://insight.bitpay.com
        provider: \omni
        url: \https://omniexplorer.info
        decimal: 8
    propertyid: \31
    message-prefix: '\x18Bitcoin Signed Message:\n'
    bech32: 'bc'
    bip32:
        public: 0x0488b21e
        private: 0x0488ade4
    pubKeyHash: 0x00
    scriptHash: 0x05
    wif: 0x80
export testnet =
    tx-fee: \0.0001
    tx-fee-options: 
        cheap: \0.00005546
        auto: \0.0002
    tx-fee-in: \btc
    disabled: yes
    decimals: 8
    mask: '1000000000000000000000000000000000'
    api:
        provider: \insight
        url: \https://testnet.blockexplorer.com
        api-url: \https://api.omniwallet.org
        api-url-btc: \https://testnet.blockexplorer.com
        decimal: 8
    messagePrefix: '\x18Bitcoin Signed Message:\n'
    propertyid: \31
    bech32: 'tb'
    bip32:
        public: 0x043587cf
        private: 0x04358394
    pubKeyHash: 0x6f
    scriptHash: 0xc4
    wif: 0xef
export type = \coin
export enabled = yes
export token = \usdt
export color = \#26A17B
export image = "data:image/png;base64,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"
export usd-info = "url(https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC,DASH,XEM,USDT,ETC&tsyms=USD).USDT.USD"