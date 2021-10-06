/* --------------------------------------------INTRODUCTION------------------------------------------------------
creating an instance of deployed CampaignFactory contract using it's interface(abi) and contract address
then exporting the contract instance to be used in Dapp
 */
import web3 from "./web3";

import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(

    //get an instance of deployed CampaignFactory contract with the help of interface(abi) and the contract account address
  JSON.parse(CampaignFactory.interface),
    '0xFE734Fdd4FAA812B7861025c0e0351646eabc48A'
);

export default instance;
