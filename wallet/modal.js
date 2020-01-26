// Generated by LiveScript 1.5.0
(function(){
  var react, scrollTop, modalControl, current, makeChoice, acceptAsk, cancelAsk, reduceOrCancel, plug, install, replace, out$ = typeof exports != 'undefined' && exports || this, toString$ = {}.toString;
  react = require('react');
  scrollTop = require('./scroll-top.js');
  /*
  .modal-container
      @import scheme
      z-index: 999
      overflow: hidden
      height: 100vh
      width: 100vw
      top: 0px
      left: 0
      text-align: center
      position: fixed
      >.modal
          display: inline-block
          width: 100vw
          height: 100vh
          position: relative
          >*
              position: absolute
              overflow: hidden
              left: 0
          >.bg
              height: inherit
              width: inherit
              bottom: 0
              background: rgba(black, 0.6)
          $size: 400px
          text-align: center
          >.install-body
              padding-top: 170px
              width: 100vw
              height: $height
              >.install
                  position: static
                  display: inline-block
                  box-shadow: 0 -10px 20px 0 rgba(0,0,0,0.15)
                  $pad: 3px
                  $install-width: $size - $pad * 3
                  width: $install-width
                  @media screen and (max-width: $install-width)
                      width: 100%
                  height: $size - $pad * 3 + 50px
                  margin: $pad
                  background: white
                  box-sizing: border-box
                  border-radius: 20px
                  padding: 10px
                  text-align: center
                  >.close-area
                      text-align: right
                      >.close
                          cursor: pointer
                          text-align: center
                          $size: 40px
                          display: inline-block
                          background: #DDDDDD
                          width: $size
                          height: $size
                          border-radius: $size
                          line-height: 40px
                          color: white
                  >.title
                      color: #677897
                      font-size: 22px
                  >.animation
                      position: relative
                      height: 270px
                      >.coin-container
                          @-webkit-keyframes spin
                              from
                                  -webkit-transform: rotateY(0deg)
                              to
                                  -webkit-transform: rotateY(360deg)
                          height: 160px
                          width: 160px
                          position: absolute
                          top: 50%
                          left: 50%
                          margin-top: -80px
                          margin-left: -80px
                          -webkit-perspective: 1000
                          -webkit-box-reflect: below 0 linear-gradient(hsla(0, 0%, 100%, 0), hsla(0, 0%, 100%, 0) 45%, hsla(0, 0%, 100%, 0.2))
                          -webkit-filter: saturate(1.45) hue-rotate(2deg)
                          >.coin
                              height: 160px
                              width: 160px
                              position: absolute
                              -webkit-transform-style: preserve-3d
                              -webkit-transform-origin: 50%
                              -webkit-animation: spin 5s infinite
                              -webkit-animation-timing-function: linear
                              >.front, >.back
                                  position: absolute
                                  height: 160px
                                  width: 160px
                                  border-radius: 50%
                                  background-size: cover
                              >.front
                                  -webkit-transform: translateZ(8px)
                              >.back
                                  -webkit-transform: translateZ(-8px) rotateY(180deg)
                              >.side
                                  -webkit-transform: translateX(72px)
                                  -webkit-transform-style: preserve-3d
                                  -webkit-backface-visibility: hidden
                                  >.spoke
                                      height: 160px
                                      width: 16px
                                      background-image: inherit
                                      position: absolute
                                      -webkit-transform-style: preserve-3d
                                      -webkit-backface-visibility: hidden
                                      &:before, &:after
                                          content: ''
                                          display: block
                                          height: 15.68274245px
                                          width: 16px
                                          position: absolute
                                          -webkit-transform: rotateX(84.375deg)
                                          background: hsl(42, 52%, 68%)
                                          background-image: inherit
                                          background-size: 100% 1px
                                      &:before
                                          -webkit-transform-origin: top center
                                      &:after
                                          bottom: 0
                                          -webkit-transform-origin: center bottom
                                      &:nth-child(16)
                                          -webkit-transform: rotateY(90deg) rotateX(180deg)
                                      &:nth-child(15)
                                          -webkit-transform: rotateY(90deg) rotateX(168.75deg)
                                      &:nth-child(14)
                                          -webkit-transform: rotateY(90deg) rotateX(157.5deg)
                                      &:nth-child(13)
                                          -webkit-transform: rotateY(90deg) rotateX(146.25deg)
                                      &:nth-child(12)
                                          -webkit-transform: rotateY(90deg) rotateX(135deg)
                                      &:nth-child(11)
                                          -webkit-transform: rotateY(90deg) rotateX(123.75deg)
                                      &:nth-child(10)
                                          -webkit-transform: rotateY(90deg) rotateX(112.5deg)
                                      &:nth-child(9)
                                          -webkit-transform: rotateY(90deg) rotateX(101.25deg)
                                      &:nth-child(8)
                                          -webkit-transform: rotateY(90deg) rotateX(90deg)
                                      &:nth-child(7)
                                          -webkit-transform: rotateY(90deg) rotateX(78.75deg)
                                      &:nth-child(6)
                                          -webkit-transform: rotateY(90deg) rotateX(67.5deg)
                                      &:nth-child(5)
                                          -webkit-transform: rotateY(90deg) rotateX(56.25deg)
                                      &:nth-child(4)
                                          -webkit-transform: rotateY(90deg) rotateX(45deg)
                                      &:nth-child(3)
                                          -webkit-transform: rotateY(90deg) rotateX(33.75deg)
                                      &:nth-child(2)
                                          -webkit-transform: rotateY(90deg) rotateX(22.5deg)
                                      &:nth-child(1)
                                          -webkit-transform: rotateY(90deg) rotateX(11.25deg)
                              &.topup-type
                                  background: white
                                  >.side>.spoke
                                      &:before, &:after
                                          -webkit-transform: none !important
                                          background: white
                                  >.front, >.back
                                      border-radius: 0
                  >.button
                      box-sizing: border-box
                      text-align: center
                      background: blue
                      cursor: pointer
                      color: white
                      margin: 10px 40px
                      padding: 13px 0px
                      border-radius: 100px
                      background: #6CA7ED
                  >.decoration
                      width: 100%
                      >.item
                          position: absolute
                          top: 150px
                          display: inline-block
                          width: 100px
                          height: 130px
                          &.left
                              left: -20px
                              background-image: $e
                              transform: scaleX(-1)
                          &.right
                              right: -20px
                              background-image: $e
              @keyframes init
                  0%
                      background: transparent
                      >.install-body>.install
                          bottom: 0
                  100%
                      background: rgba(black, 0.6)
                      >.install-body>.install
                          bottom: 0
              @keyframes init-install
                  0%
                      bottom: -$size * 2
                  100%
                      bottom: 0
              >.bg
                  animation: init .5s forwards
              >.install-body>.install
                  animation: init-install .5s forwards
  */
  out$.modalControl = modalControl = function(store){
    var ref$, text, callback, enabled, accept, reject, coinImage, coinType;
    ref$ = store.ask, text = ref$.text, callback = ref$.callback, enabled = ref$.enabled;
    if (enabled !== true) {
      return;
    }
    accept = function(){
      return acceptAsk(store);
    };
    reject = function(){
      return cancelAsk(store);
    };
    coinImage = {
      backgroundImage: "url(" + store.ask.image + ")"
    };
    return coinType = store.ask.type + "-type";
  };
  current = {
    timer: null
  };
  makeChoice = function(err){
    return function(store){
      var cb;
      current.timer = clearTimeout(current.timer);
      cb = store.ask.callback;
      store.ask.enabled = false;
      store.ask.text = "";
      store.ask.callback = null;
      store.ask.image = "";
      if (toString$.call(cb).slice(8, -1) === 'Function') {
        return cb(err);
      }
    };
  };
  acceptAsk = makeChoice(null);
  out$.cancelAsk = cancelAsk = makeChoice('Cancelled');
  reduceOrCancel = function(store, timerSec){
    return function(_){
      current.timer = clearTimeout(current.timer);
      if (timerSec <= 0) {
        return cancelAsk(store);
      }
      return current.timer = setTimeout(reduceOrCancel(store, timerSec - 1), 1000);
    };
  };
  plug = function(type){
    return function(store, plugin, cb){
      if (toString$.call(store).slice(8, -1) !== 'Object') {
        return cb("store is required");
      }
      if (toString$.call(plugin).slice(8, -1) !== 'Object') {
        return cb("plugin is required");
      }
      if (store.ask.enabled === true) {
        return cb("Cannot ask because ask modal is busy with another task");
      }
      store.ask.enabled = true;
      store.ask.text = (plugin.token + " " + plugin.type).toUpperCase();
      store.ask.image = plugin.image;
      store.ask.type = plugin.type;
      store.ask.callback = cb;
      scrollTop();
      return reduceOrCancel(store, 11)();
    };
  };
  out$.install = install = plug('install');
  out$.replace = replace = plug('replace');
}).call(this);