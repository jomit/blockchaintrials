pragma solidity ^0.4.10;

contract SampleSupplyChain {
    address manufacturer;
    address client;
    string sku;
    uint quantity;
    OrderStatus orderStatus;
    
    enum OrderStatus{OrderPlaced, ManufacturerDone}

    function SampleSupplyChain(address p_manufacturer, string p_sku, uint p_quantity){
        client =  msg.sender;
        manufacturer = p_manufacturer;
        sku = p_sku;
        quantity = p_quantity;
        orderStatus = OrderStatus.OrderPlaced;
    }

   function manufacturingDone(){

       if(msg.sender != manufacturer){
           throw;
       }

       if (orderStatus != OrderStatus.OrderPlaced){
           throw;
       }
       orderStatus = OrderStatus.ManufacturerDone;
   }

   function getOrderStatus() returns (uint){
       return uint(orderStatus);
    }
}