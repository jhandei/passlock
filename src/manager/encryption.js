var aes256 = require('aes256');

const encrypt = (message, key) => {
    return aes256.encrypt(key, Buffer.from(message)).toString("base64");
}

const decrypt = (cipherText, key) => {
    return aes256.decrypt(key, Buffer.from(cipherText, "base64"));;
}

export {encrypt, decrypt}