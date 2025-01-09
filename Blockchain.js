import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const sha256 = require('sha256');

function Blockchain(){
    this.chain = [];
    this.newTransactions = [];
    this.validHash = new Map();
    this.currentTrans = 0;
    this.createNewBlock(0, '0', '0', '0');
}
// const blockStruct = {
//     hash : hash,
//     timestamp : Date.now(),
//     MerkelRoot : this.merkelRoot(4),
//     Nonce : _nonce,
//     PrevHash : _prevHash
// }

Blockchain.prototype.createNewBlock = function(_nonce, _hash, _prevHash,_merkelRoot){
    const newBlock = {
        hash: _hash, 
        timestamp : Date.now(), 
        MerkelRoot : _merkelRoot,
        Nonce: _nonce, 
        PrevHash: _prevHash, 
    }

    this.newTransactions = [] ;
    this.currentTrans = 0;
    this.chain.push(newBlock);
}

Blockchain.prototype.createNewTransaction = function(_name, _cibilScore, _Id,_password, _amount){
    const newTransaction = {
        name: _name ,
        cibilscore: _cibilScore ,
        Id: _Id,
        password: _password,
        amount: _amount 
    }

    this.newTransactions.push(newTransaction);
    this.currentTrans++;
}

Blockchain.prototype.blockHash = function(_prevHash, _merkelroot, _nonce){
    const dataAsString = _prevHash + _nonce.toString() + _merkelroot ;
    const hash = sha256(dataAsString);
    return hash;
}

Blockchain.prototype.POW = function(_prevHash) {
    let _nonce = 0 ;
    _prevHash = this.chain[this.chain.length-1].hash;
    let _merkelRoot = this.merkelRoot(4)
    let hash = this.blockHash(_prevHash, _merkelRoot, _nonce);

    while(hash.substring(0,4) !== '0000'){ 
        _nonce++; 
        hash = this.blockHash(_prevHash,_merkelRoot,_nonce);
    }

    const blockStruct = {
        hash : hash,
        timestamp : Date.now(),
        MerkelRoot : _merkelRoot,
        Nonce : _nonce,
        PrevHash : _prevHash
    }

    this.chain.push(blockStruct);

    return [
        "hash : " + hash,
        "TimeStamp : " + Date.now(),
        "Merkel Root : " + _merkelRoot,
        "Nonce : " + _nonce,
        "Prev Hash : " + _prevHash,
    ]
}



Blockchain.prototype.storeValidHash = function (){
    let tempHash = [] ;
    //merkel root for transaction verification
    let userName = sha256(this.newTransactions[this.currentTrans-1].name);
    tempHash[0] = userName;
    let userId = sha256(this.newTransactions[this.currentTrans-1].Id);
    tempHash[1] = userId;
    let userCibilScore = sha256(this.newTransactions[this.currentTrans-1].cibilscore);
    tempHash[2] = userCibilScore;
    let userPassword = sha256(this.newTransactions[this.currentTrans-1].password);
    tempHash[3] = userPassword;

    tempHash[4] = sha256(tempHash[0] + tempHash[1]);
    tempHash[5] = sha256(tempHash[2] + tempHash[3]);

    tempHash[6] = sha256(tempHash[4]+ tempHash[5]);

    this.validHash.set(this.newTransactions[this.currentTrans-1].Id , tempHash[6]);
    
}

Blockchain.prototype.verifyTransaction = function(){
    let tempHash3 = [];
    tempHash3[0] = sha256(this.newTransactions[this.currentTrans-1].name);
    tempHash3[1] = sha256(this.newTransactions[this.currentTrans-1].Id);
    tempHash3[2] = sha256(this.newTransactions[this.currentTrans-1].cibilscore);
    tempHash3[3] = sha256(this.newTransactions[this.currentTrans-1].password);
    tempHash3[4] = sha256(tempHash3[0] + tempHash3[1]);
    tempHash3[5] = sha256(tempHash3[2] + tempHash3[3]);

    tempHash3[6] = sha256(tempHash3[4]+ tempHash3[5]);
    
    return tempHash3[6];
}


Blockchain.prototype.merkelRoot = function(_leafNodes){

    //merkel root for transaction

    let tempHash2 = [];
    tempHash2[0] = sha256(this.newTransactions[this.currentTrans-1].name);
    tempHash2[1] = sha256(this.newTransactions[this.currentTrans-1].cibilscore.toString());
    tempHash2[2] = sha256(this.newTransactions[this.currentTrans-1].Id.toString());
    tempHash2[3] = sha256(this.newTransactions[this.currentTrans-1].password.toString());
    tempHash2[4] = sha256(this.newTransactions[this.currentTrans-1].amount.toString());
    tempHash2[5] = sha256(this.newTransactions[this.currentTrans-1].amount.toString());
    tempHash2[6] = sha256(tempHash2[0] + tempHash2[1]);
    tempHash2[7] = sha256(tempHash2[2] + tempHash2[3]);
    tempHash2[8] = sha256(tempHash2[4] + tempHash2[5]);
    tempHash2[9] = tempHash2[8];
    tempHash2[10] = sha256(tempHash2[6] + tempHash2[7]);
    tempHash2[11] = sha256(tempHash2[8] + tempHash2[9]);
    tempHash2[12] = sha256(tempHash2[10] + tempHash2[11]);

    return tempHash2[12];
}

export default Blockchain ;