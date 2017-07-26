using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Nethereum.Web3;
using Nethereum.Hex.HexTypes;
using System.Threading;
using Microsoft.AspNetCore.Http;
using Nethereum.RPC.Eth.DTOs;
using corewebapp.Models;

namespace corewebapp.Controllers
{
    public class HomeController : Controller
    {
        string contractAbi = @"[{""constant"":false,""inputs"":[],""name"":""manufacturingDone"",""outputs"":[],""payable"":false,""type"":""function""},{""constant"":false,""inputs"":[],""name"":""getOrderStatus"",""outputs"":[{""name"":"""",""type"":""uint256""}],""payable"":false,""type"":""function""},{""inputs"":[{""name"":""p_manufacturer"",""type"":""address""},{""name"":""p_sku"",""type"":""string""},{""name"":""p_quantity"",""type"":""uint256""}],""payable"":false,""type"":""constructor""}]";
        string contractBytecode = "0x6060604052341561000c57fe5b6040516102423803806102428339810160409081528151602083015191830151909291909101905b60018054600160a060020a03338116600160a060020a0319928316179092556000805492861692909116919091179055815161007790600290602085019061009b565b506003819055600480546000919060ff19166001835b02179055505b50505061013b565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106100dc57805160ff1916838001178555610109565b82800160010185558215610109579182015b828111156101095782518255916020019190600101906100ee565b5b5061011692915061011a565b5090565b61013891905b808211156101165760008155600101610120565b5090565b90565b60f9806101496000396000f300606060405263ffffffff60e060020a600035041663524577e18114602a578063d81d26ae146039575bfe5b3415603157fe5b60376058565b005b3415604057fe5b604660b4565b60408051918252519081900360200190f35b6000543373ffffffffffffffffffffffffffffffffffffffff90811691161460805760006000fd5b60005b60045460ff166001811115609357fe5b14609d5760006000fd5b600480546001919060ff191682805b02179055505b565b60045460009060ff16600181111560c757fe5b90505b905600a165627a7a7230582002f85b1e0dbd756f61e255cf6de971fcb731718aa3bd2ccdd7bb5242bcd7f41f0029";

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Error()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrder()
        {
            var clientAddress = "0x12890d2cce102216644c59daE5baed380d84830c";
            var web3 = new Web3();
            var unlockAccountResult = await web3.Personal.UnlockAccount.SendRequestAsync(clientAddress, "password", 60);

            var orderDetails = GenerateMockOrderDetails("VR");

            var transactionHash = await web3.Eth.DeployContract.SendRequestAsync(contractAbi, contractBytecode, clientAddress, new HexBigInteger(4700000), orderDetails.ManufacturerId, orderDetails.Sku, orderDetails.Quantity);
            var receipt = await MineAndGetReceiptAsync(web3, transactionHash);
            var contractAddress = receipt.ContractAddress;

            SaveOrderOffChain(contractAddress, orderDetails);
            var result = await GetOrderStatus(web3, contractAddress, clientAddress);

            ViewBag.Result = orderDetails.Id + "  =>  " + result;
            return View("Index");
        }

        [HttpPost]
        public async Task<IActionResult> ManufacturingComplete()
        {
            var currentOrderId = HttpContext.Session.GetString("OrderId");
            var contractAddress = HttpContext.Session.GetString("ContractAddress");

            var manufacturerAddress = "0x13f022d72158410433cbd66f5dd8bf6d2d129924";
            var web3 = new Web3();
            var unlockAccountResult = await web3.Personal.UnlockAccount.SendRequestAsync(manufacturerAddress, "password", 60);

            var contract = web3.Eth.GetContract(contractAbi, contractAddress);
            var manufacturingDoneFunction = contract.GetFunction("manufacturingDone");

            var transactionHash = await manufacturingDoneFunction.SendTransactionAsync(manufacturerAddress, new HexBigInteger(900000), null);
            var receipt = await MineAndGetReceiptAsync(web3, transactionHash);

            await manufacturingDoneFunction.CallAsync<string>();

            var result = await GetOrderStatus(web3, contractAddress, manufacturerAddress);

            ViewBag.Result = currentOrderId + "  =>  " + result;
            return View("Index");
        }

        private async Task<int> GetOrderStatus(Web3 web3, string contractAddress, string clientAddress)
        {
            var contract = web3.Eth.GetContract(contractAbi, contractAddress);
            var getStatusFunction = contract.GetFunction("getOrderStatus");

            var transactionHash = await getStatusFunction.SendTransactionAsync(clientAddress, new HexBigInteger(900000), null);
            var receipt = await MineAndGetReceiptAsync(web3, transactionHash);

            return await getStatusFunction.CallAsync<int>();
        }

        private async Task<TransactionReceipt> MineAndGetReceiptAsync(Web3 web3, string transactionHash)
        {
            var miningResult = await web3.Miner.Start.SendRequestAsync(6);
            var receipt = await web3.Eth.Transactions.GetTransactionReceipt.SendRequestAsync(transactionHash);
            while (receipt == null)
            {
                Thread.Sleep(1000);
                receipt = await web3.Eth.Transactions.GetTransactionReceipt.SendRequestAsync(transactionHash);
            }
            miningResult = await web3.Miner.Stop.SendRequestAsync();
            return receipt;
        }

        private void SaveOrderOffChain(string contractAddress, Order orderDetails)
        {
            HttpContext.Session.SetString("OrderId", orderDetails.Id);
            HttpContext.Session.SetString("ContractAddress", contractAddress);
        }

        private Order GenerateMockOrderDetails(string sku)
        {
            return new Order
            {
                Id = "ORD-1",
                LabelProducerId = "0x3fd313e14389e06d2f118e6fac9a4830cbac9720",
                ManufacturerId = "0x13f022d72158410433cbd66f5dd8bf6d2d129924",
                PackagerId = "0xffea6417bf13d240ef0cf9b7a731ed6ea48a539e",
                Quantity = 10,
                Sku = sku
            };
        }

    }
}
