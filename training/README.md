# Blockchain 101

- "Decentralized system for exchange of value"
    - Uses a shared distributed ledger
    - Transaction immutability achieved by way of blocks and chaining
    - Leverages consensus mechanism for validating the transactions
    - Uses cryptography for trust, accountability, security

- Traditional RDBMS systems allow "CRUD", DLT (distributed ledger technology) only allows "CR", data added to the ledger cannot be Updated or Deleted.
- Transactions are written in set of units called "Blocks". Each block contains Index, Timestamp, HashValue and the hash value of the Previous Block to form a chain of blocks and achieve immutability. Block#0 is the genesis block.
- Consensus is protocol by which peers agree on the state of ledger. Common consensus protocols are Proof of Work, Proof of Stake and Tendermint.



# Ethereum 101

- Vitalik Buterin and Gavin Wood co-founded it in 2014. Release this Yellow Paper on implementation details of it: http://gavwood.com/Paper.pdf
- Frontier version launched in July 30 2015. Current version is Homestead, release in Mar 2016. Metropolis and Serenity coming soon..
- Key difference from Bitcoin is the ability to do scripting via "Smart Contracts".
- Decentralized Apps (DAPP) are used to interact with Smart Contracts.
- Smart Contract execution requires Ether (ETH) which is the value token in Ethereum.
- User who invokes the smart contracts pays a small fee for execution which is collected by the miner who validates and writes the transaction to the chain.
- We can get Ether by becoming a miner, trading other currencies on exchanges or via ether faucets.
- Resources:
    - http://www.weekinethereum.com/
    - http://www.weekinethereum.com/

# DAPP

- FrontEnd
    - Typically Single Page App HTML/JS
    - Web3 API
- Smart Contracts
    - Solidity or Serpent
- Backend
    - Ethereum Network

https://akasha.world/


# Ethers, GAS and EVM

Ethers

- Lowest denomination for Ehter is "wei". There are many other denominations like shannon, finney, szabo. More details : https://ethereum.stackexchange.com/questions/253/the-ether-denominations-are-called-finney-szabo-and-wei-what-who-are-these-na
- Sample Converter here : https://etherconverter.online/
- Ether Creation:
    - 60 million presale in 2014
    - 12 million created to fund the development
    - 5 Ethers created as reward for every block; a block is writeen roughly every 14 seconds
    - Sometimes 2-3 Ehters for non-winning miners (uncle rewards)

EVM
- Ethereum Virtual Machine(EVM), a software that can execute ethereum bytecode
- Runs as a process on the node and manages the memory, stack and bytecode execution engine for smart contracts
- Implemented in multiple languages Go, Python, C++..

Gas
- Unit in which EVM resource usage is measured
- Calculated based on 1) Type/Number of instructions and 2) Amount of Storage for a transaction.
- Each Opcode has a fixed number of Gas associated with it. For more details on estimating transaction cost see : http://www.ethdocs.org/en/latest/contracts-and-transactions/account-types-gas-and-transactions.html#estimating-transaction-costs
- Transaction Fee = gasUsed * gasPrice, where gasUsed in the sum of all instructions/opcodes code multiplied by gasPrice that the user specifies in the transaction & is acceptable by the miners
- For each trasanction the Originator/User needs to pass in 2 parameters:
    1. Start Gas : Max units of gas that  originator is willing to spend
    2. Gas Price : Per unit gas price that originator is willing to pay
- Fee Processing:
    - Fees = (startGas * gasPrice) is collected from the originator and kept in an escrow. 
    - The code gets executed and the actual fee is calculated.
    - If the amount of gas used is less than startGas, a refund is issued
    - If the amount of gas used is more than startGas, the originator loses the funds, the transaction is rolled back with an "Out of Gas Exception"
- Resources
    - Latest Gas prices and historical data : https://etherscan.io/chart/gasprice
    - Ether Unit Conversion : https://converter.murkin.me/


# Ethereum Networks

- Live Network
    - Network ID = 1
- Test-Net
    - Network ID = 2 Morden  (retired)
    - Network ID = 3 Ropsten (current)
    - KOVAN
    - RINKEBY
- Private Network
    - Network ID = <Assigned>
- Public Blockchain Explorers
    - https://etherscan.io  ,  https://testnet.etherscan.io/
    - https://live.ether.camp
    - https://etherchain.org
- Private Blockchain Explorers
    - https://github.com/etherparty/explorer


# Consensus Models

- Process by which blocks get created
    - Validate Transactions
    - Secures the network
    - 2 Common Models are:
        - Proof of Work   (used by bitcoin and ethereum)
        - Proof of State  (ehtereum network expected to switch to proof of stake in near future)
- Incentive driven Model. 2 forms of rewards:
    - Fixed Rewards in tokens
    - Transaction fee
- Proof of Work
    - Computationally (CPU, Memory, Bandwidth) intensive
    - Unconfirmed transactions are ground in a block
    - Before the block is validated the miners need to "solve a puzzle", which can only be solved via brute force, this shows proof of work.
    - The first miner to solve the puzzle submits the blocks and is validated by the network
    - Example of puzzle:
        - Flow:
            - [ Data  =>  "X"  =>  Hash Function  =>  00000...00b268ba134599a8e37fc...]
        - Guess value of "X" such that there are "N" leading 0's in hash
            - X = Referred to as nonce
            - N = Decides the puzzle difficulty
        - Sample Code
            - See "pow-sample.js"
    - Ehereum Proof of Work
        - Protocol      :   GHOST
        - Algorithm     :   ETHASH
        - Difficulty    :   Network adjusted, block created every 12 seconds
        - Incentive     :   5 Ether + Gas fee for transactions + Uncles reward 4.375 ETH (Max: 2) given to the miners who didn't get rewarded due to network latency.
    - Proof of Work model is environmentally unfriendly as it uses too much electricity. (hence the need for alternative models like proof of stake)
- Proof Of Stake
    - Node to validate selected by the network, so no competition
    - "Stake" refers to the wealth that users hold on the network
    - Node that validates, referred to as "Validator" not a miner
    - Ethereum Proof of Stake:
        - Future version will switch to Proof of Stake. Protocal : CASPER

# Ethereum Wallet

- Download office ethereum wallet from http://ethereum.org
- Types of Wallet Accounts:
    - Accounts (a.k.a Externally Owned Account - EOA )
        - Has an Address
        - Private key protectec by password
        - Cannot display incoming transactions
    - Contract Account
        - Has an Address but NO private key
        - Holds and Runs code
        - Associated with 1 or more Accounts
        - Lists incoming transactions
        - NOT free to use
        - 2 types of contract accounts:
            - Single Owner      :   One Account creates & owns
            - MultiSignature    :   One Account creates, Multiple owners. 
            - MultiSig is also referred as M-of-N type wallets:
                - N = Number of owners
                - M = Required approvals to confirm transaction which do not meet the criteria for daily spend.
- Resources:
    - Download Wallet & Mist : https://github.com/ethereum/mist/releases
    - Resolve wallet syncing issues : https://theethereum.wiki/w/index.php/Ethereum_Wallet_Syncing_Problems
    - Ropsten Revival, Dos attack on Ropsten : https://github.com/ethereum/ropsten/blob/master/revival.md
    - https://github.com/ethereum/ropsten/blob/master/README.md 

# MetaMask

- https://metamask.io/

# Solidity Contracts

- Remix, Online Solidity contract editor
    - https://ethereum.github.io/browser-solidity/
- http://thedapps.com/DAPP-Registry/

# Ethereum Client Node

- Yellow Paper (specs): http://gavwood.com/paper.pdf
- "geth" is the most popular Go Lang client.
- Client connects to peers using "DEVp2p", defualt port = 30303
- Client stores data in local database "levelDB". Key/Value store open source DB from google.
- DAPP's and Explorers connect to client using:
    - IPC-RPC (default and more secure)
    - JSON-RPC (on port: 8545)
- JS API Console can be attached to client node for invoking web3 API

# Geth - GoLang Ethereum Client

- Install : https://geth.ethereum.org/downloads/   
- Location with Ethereum Wallet : %APPDATA%\Ethereum Wallet\binaries\Geth 
- (Add the ethereum wallet geth location to the path)
- Commands:
    - geth help   (see all the option categories)
    - geth version
    - geth licence
    - geth --verbosity 3
    - geth --identity "MyTestNode"
    - geth --datadir "/data-dir"
    - geth --keystore "/key-dir"
    - geth --networkid 3        (3 = Ropsten)
    - geth --testnet
- IPC-RPC:
    - Enabled by default for all API's : admin, eth, web3, personal, net, miner, debug, shh, txpool
    - Can only be used when client node is on the same VM, it cannot be used over network. If client is over network we need to use JSON-RPC or WS-RPC
    - geth --ipcdisable
    - geth --ipcvalue
    - geth --ipcpath "geth.ipc"
- JSON-RPC
    - By default only enabled for these API's : eth, web3, net
    - Uses http transport over port : 8545
    - geth --rpc
    - geth --rpcapi
    - geth --rpcaddr
    - geth --rpcport
    - geth --rpccorsdomain
- WS-RPC
    - Uses tcp transport over port : 8546
    - geth --ws
    - geth --wsapi
    - geth --wsaddr
    - geth --wsport

- See "commands.md" file for more commands...


# Web3 JavaScript API

- Wiki :  https://github.com/ethereum/wiki/wiki/JavaScript-API 
    - eth       :   for ethereum blockchain related methods
    - net       :   for node's network status
    - personal  :   for account managment
    - db        :   for get/put for local LevelDB
    - shh       :   for P2P messaging using Whisper
- Available both in interactive and non-interactive mode
- eth, net api are available as shorthand

# Management API's

- Wiki : https://github.com/ethereum/go-ethereum/wiki/Management-APIs 
    - admin     :   node Management
    - personal  :   account managment
    - miner     :   miner management
    - txpool    :   transaction pool
    - debug     :   node debugging

- See "commands.md" file for more commands...

# Account Nonce

- Primary goal of nonce is to prevent replay attacks
- Transaction counter in each account
    - Every transaction has a unique nonce
    - The transaction object in "person.sendTransaction" can specify nonce
    - For each transaction, If Nonce == Nonce of last confirmed transaction + 1
        - If YES => transaction is sent to  "Pending Pool"   (this pool is the candidate for mining)
        - If NO => transaction is sent to  "Queue Pool"
- Pending and Queued pools are referred to as "txpool"

# Web3 API

- Multiple libraries for connecting with Ethereum
    - web3js        (javascript)
    - web3j         (java)
    - nethereum     (.net)
    - web3.py       (python)
- web3js wiki :  https://github.com/ethereum/wiki/wiki/JavaScript-API 
- Javascript cannot handle big number values correctly so manage the balances in WEI
- web3js uses the "BigNumber" library : https://github.com/mikemcl/bignumber.js
    - Even bignumber library cannot handle more than 20 floating points


# Solidity Compiler

- Most popular smart contract compiler
- Compilation of smart contracts requires 2 parts:
    1. Bytecode / EVM code
        - Deployed to Blockchain
    2. Application Binary Interface (ABI), abiDefinition
        - Interface Definition
        - Needed for contract deployment
        - Needed for invoking contracts
- Compiler Options
    - Ethereum Wallet   :   https://github.com/ethereum/mist/releases
    - Remix             :   https://ethereum.github.io/browser-solidity/
    - solc              :   https://github.com/ethereum/solidity/releases
    - node solc     
- Install "solc" and add it to the Path
- Solc Compiler Options
    - solc --bin sample.sol
    - solc --abi sample.sol
    - solc --combined-json abi, bin... sample.sol
    - See "sol-compile.bat" and "commands.md" files for more details on commands

# Deploying and Invoking Contracts

- Deployment is recoded as a transaction on the chain/ledge
- Contract is only available after it has been mined
- Deployment is NOT FREE. Originator of the deployment transaction pays fees for this
- Bytecode of the contract is deployed on ALL nodes.
- Contract Object
    - web3.eth.contract(abiDefinition Array) returns a contract object
    - Contract object can be used to
        - Deploy contract code to EVM
        - Invoke a contract function
        - Watch for events from contract instance
- We can use "Remix" to generate the web3 code for your contract and estimate gas.
- To Invoke a Contract you need:
    - ABI Definition of the contract
    - Address of the contract
- Example
    - var contract = web3.eth.contract(abiDefinition);
    - var contractInstance = contract.at(address);
    - contractInstance.Method.call (...)  or
        - This runs it locally with no state changes and no fees.
    - contractInstance.Method.sendTransaction (...)
        - This generates a transaction, runs on all nodes and performs state changes with gas fees.
- We can also use below methods to invoke a contract
    - web3.eth.call
    - web3.eth.sendTrasaction
    
# Ethereum Events and Logs

- Contract Events are logged in event logs which are available in all nodes
- A DAPP watching for events will get notified when the event is raised.
- 3 Usage Patterns for events/logs:
    1. Receive event data for Transaction
        - To get the transaction data or return value of the method invoked, once the transaction is mined.
    2. Asynchronous Notifications
        - To perform any synchronous operation like external DB update or Ship product after purchase, once the transaction is mined.
    3. Cheap data storage
        - To access event logs for Reports and further Processing. Example - Get Encrypted Customer Identity.
- Data Storage
    - Log data storage cost         :   8 Gas/byte
    - Contract data storage cost    :   20,000 Gas/byte
    - Logs are NOT accessible from contracts




































