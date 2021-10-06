/*-------------------------------------INTRODUCTION--------------------------------------------------------
compile.js file is used to compile and store the interface(abi) and bytecode of contract in build folder

1. get the path of build folder
2. delete the build folder
3. get the path of contract in 'contracts' folder
4. read the contracts
5. compile the contracts and save the compilation object
6. create the build folder
7. store the keys of compilation object as json file names in build folder by substituting ':' with ' ' and values of keys as content
 of json files by iterating over the object using for loop
 */
//path module
const path = require('path');
//solc module
const solc = require('solc');
//fs module
const fs = require('fs-extra');

//get the path of 'build' folder if it exists
const buildPath = path.resolve(__dirname, 'build');
//remove the 'build' folder if it exists
fs.removeSync(buildPath);

//get the path of contract
const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
//read the contract
const source = fs.readFileSync(campaignPath, 'UTF-8');
//compile the contract and store the compilation object we get after compilation
const output = solc.compile(source, 1).contracts;

//create the 'build' directory
fs.ensureDirSync(buildPath);

//store the output to 'build' folder
for (let contract in output) {
    fs.outputJsonSync(
        //create file with json file name as key names substituting  ":" with " ", value of keys as content of json files
        path.resolve(buildPath, contract.replace(':', '') + '.json'),
        output[contract]
    );
}
