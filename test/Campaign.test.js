/*---------------------------------------------INTRODUCTION----------------------------------------------------
testing script to do unit testing of contract
uses ganache provider as input to web3 for deployment of contract

 */

//assert module
const assert =  require('assert');

//ganache-cli module
const ganache = require('ganache-cli');

//Web3 module
const Web3 = require('web3');

//instance of web3
const web3 = new Web3(ganache.provider());

//getting the json files in build folder
const compiledFactory = require('../ethereum/build/CampaignFactory.json');

const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async ()=>{

    //get the list of accounts
    accounts = await web3.eth.getAccounts();

    //creating instance of campaignFactory contract
    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({data: compiledFactory.bytecode})
        .send({ from: accounts[0], gas:'1000000'});

    //creating an instance of Campaign contract
    await factory.methods.createCampaign('100')
        .send({from: accounts[0],
            gas: '1000000'
        });

    //getting address of first  campaign contract after it's deployment
    [campaignAddress]= await factory.methods.getDeployedCampaigns().call();

    //to fetch the deployed contract's instance
    campaign =  await new web3.eth.Contract(

        JSON.parse(compiledCampaign.interface),
        campaignAddress
    );
});

describe('Campaigns',()=>{

    //check if factory and campaign stores an address
    it('deploys a factory and a campaign',()=>{

        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
    });

    //checks if manager is assigned
    it('marks caller as campaign manager', async()=>{

        //getting the manager as manager variable is public it has a automatic method created
        const manager = await campaign.methods.manager().call();

        assert.equal(accounts[0],manager);

    });

    //contributor are stored in approvers array
    it('allows people to contribute money and mark them approvers',async()=>{

        await campaign.methods.contribute().send({

            value: '200',
            from: accounts[1]
        });

        //get the value associated with account[1] in mapping
        const isContributor = await campaign.methods.approvers(accounts[1]).call();

        assert(isContributor);
    });

    //you get error if you provide money less than the minimum contribution
    it('requires a minimum contribution',async()=>{

        try{

            await campaign.methods.contribute().send({

                value:'5',
                from:accounts[1]
            });
            assert(false);

        }catch(err){

            //check if error occurs
            assert(err);
        }

    });

    //manager can create a request
    it('allows a manager to make a payment request',async()=>{

        await campaign.methods
            .createRequest('Buy batteries','100',accounts[1])
            .send({
                from:accounts[0],
                gas: '1000000'
            });

        //get request at index 0 in requests array
        const request = await campaign.methods.requests(0).call();

        assert('Buy batteries',request.description);
    });

    //end to end test with all methods
    it('processes requests', async()=>{


        await campaign.methods.contribute().send({

            from:accounts[0],
            value: web3.utils.toWei('10','ether')
        });

        await campaign.methods
            .createRequest('A',web3.utils.toWei('5','ether'),accounts[1])
            .send({
                from:accounts[0],
                gas:'1000000'
            });

        await campaign.methods.approveRequest(0)
            .send({
                from:accounts[0],
                gas:'1000000'
            });

        await campaign.methods.finalizeRequest(0)
            .send({

                from:accounts[0],
                gas:'1000000'
            });

        let balance = await web3.eth.getBalance(accounts[1]);

        balance = web3.utils.fromWei(balance, 'ether');

        balance = parseFloat(balance);

        console.log(balance);

        assert(balance>104);
    });
});
