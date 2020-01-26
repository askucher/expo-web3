require! {
    \localStorage
    \./pin.js : { encrypt }
    \crypto-js/aes : aes
    \./words-to-utf8.js
}
name = \sseed
export set = (value)->
    key = encrypt name
    res = aes.encrypt(value, key)
    local-storage.set-item name, res
export saved = ->
    (local-storage.get-item(name) ? "") isnt ""
export get = ->
    key = encrypt name
    res = local-storage.get-item(name) ? ""
    return res if res is ""
    aes.decrypt(res, key).toString(words-to-utf8)