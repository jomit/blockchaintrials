solc --abi SampleSupplyChain.sol > SampleSupplyChain.abi

solc --bin SampleSupplyChain.sol > SampleSupplyChain.bin

solc --combined-json abi,bin SampleSupplyChain.sol  >  SampleSupplyChain.json