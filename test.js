import Blockchain from "./Blockchain.js";
const LoanManagementSystem = new Blockchain();
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const sha256 = require("sha256");
const prompt = require("prompt-sync")();
console.log(LoanManagementSystem.chain[0]);
var __prevHash = LoanManagementSystem.chain[0].prevHash;
let tempName = " ";
let tempCibilscore =0 ;
function userinput(){
    console.log(
        "-----------------------------------------------------\n"+
        "Click 1 : Register \n" + 
        "Click 2 : See valid Hash of user details\n" +
        "Click 3 : Ask for loan\n" + 
        "Click 4 : Print mined blocks\n" +
        "-----------------------------------------------------\n"
    );
    var input = prompt();
    return input;
}

// const newTransaction = {
//     name: _name ,
//     cibilscore: _cibilScore ,
//     Id: _Id,
//     password: _password,
//     amount: _amount 
// }

function register(){
    var name = prompt("name :");
    var cibilscore = prompt("cibilscore :");
    var Id = prompt("Id : ");
    var password = prompt("password : ");
    //need to store original merkelroot in a map.
    LoanManagementSystem.createNewTransaction(name, cibilscore, Id, password, 0);
    LoanManagementSystem.storeValidHash();
}

// function askLoan(){
//     var name = prompt("name :");
//     var cibilscore = prompt("cibilscore :");
//     var Id = prompt("Id : ");
//     var password = prompt("password : ");
//     var amount = prompt("amount : ");

//     LoanManagementSystem.createNewTransaction(name, cibilscore, Id, password, amount);
// }

function printBlocks(i){

    return[
        "hash : " + LoanManagementSystem.chain[i].hash,
        "TimeStamp : " + LoanManagementSystem.chain[i].timestamp,
        "Merkel Root : " + LoanManagementSystem.chain[i].MerkelRoot,
        "Nonce : " + LoanManagementSystem.chain[i].Nonce,
        "Prev Hash : " + LoanManagementSystem.chain[i].PrevHash,
    ]
}

var input = userinput();

while (1){

    if(input == 1){//register
        register();
        LoanManagementSystem.POW(__prevHash);
        __prevHash = LoanManagementSystem.chain[LoanManagementSystem.chain.length - 1].hash;
        input = userinput();
    }
    else if(input == 2){//see valid hash and user details
        var id = prompt("Id : ");
        for(var[key,value] of LoanManagementSystem.validHash){
            if(id == key){
                console.log(value);
                break;
            }
            else{
                continue;
            }
        }
        for(let i = 0 ; i < LoanManagementSystem.newTransactions.length ; i++){
            if(id == LoanManagementSystem.newTransactions[i].Id){
                tempName = LoanManagementSystem.newTransactions[i].name;
                tempCibilscore = LoanManagementSystem.newTransactions[i].cibilscore;
                //let tempPassword = LoanManagementSystem.newTransactions[i].password;
            }
        }
        console.log(
            "Id : " + id +"\n"+
            "Name : " + tempName + "\n"+
            "CibilScore : " + tempCibilscore + "\n"
        );
        LoanManagementSystem.POW(__prevHash);
        __prevHash = LoanManagementSystem.chain[LoanManagementSystem.chain.length - 1].hash;
        input = userinput();
    }
    else if(input == 3){//ask loan
        var name = prompt("name :");
        var cibilscore = prompt("cibilscore :");
        var Id = prompt("Id : ");
        var password = prompt("password : ");
        var loanAmount = prompt("Loan Amount : ");
        LoanManagementSystem.createNewTransaction(name, cibilscore, Id, password, loanAmount);
        var verificationHash = LoanManagementSystem.verifyTransaction();
        var realOne = LoanManagementSystem.validHash.get(Id);
        // console.log(verificationHash);
        // console.log(realOne);
        // console.log("map values below");
        // for (var [key, value] of LoanManagementSystem.validHash) {  
        //     console.log(key + ' = ' + value);  
        // }  
        if(realOne == verificationHash){
            console.log("Your Loan will be sanctionsed");
        }
        else{
            console.log("wrong credentials");
        }
        LoanManagementSystem.POW(__prevHash);
        __prevHash = LoanManagementSystem.chain[LoanManagementSystem.chain.length - 1].hash;
        input = userinput();
    }

    else if(input == 4){//mine transactions or print blocks
        for(let i = 0 ; i < LoanManagementSystem.chain.length ; i++){
            console.log(printBlocks(i));
        }
        input = userinput();
    }

    else if(input == 5){
        break;
    }
}