// Generated by LiveScript 1.5.0
(function(){
  var calcWallet, loadAllTransactions, loadRates, ref$, run, task, refreshWallet;
  calcWallet = require('./calc-wallet.js');
  loadAllTransactions = require('./transactions.js').loadAllTransactions;
  loadRates = require('./load-rates.js');
  ref$ = require('./workflow.js'), run = ref$.run, task = ref$.task;
  refreshWallet = function(web3, store, cb){
    var task1, task2, task3;
    store.current.refreshing = true;
    task1 = task(function(cb){
      return loadRates(store, cb);
    });
    task2 = task(function(cb){
      return loadAllTransactions(store, cb);
    });
    task3 = task(function(cb){
      return calcWallet(store, cb);
    });
    return run([
      {
        task1: task1,
        task2: task2
      }, task3
    ]).then(function(){
      store.current.refreshing = false;
      return cb(null);
    });
  };
  module.exports = refreshWallet;
}).call(this);
