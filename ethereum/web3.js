/*-------------------------------INTRODUCTION--------------------------------------------------------------
web3.js will create an instance of web3 which will be used for deployment of contracts for Dapp
this web3 will either use metamask injected provider if metamask is installed in user's browser or custom made http provider that
takes infuta url as input
 */
//creating an instance of web3 and importing it
import Web3 from "web3";

let web3;

if(typeof window !=='undefined' && typeof window.ethereum !=='undefined'){

    //we are in the browser and metamask is running
    //requesting to gain access to account
    window.ethereum.request({method: "eth_requestAccounts" });

    //creating an instance of web3
    web3 =  new Web3(window.ethereum);

}else{
//we are on the server or the user is not running metamask
    //creating your own provider through infura url
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/87999500b8d24c6c9152845e9bb726e1'
    );

    //instance of web3
    web3= new Web3(provider);
}
export default web3;


