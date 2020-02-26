// Generated by LiveScript 1.5.0
(function(){
  var eth, ref$, plus, minus, times, div, fromHex, utils, isAddress, isChecksumAddress, toHexString, stringToHex, calcFee, createTransaction;
  eth = require('./eth.js');
  ref$ = require('../math.js'), plus = ref$.plus, minus = ref$.minus, times = ref$.times, div = ref$.div, fromHex = ref$.fromHex;
  utils = require('ethers').utils;
  isAddress = function(address){
    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
      return false;
    } else {
      if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
        return true;
      } else {
        return isChecksumAddress(address);
      }
    }
  };
  isChecksumAddress = function(address){
    var addressHash, i;
    address = address.replace('0x', '');
    addressHash = sha3(address.toLowerCase());
    i = 0;
    while (i < 40) {
      if (parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i] || parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i]) {
        return false;
      }
      i++;
    }
    return true;
  };
  toHexString = function(byteArray){
    return Array.from(byteArray, function(byte){
      return ('0' + (byte & 255).toString(16)).slice(-2);
    }).join('');
  };
  stringToHex = function(str){
    return function(it){
      return "0x" + it;
    }(
    toHexString(
    utils.toUtf8Bytes(
    str)));
  };
  calcFee = function(arg$, cb){
    var network, feeType, account, amount, to, data, ref$, ref1$, fixed, def;
    network = arg$.network, feeType = arg$.feeType, account = arg$.account, amount = arg$.amount, to = arg$.to, data = arg$.data;
    if (isAddress(to)) {
      return cb(null, 0);
    }
    if (((ref$ = network.txFeeOptions) != null ? ref$.withdraw : void 8) === 0) {
      return cb(null, 0);
    }
    if (((ref1$ = network.txFeeOptions) != null ? ref1$.withdraw : void 8) !== "50 + 2%") {
      return cb("unsupported tx option");
    }
    fixed = 50;
    if (+amount === 0) {
      return cb(null, fixed);
    }
    def = plus(fixed, times(div(amount, 100), 2));
    return cb(null, def);
  };
  createTransaction = curry$(function(config, cb){
    var recipient, data, ref$;
    if (config.recipient == null) {
      return cb("config.recipient is required");
    }
    recipient = config.recipient;
    recipient = (function(){
      switch (false) {
      case !isAddress(config.recipient):
        return config.recipient;
      default:
        return config.account.address;
      }
    }());
    data = (function(){
      switch (false) {
      case !isAddress(config.recipient):
        return config.data;
      default:
        return stringToHex(config.recipient);
      }
    }());
    return eth.createTransaction((ref$ = {}, import$(ref$, config), ref$.recipient = recipient, ref$.data = data, ref$), cb);
  });
  module.exports = (ref$ = {}, import$(ref$, eth), ref$.createTransaction = createTransaction, ref$.calcFee = calcFee, ref$);
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
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
