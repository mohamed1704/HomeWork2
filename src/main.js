const { Blockchain }  = require('./blockchain');
const { Transaction }  = require('./transaction');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('7c4c45907dec40c91bab3480c39032e90049f1a44f3e18c3e07c23e3273995cf');

const myWalletAddress = myKey.getPublic('hex');

const myCoin = new Blockchain();

myCoin.minePendingTransactions(myWalletAddress);

const tx1 = new Transaction(myWalletAddress, 'address2', 20);
tx1.signTransaction(myKey);
myCoin.addTransaction(tx1);

myCoin.minePendingTransactions(myWalletAddress);

const tx2 = new Transaction(myWalletAddress, 'address1', 20);
tx2.signTransaction(myKey);
myCoin.addTransaction(tx2);

myCoin.minePendingTransactions(myWalletAddress);

console.log();
console.log(`Balance:${myCoin.getBalanceOfAddress(myWalletAddress)}`);
console.log();
console.log('is valid?', myCoin.isChainValid() ? 'true' : 'false');
