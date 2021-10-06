/* -------------------------------------------INTRODUCTION----------------------------------------------------------
campaign.js is used to take the contract account address where Campaign.sol contract is deployed and then get an instance
of deployed Campaign.sol contract to be used in Dapp
this file exports a function which takes the depolyed contract account address and will return the deployed contract instance.
This function can be imported in other files where it can be invoked to get the instance of deployed Campaign contract
 */

import web3 from './web3';

import Campaign from './build/Campaign.json';

//export the function
export default (address) =>{

    //get an instance of deployed contract
    return new web3.eth.Contract(
        JSON.parse(Campaign.interface),
        address
    );
};
