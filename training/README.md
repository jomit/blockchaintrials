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
- Web3 Watch and Get API's
    - Watch : Listens for incoming events
    - Get   : Gets the log data
- Ways to watch & get
    - Using Filter API      (allows to read events from multiple contract instances)
    - Using contract instance
- Filter API Options
    - Block range   (fromAddress, toAddress)
    - Specific contract instance    ([address])
    - Event Data
        - Data in log fields    (topics:['event-signature','data1','data2'...])
            - Fields marked indexed used in topics
            - Maximum 3 indexed fields allowed & order is important


# Truffle and TestRPC

- See commands.md file for related commands


# Solidity Contract Layout

- https://solidity.readthedocs.io/en/develop/index.html
- Statically typed language, at a high level similar to OO languages
    - Contract = Class
    - Object Instance = Deployed contract on EVM
- Contract Layout
    - pragma solidity ^0.4.6        // works with compiler version 0.4.x but not 0.5.x)
    - contract Name {               // contract name usually in PascalCase
    -    State/Storage variables     // stored in chain as part of contract
    -    Events                      // emitted by contracts, part of the abi definition 
    -    Functions                   // read state (0 gas), state changes (xx gas)
    - } 
- Multiple Contracts
    - Contracts can "Invoke" other contracts
    - Contracts can "Inherit" from other contracts
    - Contracts can "Create" other contracts on chain
- Import contracts
    - import "./sample.sol"
    - We can import contracts from HTTP or Github. The support depends on the compiler implementation.


# Data Types

- See "truffle/contracts/BasicDatatypes.sol"
- Value types - int, uint8, bool
- Type Conversion
    - Implicit
        - compiler allows if no loss of information
    - Explicit 
        - potential loss of information
    - Deduction
        - Compiler can automatically infer type
- Address Type
    - 20 byte ethereum address
    - Value Type
    - Members
        - balance   (returns balance in wei)
        - transfer()
        - send()
- Variable Initialization
    - Un-initialized variable is set to 0
    - null/undefined NOT valid in Solidity


# Memory Management

- See "truffle/contracts/DataLocation.sol"
- Memory divided into 3 parts: 
- Storage
    - Persistance
    - Key-Value store (256 bit key & value)
    - Read/Write are costly
    - Contract can only manage its own storage
    - Default used for State Variables & Local Variables
- Memory
    - Temporary
    - Arrays & Structs
    - Addressable at byte level
    - Default used for Function arguments and Value Types
- Calldata
    - Temporary
    - EVM code execution
    - Non-modifiable
    - Max size 1024, Word 256 bit

# Arrays

- See "truffle/contracts/Arrays.sol"
- Static Arrays
    - Fixed sized
    - bool[10] array;
    - bool element = array[4]; 
- Dynamic Arrays
    - Size can be changed runtime
    - bool[] array;
    - bool element = array[4]; 
    - array.length = 6;   // This can be done for Storage arrays

# Special Arrays

- See "truffle/contracts/SpecialArrays.sol"
- 2 special arrays : bytes & string
- Both of of type "byte"
    - byte1 is equal to byte[1]  // static array
    - byte32 is equal to byte[32]  // static array
    - bytes data; //used for dynamic arrays
- Strings are NOT a basic type or value type
    - It's an arbitrary length UTF-8 encoded string
    - Dynamically sized
    - string = bytes  (with some differences)
    - Compared to bytes:
        - Fixed length not supported
        - Cannot be expanded
        - Index access not allowed, string[7]
        - push() not available
- String literals
    - can be created using " or ', e.g. "abc" or 'abc'
    - hex literals prefixed with hex, e.g. hex"001122"
    - supports escape characters, e.g. \n, \x, \u
- String Functions
    - External "StringUtil libraries
    - Complex string operations can be costly

# Functions

- See "truffle/contracts/Funcs.sol"
- Output parameters
    - Uses keyword returns(...)
    - Multiple return parameters
    - We can name the return parameters
        - Named local variables available within function body
        - Initialized to zero's
        - Values assigned to named variable are automatically returned
- Input parameters
    - declare arguments with type and name        
    - can omit name argument name if unused
- Local Variables
    - Scope of variable is the function body
    - Re-declaration of the variable in the function not allowed 
- Variables Initialization
    - Bytes initiazlied to 0
    - Bool to false
    - Variables are always initialized to defaults in the beginning of the function, regardless of where they are declared in the function body.
- Tuple types
    - A list of objects : var (name, age) = getOwnerInfo();
    - Different types in tuple are fine
    - We can skip a variable in tuple
- Function Overloading
    - Function with same name but different input parameters is supported
    - Contructor overloading NOT supported

# Conversions, Globals and Throw

- See "truffle/contracts/Globals.sol"
- Ether Units
    - http://eth-converter.com/extended-converter.html
    - Coversion by suffixing literal with the Ether sub-denomination
        - wei (default), ether, finney, szabo
- Time
    - now  (returns block time in seconds from 1970)
    - Conversion by suffixing literal with time units
        - seconds (default), minutes, hours, days, weeks, years
- block object:
    - block.number
    - block.coinbase
    - block.timestamp
    - block.difficulty
    - block.gaslimit
    - block.blockhash  (returns hashs of most recent 256 blocks, excludes current)
- msg object:
    - msg.data      (call data in bytes)
    - msg.sender    (caller's address)
    - msg.sig       (function identifier, first 4 bytes of call data)
    - msg.value     (number of 'wei' sent in the message, only available in functions that are 'payable')
- tx object:
    - tx.gasprice   (gas price for transaction)
    - tx.origin     (address that originated transaction. DO NOT USE for compatibility reasons)
        - https://ethereum.stackexchange.com/questions/196/how-do-i-make-my-dapp-serenity-proof?noredirect=1&lq=1
        - Is different than msg.sender 
- throw statement:  (DEPRECATED, use 'revert' intead)
    - All state changes are reverted
    - No ethers are sent out
    - Ether received in transaction are returned
    - Gas is spent, so there is still a cost
    - Transaction is recorded in the chain; nonce is valid & recorded
- revert   (USE THIS INSTEAD OF throw)
    - Behaves like throw;
    - throw uses all the gas, revert refunds the unused gas
- assert(condition)
    - Throws if condition is NOT met
- require(condition)
    - Like assert it throw if condition is NOT met
    - assert() & require() are style exceptions
- Crytographic Hash Function characteristics
    - Deterministic :   message hash always same for same message
    - Quick         :   not compute intensive
    - Infeasible    :   cannot recreate original message from hash
    - Any change    :   any small change in message generates completely different hash
    - Collision resistant : different message will never get same hash
- Crypto functions
    - Takes multiple bytes parameters and produces 'bytes32'
        - keccak256()
        - sha3()        // alias to keccak256()
        - sha256()
    - Takes multiple bytes parameters and produces 'bytes20'
        - ripemd160()

# Complex Data Types

- See "truffle/contracts/MappingEnumStruct.sol"
- Mapping type
    - Hashtable like structure
    - Only available as 'storage' or 'state' variable, cannot be created as local variable in functions
        - mapping(address => uint) balances;
        - balances object of mapping type with address (key) and uint (value)
    - Key can be any type (except mapping type)
    - Value can be any type
    - Non-existent keys will return either 0 or 0x0 based on the value type, it will NOT return null/defined.
    - Key data is converted to hash (using keccak256) and stored, original data is NOT stored as-is
    - It is NOT iterable
    - No attribute for 'length'
- Enums
    - Used to create custom type with finite set of values
        - enum Season  { Summer, Winter, Fall, Spring  }
    - Not part of ABI definition, so need to use 'index' to assign values
        - index value for 'Summer' will be 0 and 'Winter' will be 1
    - Need to do explicit conversion to/from all integer types
        - unit8 x = unit8(Season.Winter)
- Struct
    - Cannot have member of its own type
    - Can be contained in arrays and mappings
    - Not part of ABI definition, so external functions cannot send/receive 'struct' types
    - Internal functions can use structs to send/receive
    - References
        - To update data we can use local reference of the structure instance inside a function
        - function setItem(bytes24 name){
        -   MyStruct localreference = item;
        -   localreference.name = name;  // this updates item in the storage
        - }
    - Memory variable
        - Default for struct type local variable is 'Storage', so cannot be defined inside functions

# Object Orientation

- See "truffle/contracts/ObjectOrientation.sol", "truffle/contracts/AbstractContract.sol"
- Solidity support's 
    - Function Overloading  (no contructor overloading)
    - Inheritance  (abstract contracts and multiple inheritance)
    - Polymorphism
- Abstract Contract
    - Cannot be deployed to EVM, can only be inherited
    - NO special keyword for abstract contracts, need to declare a function without body to make contract abstract.
    - If a derived class does not implement all inherited functions, also becomes an abstract contract
- Multiple Inheritance
    - One deployable contract gets created
    - Inheritance copies all base contract implementations in the derived contract
    - If base contract has functions with similar name as derived contract that it will cause error
    - Inheritance created using the keyword 'is'
        - e.g.  contract Test is BaseAbstractContract, NewBaseAbstractContract{  }
    - All abstract methods should be implementd in the Test contract to be deployable

# Function & Variable visibility

- See "truffle/contracts/FuncTypes.sol", "truffle/contracts/FuncTypesCaller.sol"
- Visibility
    - public   (available to all, default for functions)
    - private   (available only within contract)
    - internal  (available within contract & derived contracts, default for storage variables)
    - external   (available to external contracts, not applicable to storage variables, need to use 'this' to invoke frmo within the contract)


# Constants and Payable

- See "truffle/contracts/ConstantsPayable.sol"
- Constant Variable
    - Must be initialized at compile time
    - NO storage allocated
    - Can call builtin functions e.g. keccak256()
    - Initialization in constructor NOT allowed
    - Allowed only for value types & string
    - Can be used with functions but state chagnes to contract NOT allowed from within the function, it won't throw compilation error but it won't work
- Fallback Function
    - An unnamed function in the contract
    - Invoked without data
    - Restrictions
        - No arguments
        - Cannot return anything
        - Maximum gas spend = 2300 gas
- Receiving Ethers
    - A contract like EOA (Externally Owned Accounts) can receive Ethers
    - A function invocation can receive Ethers
    - Contract
        - Can receive ether by using 'payable' fallback function
        - Invoked when ether are received (msg.value) without data
        - Best Practice to just log event in fallback function
        - Trying to update storage or call a function may exceed gas and throw error and send back the ether
    - Function
        - Must be marked as 'payable' to receive ethers
        - Amount sent available in 'msg.value' attribute
        - Unlike fallback function, No gas restriction apply here
        - Ether are held at Contract level, not at the function level

# Modifiers

- See "truffle/contracts/Modifiers.sol"
- Changes the behavior of a function
    - e.g. modifier owenerOnly { }
- throw in the modifier will halt the execution
- Modifiers can take arguments
- Local variables within the modifier cannot be accessed from the function
- A function can have multiple modifiers. Order of the modifiers DOES matter


# Events

- See "truffle/contracts/Events.sol"


# Self Destruction Pattern

- See "patterns/contracts/SelfDestruct.sol",  "patterns/exec/SelfDestruct.js"
- Use : truffle exec ./exec/SelfDestruct.js
- Contract Lifecycle
    - 0 => Develop Contract
    - 1 => Deployed
    - 2 => Invoked
    - 3 => Self-Destruct   (No more new transactions possible for contract, existing transaction stay foreever)
- Why self destruct ?
    - Due to requirements driven by business
        - e.g. Timed bidding contract which does not allow bidding after a win
    - Due to nature of business
        - e.g. Loan contract destroyed after loan is paid off
- Syntax
    - selfdestruct(owner)    // this will self destruct the contract and send the funds held in the contract to 'owner', which is the address of an account.
- Funds sent to a self destructred contract will be LOST
- To prevent fund loss:
    - Remove all references to dead contracts
    - Call 'get' before send to ensure that contract is NOT dead

# Contract Factory Pattern

- See "patterns/contracts/ContractFactory.sol",  "patterns/exec/ContractFactory.js"
- Use : truffle exec ./exec/ContractFactory.js
- Use : truffle test ./test/contract_factory.js
- Helps manage multiple instances of Contracts from within the contract instead of a DApp
- May cost more gas as the Storage will be done on EVM instead of external storage via DApp
- Benefits
    - Hides the complexity & encapsulates business logic
    - May manage the contract in a collection
    - Insulates the DApp from contract changes & additions


# Name Registry Pattern

- See "patterns/contracts/NameRegistry.sol",  "patterns/exec/NameRegistry.js"
- Use : truffle exec ./exec/NameRegistry.js
- Helps to create contract instances using names instead of addresses
- Helps manage dependencies in DApp, as the DApp does not need to change the address everytime a new contract version is deployed


# Mapping Iterator Pattern

- See "patterns/contracts/UserAddressRegistry.sol"
- Use : truffle test ./test/user_address_registry.js
- Helps in interating over mapping types
- Cost of iteration will grow as the number of keys grows, as the keys will be store in an array in the contract Storage


# Withdrawal Pattern

- See "patterns/contracts/WithdrawalContract.sol"
- Use : truffle test ./test/withdrawal_contract.js
- Helps with resolving issues while sending ethers to a receiver or contract
- Issues with Send pattern
    - Payable fallback function can run out of gas
    - Payable function can run out of gas
    - Payable function can throw exception
- send() vs. transfer()
    - send() => returns false on failure but DOES NOT halt the contract execution
    - transfer() => throws execution on failure and halts the execution.
    - Best Practice : check return from send() or better to use transfer()
- In withdrawal pattern:
    - Sender contract exposes a withdraw function that the receivers invoke to get ethers


# Setup Private Ethereum Chain 

- **Demo Setup**

    - Node1
        `port : 30303`
    - Node2
        `port : 30304`
    - Create 2 folders for `node1` and `node2`
        `mkdir node1` , `mkdir node2`



- **Create an account on node1**  (make sure to copy the account address)

    `cd node1`

    `geth --datadir "./data" account new`
        
- **Setup genesis block**

    Genesis file is a configuration file for your chain and creates the first block of your private chain

    All nodes within the chain have same 0th or first block

    Copy `private-ethereum\genesis.template.json`  to `node1\genesis.json`
    
    Update `<ACCOUNT ADDRESS FOT INITIAL ALLOCATION>` and `chainId`

- **Initialize the chain on 2 nodes**

    `cd node1`
    
    `geth --datadir "./data" init genesis.json`

    copy `node1\genesis.json` to `node2\genesis.json`

    `cd node2`
    
    `geth --datadir "./data" init genesis.json`

- **Launch node1 and get enode information**

    `cd node1`
    
    `geth --networkid 1010 --datadir "./data" --nodiscover --port 30303 --ipcdisable console`

    Get enode info using `admin.nodeInfo.enode` and copy it in notepad
    
    Replace [::] with `127.0.0.1` as both nodes are on local machine

- **Add node1 as peer of node2 (Does NOT persist if node2 restarts)**

    `cd node2`

    `geth --networkid 1010 --datadir "./data" --nodiscover --port  30304 --ipcdisable console`

    `admin.peers`

    `admin.addPeer(<PASTE ENODE TEXT FROM NOTEPAD HERE INCLUDING QUOTES>)`

    `admin.peers`

- **Add node1 as peer of node2 (DOES persist if node2 restarts)**

    Stop node2 `exit`
    
    Copy `private-ethereum\static-nodes.template.json` to `node2\data\static-nodes.json`

    Replace the enode details in the static-nodes.json file

    `geth --networkid 1010 --datadir "./data" --nodiscover --port  30304 --ipcdisable console`