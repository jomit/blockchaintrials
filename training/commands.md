# Geth Commands and Options

Ropsten revival

    geth --testnet removedb
    geth --testnet --fast --nodiscover

    # in seperate commnad line

    geth attach

    > admin.addPeer('enode://6ce05930c72abc632c58e2e4324f7c7ea478cec0ed4fa2528982cf34483094e9cbc9216e7aa349691242576d552a2a56aaeae426c5303ded677ce455ba1acd9d@13.84.180.240:30303')

    > admin.addPeer('enode://20c9ad97c081d63397d7b685a412227a40e23c8bdc6688c6f37e97cfbc22d2b4d1db1510d8f61e6a8866ad7f0e17c02b14182d37ea7c3c8b9c2683aeb6b733a1@52.169.14.227:30303')


Start new test node

    geth --identity "MyTestNode" --datadir "./data" --testnet --fast

Enable json rpc endpoint

    geth --rpc --rpcaddr "localhost" --rpcport 8545

Start Console interface

    geth --testnet console
    geth console

Start Console and attach it to running geth instance
    
    geth attach
    geth attach "//./pipe/geth.ipc"
    geth attach "http://...8545"
    geth attach "ws://...8546" 

Start Console with preload .js files and exec

    # geth --verbosity "0" --datadir "./data" --testnet --preload "./scripts/utils.js" console

    geth --testnet console --preload "./scripts/utils.js"

    > testAccount
    > testCheck()

    geth --testnet console --exec "personal.listAccounts"

    geth --testnet console --exec "personal.listAccounts"

Miner options

    # geth --mine
    # geth --minerthreads           (default 8)
    # geth --etherbase              (addess of account for mining rewards, default #0)
    # geth --gasprice "value"       (minimal gas accepted for mining a txn. default 2E10)
    # geth --extradata "somedata"   (default "client miner")
    # geth --targetgaslimit "value" (target gas floor for the blocks to mine, max gas spent in a block)

    geth --testnet --mine --minerthreads "4" --extradata "jomit.net"

Manage Accounts Options

    geth --testnet account new
    geth --testnet account list

    geth --testnet console   or   geth attach  (if ethereum wallet is running)

    > web3.fromWei(eth.getBalance(eth.coinbase),"ether")    
    or
    > web3.fromWei(eth.getBalance(personal.listAccounts[0]),"ether")

Unlock accounts and transfer ether using geth

    # geth --unlock   (not a secure way as any client can now attach to this geth instance and invoke send )
    geth --testnet --exec "loadScript('./scripts/send-ether.js  ')" --unlock "0" console 


# API's under Geth

Common command to start the console before any API's

    geth --testnet console

    or

    geth attach     (to attach to a running geth instance )
    geth --datadir "./data" --testnet attach "//./pipe/geth.ipc"


Admin API

    > web3.eth.accounts 
    > eth.accounts
    > net.listening

    > admin.nodeInfo
    > admin.datadir
    > admin.peers
    > admin.addPeer('enode://20c9ad97c081d63397d7b685a412227a40e23c8bdc6688c6f37e97cfbc22d2b4d1db1510d8f61e6a8866ad7f0e17c02b14182d37ea7c3c8b9c2683aeb6b733a1@52.169.14.227:30303')

    # Start and Stop JSON RPC.
    
    > admin.startRPC("localhost",8545, "web3")
    > admin.stopRPC()

    # Start and Stop WS RPC.

    > admin.startWS(...)
    > admin.stopWS(...)

    # Set Solidity Compiler
    
    geth --solc  or
    > setSolc('path to solidity compiler')   

Personal API

    > personal.listAccounts
    > personal.newAccount("password")

    # To Delete an account just remove the account specific file from the "keystore" folder

    > personal.importRawKey(keydata, paraphrase)

    # Better option to unlock accounts than "get --unlock"

    > personal.unlockAccount()
    > personal.lockAccount()     

    # Send Transaction

    > from = personal.listAccounts[0]
    > to = personal.listAccounts[1]
    > amount = web3.toWei(0.001."ether")
    > txn = { from : from, to: to, amount : amount }
    > personal.sendTransaction(txn, "<password>")

Miner API

    > miner.setEtherbase(personal.listAccounts[0])
    > miner.setExtra("jomit.net")
    > miner.start()  or  
    > miner.start(num_threads)

    # Wait for few minutes. Get the accounts address using : personal.listAccounts[0]
    # Search that account on http://testnet.etherscan.io and see if you have mined some blocks

    # Other Commands

    > miner.stop()
    > miner.setGasPrice(num)

txpool

    > txpool.status
    > txpool.inspect
    > txpool.content

debug

    > debug.verbosity(level)
    > debug.dumpBlock(number)
    > debug.traceBlockByNumber(number)
    > debug.traceBlockByHash(hash)
    > debug.traceTransaction(txHash..)

    > debug.gcStats()
    > debug.memStats()

    > debug.cpuProfile(file, seconds)
    > debug.startCPUProfile(file)
    > debug.stopCPUProfile()

    # Go Lang level debugging

    > debug.goTrace(file, seconds)
    > debug.stacks()
    > debug.vmodule(string)

# Create Sample DAPP using web3js

- Prereq
    - npm install -g yo
    - npm install -g generator-webapp
    - npm install -g gulp
    - npm install -g bower

- Generate App
    - cd sample-dapp
    - yo webapp     (do not select any framework, no jquery and TDD)
    - gulp serve

- Add web3js package
    - bower install web3

- Start geth with JSON-RPC enabled
    - "geth-start-dapp.bat"

- Run the App
    - npm install
    - gulp serve


# Deploying and Invoking Contracts

    # Compiling
    
    - solc --abi ./contracts/sample.sol > ./contracts/sample.abi.json
    - solc --bin ./contracts/sample.sol > ./contracts/sample.bin
    - solc --combined-json abi,bin ./contracts/sample.sol > ./contracts/sample.json

    # Deploying using web3

    - var contract = web3.eth.contract(abiDefinition);
    - contract.new(...)

    # Invoking Contracts

    - var contract = web3.eth.contract(abiDefinition);
    - var contractInstance = contract.at(address);

    - contractInstance.Method.call (...)  or
    - contractInstance.Method.sendTransaction (...)

    - web3.eth.call(...)
    - web3.eth.sendTransaction(...)

# Events and Logs

    - var filter = web3.eth.filter(args)     # args = event selection criteria
        - args can be "string" or "json object"
    - filter.watch(...)
    - filter.stopWatching()
    - filter.get(...)

    - var contract = web3.eth.contract(abiDefinition)
    - var contractInstance = contract.at(contract_address)

    - contractInstace.allEvent(addtionalOptions)
    - ..OR..
    - var contractEvent = contractInstance.NumberSetEvent(indexedOptions, addtionalOptions)
    - contractEvent.get(callback_function)
        - Array of events
    - contractEvent.watch(callback_function)
        - Event data
    - contractEvent.stopWatching(callback_function)

    - 










 

    




    
    
         






















