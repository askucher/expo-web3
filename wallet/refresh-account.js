// Generated by LiveScript 1.6.0
(function(){
  var newAccount, refreshWallet, getInstallList, ref$, toJS, transaction, map, pairsToObj, mirror, applyTransactions, setAccount, refreshAccount, backgroundRefreshAccount, out$ = typeof exports != 'undefined' && exports || this, slice$ = [].slice;
  newAccount = require('./new-account.js');
  refreshWallet = require('./refresh-wallet.js');
  getInstallList = require('./install-plugin.js').getInstallList;
  ref$ = require('mobx'), toJS = ref$.toJS, transaction = ref$.transaction;
  ref$ = require('prelude-ls'), map = ref$.map, pairsToObj = ref$.pairsToObj;
  mirror = require('./mirror.js');
  applyTransactions = require('./apply-transactions.js');
  out$.setAccount = setAccount = function(web3, store, cb){
    var installCoins;
    installCoins = function(arg$){
      var coin, coins;
      coin = arg$[0], coins = slice$.call(arg$, 1);
      return web3.installQuick(coin, function(){
        if (coins.length === 0) {
          return null;
        }
        return installCoins(coins);
      });
    };
    return getInstallList(function(err, coins){
      if (coins.length !== 0) {
        installCoins(coins, function(){});
      }
      return newAccount(store, store.current.seed, function(err, account){
        if (err != null) {
          return cb(err);
        }
        store.current.account = account;
        mirror.accountAddresses = pairsToObj(
        map(function(it){
          return [it.coin.token, it.address];
        })(
        account.wallets));
        return cb(null);
      });
    });
  };
  out$.refreshAccount = refreshAccount = curry$(function(web3, store, cb){
    return setAccount(web3, store, function(err){
      var accountName;
      if (err != null) {
        return cb(err);
      }
      store.current.account.accountName = "Anonymous";
      accountName = store.current.account.accountName;
      if (accountName !== "Anonymous") {
        store.current.nickname = "";
      }
      if (accountName !== "Anonymous") {
        store.current.nicknamefull = accountName;
      }
      return refreshWallet(web3, store, cb);
    });
  });
  out$.backgroundRefreshAccount = backgroundRefreshAccount = function(web3, store, cb){
    var bgStore;
    store.current.refreshing = true;
    bgStore = toJS(store);
    return refreshAccount(web3, bgStore, function(err){
      var state;
      store.current.refreshing = false;
      if (err != null) {
        return cb(err);
      }
      state = {
        err: null,
        data: null
      };
      transaction(function(){
        var err;
        try {
          store.rates = bgStore.rates;
          store.current.account = bgStore.current.account;
          store.current.filter.length = 0;
          store.current.filter.push('IN');
          store.current.filter.push('OUT');
          store.current.filter.push(bgStore.current.account.wallets[store.current.walletIndex].coin.token);
          store.current.balanceUsd = bgStore.current.balanceUsd;
          store.transactions = bgStore.transactions;
          return applyTransactions(store);
        } catch (e$) {
          err = e$;
          return state.err = err;
        }
      });
      return cb(state.err);
    });
  };
  function curry$(f, bound){
    var context,
    _curry = function(args) {
      return f.length > 1 ? function(){
        var params = args ? args.concat() : [];
        context = bound ? context || this : this;
        return params.push.apply(params, arguments) <
            f.length && arguments.length ?
          _curry.call(context, params) : f.apply(context, params);
      } : f;
    };
    return _curry();
  }
}).call(this);
