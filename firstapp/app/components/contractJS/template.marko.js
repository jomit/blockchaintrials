function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXmlAttr = __helpers.xa,
      escapeXml = __helpers.x;

  return function render(data, out) {
    out.w('<script src="' +
      escapeXmlAttr(data.apiURL) +
      '/static/js/ethlightjs.min.js"></script><script src="' +
      escapeXmlAttr(data.apiURL) +
      '/static/js/blockapps.js"></script><script>\n\nvar blockapps = require("blockapps-js");\nvar PrivateKey = blockapps.ethbase.Crypto.PrivateKey;\nvar Promise = require("bluebird");\n\n\nvar contract = blockapps.Solidity.attach( ' +
      escapeXml(JSON.stringify(data.contractMeta)) +
      ' );\nblockapps.setProfile("strato-dev", \'' +
      escapeXml(data.apiURL) +
      '\');\n\nvar Units = blockapps.ethbase.Units;\n\n' +
      escapeXml(data.txFailedHandlerCode) +
      ';\n\nfunction callFunc(funcName) {\n\n    var args = {};\n\n    var funcDivElts = document.getElementById(funcName + "Div").children;\n    var len = funcDivElts.length;\n\n    Object.keys(funcDivElts).map(function (key, i) {\n       console.log(\'key: \' + key + \' value: \' + funcDivElts[key].value + \' name: \' + funcDivElts[key].name);\n       console.log(\'i: \' + i);\n       console.log(\'comparison: \' + (key === funcDivElts[key].name));\n       if ((key === funcDivElts[key].name) && (key !== (funcName+\'ValueField\'))) { args[key] = funcDivElts[key].value; }\n    });\n\n    var contractAddress = contract.account.address.toString();\n    \n    console.log(\'args: \' + JSON.stringify(args));\n    console.log(\'contract name: \' + contract.name);\n    console.log(\'contract address: \' + contractAddress);\n\n    var invokeContractObj =\n    {\n      password: globalPassword,\n      method: funcName,\n      args: args,\n      value: funcDivElts[len-1].value\n    };\n\n    console.log("invokeContractObj: " + JSON.stringify(invokeContractObj));\n    \n    $.ajax({\n        method: "POST",\n        timeout: "60000",\n        headers: {\n            "content-type": "application/json"\n\t    },\n        url: "/users/" + globalUser + "/" + globalAddress + "/contract/" + contract.name + "/" + contractAddress + "/call",\n        data: JSON.stringify(invokeContractObj),\n      })\n      .done(function (res) {\n        afterTX(res);\n    });\n}\n\nfunction storageAfterTX(result) {\n    var afterTXstring = "Last return value, if it was a transaction: \\n  " +\n        ((result === undefined) ? "(nothing)":result);\n\n    return Promise.props(contract.state).then(function(sVars) {\n        afterTXstring += "\\n\\n Contract storage state:\\n\\n";\n        for (name in sVars) {\n            var svar = sVars[name]\n            if (typeof svar === "function") {\n                continue;\n            }\n            afterTXstring += "  " + name + " = " + svar + "\\n";\n        };\n      return afterTXstring;  \n    });\n} \n\nfunction contractBalanceAfterTX(txString) {\n    return contract.account.balance.then(function(bal) {\n        return txString + "\\n Contract balance =  " +\n            Units.convertEth(bal).from("wei").to("ether") + " ether\\n";\n    });\n}\n\n\nfunction userBalanceAfterTX(txString) {\n    return blockapps.ethbase.Account(globalAddress).balance.then(function(userBal) {\n        return txString + "\\n Your balance     =  " +\n            Units.convertEth(userBal).from("wei").to("ether") + " ether\\n";\n    });\n}\n\n\nfunction resetTextArea(txString)  {\n    document.getElementById("afterTXarea").textContent = txString;\n}\n\nfunction afterTX(result) {\n    storageAfterTX(result)\n      .then(function (txStr) { \n          return contractBalanceAfterTX(txStr);\n        })\n      .then(function (txStr) {\n\t  return userBalanceAfterTX(txStr);\n        })\n      .then(function (txStr) { \n          resetTextArea(txStr);\n        })\n      .catch(function (err) {\n          console.log("error caught: " + err); \n      });\n} \n</script>');
  };
}
(module.exports = require("marko").c(__filename)).c(create);