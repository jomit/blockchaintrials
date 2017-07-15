solc --abi ./contracts/sample.sol > ./contracts/sample.abi.json

solc --bin ./contracts/sample.sol > ./contracts/sample.bin

solc --combined-json abi,bin ./contracts/sample.sol > ./contracts/sample.json