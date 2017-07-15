# Create Sample App using STRATO

Create STRATO instance on Azure

https://azuremarketplace.microsoft.com/en-us/marketplace/apps/blockapps.strato-blockchain-lts-vm?tab=Overview

OR install the developer trial edition

https://github.com/blockapps/strato-getting-started

Install blockapps-bloc

https://www.npmjs.com/package/blockapps-bloc

    $ npm install -g blockapps-bloc
	
    $ bloc init  (set app name "firstapp")
    
    ## Change the config.yaml with the correct API url from the test drive
    
    $ npm install

    ## npm install -g solc
	
    $ bloc genkey  
    
    ## Make sure to enter entropy password and remember it. It creates admin account first, see "admin" folder under app/users and inside it a json file with all the details
    
    ## Use bloc genkey testuser  (this creates an account with name "testuser")

    $ bloc compile SimpleStorage

    $ bloc upload SimpleStorage   (use the entropy password to retrieve private key)

    ## See the updated files in the app/meta/SimpleStorage folder

    $ bloc start

    ## Use Post Man or Fiddler to brower through various API's
    ## GET http://localhost:8000/users
    
# STRATO Pizza Demo

Demo Code : https://github.com/blockapps/pizza-demo

    ## Deploy it in the same VM instances as STRATO

    $ git clone https://github.com/blockapps/pizza-demo.git

    $ cd pizza-demo

    ## Change Port 9001 to 9011 in DockerFile, docker-compose.yml and Gruntfile.js

    $ sudo docker build -t pizza --build-arg STRATO=ubuntudev.westus.cloudapp.azure.com .

    $ sudo docker-compose up

    ## Open http://ubuntudev.westus.cloudapp.azure.com:9011/

# TRUFFLE development

Create Truffle environment on Azure using Marketplace

https://azuremarketplace.microsoft.com/en-us/marketplace/apps/consensys.truffle

OR install it on Windows

https://davidburela.wordpress.com/2017/07/01/new-releases-of-truffle-testrpc-now-easier-to-install/

    $ testrpc   (keep it running in a separate console session)

    $ mkdir truffledemo
    $ cd truffledemo

    $ truffle init

    ## edit the truffle.js file, change the rpc:host property from localhost to IP/DNS of the VM

    $ truffle compile

    $ truffle migrate

    ## see the testrpc console session for transaction and contract activities

    $ truffle build

    $ truffle serve

    ## Browse the Daap on port 8080 (http://truffledev.westus.cloudapp.azure.com:8080/)

    ## Copy any account info from the account list shown by "testrpc" and send some metacoin to it

    ## Now change the truffledmoe/app/javascripts/app.js to show the details of that account.
    ## Update 'window.load' function account = account[0] to account = account[1] or whatever the index of the account.


# Solidity In Visual Studio

https://medium.com/@ConsenSys/solidity-integration-with-visual-studio-8bdab2ff8a74


# Other Helpful Commands

    sudo rm -r -f Lexington

    git log --graph --pretty=oneline --abbrev-commit

    sudo docker stop $(sudo docker ps -a -q)

    sudo docker rm $(sudo docker ps -a -q)

    sudo docker rmi $(sudo docker images -q -f "dangling=true")

    sudo docker rmi $(sudo docker images | grep  'mspoc' | awk {'print $3'})

    sudo chmod +x seedConfig.sh

    docker images | foreach-object { $l = $PSItem.ToString(); $c = $l.Substring(0, $l.IndexOf(" ")); if ($c.ToLower().StartsWith("mspoc")) { docker rmi $c":dev"; } }
	
	# git delete all commit history : https://stackoverflow.com/questions/13716658/how-to-delete-all-commit-history-in-github





