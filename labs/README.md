# Lab 1 - Truffle / TestRPC and Private ethereum and quorum clusters on Azure

- TODO UI

# Lab 2 - Deploy Smart Contract on Private Etherum Network

- Create the private ethereum cluster on Azure and ssh into the node using the public IP

    - sudo apt-get install -y software-properties-common 
    - sudo add-apt-repository -y ppa:ethereum/ethereum 
    - sudo apt-get update 
    - sudo apt-get install -y solc

- Copy Storage.sol file to edxlab3/Storage.sol
- Compile the contract and load the script

    - (echo -n "var storageOutput=" ; solc --optimize --combined-json abi,bin,interface Storage.sol) > storage.js
    - geth attach
    - &gt; loadScript('storage.js')

- Get the abi and bin of the Contract

    - &gt; var storageContractAbi = storageOutput.contracts['Storage.sol:Storage'].abi
    - &gt; var storageContract = eth.contract(JSON.parse(storageContractAbi))
    - &gt; var storageBinCode = "0x" + storageOutput.contracts['Storage.sol:Storage'].bin

- Deploy the contract

    - &gt; personal.unlockAccount(eth.accounts[0], "[password]")
    - &gt; var txObject = { from: eth.accounts[0], data: storageBinCode, gas: 1000000 };
    - &gt; var storageInstance = storageContract.new(5, txObject)
    - &gt; eth.getTransactionReceipt(storageInstance.transactionHash);
    - &gt; var storageAddress = eth.getTransactionReceipt(storageInstance.transactionHash).contractAddress
    - &gt; var storage = storageContract.at(storageAddress);
    - &gt; storage.get.call()
    - &gt; storage.set.sendTransaction(100, {from: eth.accounts[0], gas: 1000000})
    - &gt; storage.get.call()

# Lab 3 - Decoupled Smart Contracts

