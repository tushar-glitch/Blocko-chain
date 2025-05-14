// web3.js
const Web3 = require('web3');

// Use Infura, Alchemy, or local node
const web3 = new Web3(new Web3.providers.HttpProvider(
  process.env.WEB3_PROVIDER || 'https://polygon-amoy.infura.io/v3/4c6cee5814554e5291bf2e3d457dd2fd'
));

// Add account with private key for sending transactions
const privateKey = 'c68bf176e8e1094ce671c4a1b821f1f36a1dee88605226c74528c773a2792a2b';
const account = web3.eth.accounts.privateKeyToAccount('0x' + privateKey);
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;

module.exports = web3;
