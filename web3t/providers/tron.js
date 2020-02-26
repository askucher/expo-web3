// Generated by LiveScript 1.5.0
(function(){
  var ref$, post, get, map, calcFee, noAccount, getKeys, transformTx, getTransactions, createTransaction, pushTx, checkTxStatus, getTotalReceived, getUnconfirmedBalance, getBalance, out$ = typeof exports != 'undefined' && exports || this;
  ref$ = require('./superagent.js'), post = ref$.post, get = ref$.get;
  map = require('prelude-ls').map;
  out$.calcFee = calcFee = function(arg$, cb){
    var network, tx;
    network = arg$.network, tx = arg$.tx;
    return cb(null);
  };
  noAccount = null;
  out$.getKeys = getKeys = function(arg$, cb){
    var network, mnemonic, index;
    network = arg$.network, mnemonic = arg$.mnemonic, index = arg$.index;
    return cb("Not Implemented");
  };
  transformTx = curry$(function(network, t){
    var explorerUrl, dec, tx, amount, time, url, fee, from, to;
    explorerUrl = network.api.explorerUrl;
    dec = getDec(network);
    network = 'trx';
    tx = t.trx_id;
    amount = div(t.quantity, dec);
    time = t.timestamp;
    url = explorerUrl + "/tx/" + tx;
    fee = div(0, dec);
    from = t.sender;
    to = t.receiver;
    return {
      network: network,
      tx: tx,
      amount: amount,
      fee: fee,
      time: time,
      url: url,
      from: from,
      to: to
    };
  });
  out$.getTransactions = getTransactions = function(arg$, cb){
    var network, address;
    network = arg$.network, address = arg$.address;
    return cb("Not Implemented");
  };
  out$.createTransaction = createTransaction = curry$(function(arg$, cb){
    var network, account, recipient, amount, amountFee, data, feeType, txType;
    network = arg$.network, account = arg$.account, recipient = arg$.recipient, amount = arg$.amount, amountFee = arg$.amountFee, data = arg$.data, feeType = arg$.feeType, txType = arg$.txType;
    return cb("Not Implemented");
  });
  out$.pushTx = pushTx = curry$(function(arg$, cb){
    var network, rawtx;
    network = arg$.network, rawtx = arg$.rawtx;
    return cb("Not Implemented");
  });
  out$.checkTxStatus = checkTxStatus = function(arg$, cb){
    var network, tx;
    network = arg$.network, tx = arg$.tx;
    return cb("Not Implemented");
  };
  out$.getTotalReceived = getTotalReceived = function(arg$, cb){
    var address, network;
    address = arg$.address, network = arg$.network;
    return cb("Not Implemented");
  };
  out$.getUnconfirmedBalance = getUnconfirmedBalance = function(arg$, cb){
    var network, address;
    network = arg$.network, address = arg$.address;
    return cb("Not Implemented");
  };
  out$.getBalance = getBalance = function(arg$, cb){
    var network, address;
    network = arg$.network, address = arg$.address;
    return cb("Not Implemented");
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
