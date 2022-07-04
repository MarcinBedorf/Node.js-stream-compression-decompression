const {pipeline} = require('stream').promises;
const {createReadStream, createWriteStream} = require('fs');
const {createDecipher} = require('crypto');
const {promisify} = require('util');
const scrypt = promisify(require('crypto').scrypt);
const {ENCRYPTED_SALT} = require('./salt');
const {createGunzip} = require('zlib');

(async () => {

  const [,,inputFile, outputFile, password] = process.argv;

  const algorithm = 'aes-192-cbc';
  const key = await scrypt(password, ENCRYPTED_SALT, 24);

  await pipeline(
    createReadStream(inputFile),
    createDecipher(algorithm, key),
    createGunzip(),
    createWriteStream(outputFile),
  );

  console.log('Decrypted and decompressed.');
})();
