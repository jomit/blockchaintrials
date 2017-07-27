module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    azure: {
      host: "ctdm1ph3o.westus.cloudapp.azure.com",
      port: 8545,
      network_id: "10101010" // Match any network id
      //from  :  defaults first user
      //gas : default 4712388
      //gasPrice : 100000000000 (100 Shannon/Gwei)  
    }
  }
};
