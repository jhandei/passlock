const XChaCha20 = require('xchacha20-js');

let xcha20 = new XChaCha20;

let key = Buffer.from('808182838485868788898a8b8c8d8e8f909192939495969798999a9b9c9d9e9f', 'hex');
let nonce = Buffer.from('404142434445464748494a4b4c4d4e4f5051525354555658', 'hex');

let blockCounter = 1; // Optional, defaults to 1 per the RFC

const encrypt = (message) => {
    return xcha20.encrypt(message, nonce, key, blockCounter);
}

const decrypt = (cipherText) => {
    return xcha20.decrypt(cipherText, nonce, key, blockCounter);
}

export {encrypt, decrypt}