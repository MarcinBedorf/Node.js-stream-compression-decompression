const {pipeline} = require('stream').promises;
const {createReadStream, createWriteStream} = require('fs');
const {createCipher} = require('crypto');
const {promisify} = require('util');
const scrypt = promisify(require('crypto').scrypt);
const {ENCRYPTED_SALT} = require('./Kryptografia/salt');
const {createGzip} = require('zlib');

(async () => {

  const [,,inputFile, outputFile, password] = process.argv;

  const algorithm = 'aes-192-cbc';
  const key = await scrypt(password, ENCRYPTED_SALT, 24);

  await pipeline(
    createReadStream(inputFile),
    createGzip(),
    createCipher(algorithm, key),
    createWriteStream(outputFile),
);

  console.log('Encrypted and compressed.');
})();
