sender = personal.listAccounts[0];   //same as eth.coinbase
receiver = personal.listAccounts[1];

amount = web3.toWei(0.1,"ether");   // convert 0.1 ether to wei

eth.sendTransaction({
    from: sender,
    to: receiver,
    value : amount
});