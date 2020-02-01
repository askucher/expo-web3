// Generated by LiveScript 1.5.0
(function(){
  var encrypt, aes, wordsToUtf8, name, set, saved, get, out$ = typeof exports != 'undefined' && exports || this;
  encrypt = require('./pin.js').encrypt;
  aes = require('crypto-js/aes');
  wordsToUtf8 = require('./words-to-utf8.js');
  name = 'sseed';
  out$.set = set = function(value){
    var key, res;
    key = encrypt(name);
    res = aes.encrypt(value, key).toString();
    console.log('Set seed', res);
    return localStorage.setItem(name, res) || out$.saved();
  };
  out$.saved = saved = function(){
    var ref$;
    var res = ((ref$ = localStorage.getItem(name)) != null ? ref$ : "") !== "";
    console.log('Saved', res);
    return res;
  };
  out$.get = get = function(){
    var key, res, ref$;
    key = encrypt(name);
    res = (ref$ = localStorage.getItem(name)) != null ? ref$ : "";
    if (res === "") {
      return res;
    }
    return aes.decrypt(res, key).toString(wordsToUtf8);
  };
}).call(this);
