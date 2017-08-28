pragma solidity ^0.4.10;

contract LexingtonBase {

    event LexingtonContractCreated (string contractType, address originatingAddress);

    event LexingtonContractUpdated(string contractType, string action, address originatingAddress);

    string ContractType;

    function LexingtonBase(string contractType) {
        ContractType = contractType;
    }

    function contractCreated() {
        LexingtonContractCreated(ContractType, msg.sender);
    }

    function contractUpdated(string action) {
        LexingtonContractUpdated(ContractType, action, msg.sender);
    }
}

contract BasicProvenance is LexingtonBase("BasicProvenance") {

    enum PackageState { Creating, Created, TransitionRequestPending, InTransit, FinalDelivery, Completed, OutOfCompliance }

    PackageState public State;
    address public InitiatingCounterparty;
    address public Counterparty; 
    address public PreviousCounterparty; 
    address public RequestedCounterparty; 
    address public SupplyChainOwner; 
    address public SupplyChainObserver;

    function BasicProvenance(address supplyChainOwner, address supplyChainObserver) {
        InitiatingCounterparty = msg.sender;
        Counterparty = InitiatingCounterparty;
        SupplyChainOwner = supplyChainOwner;
        SupplyChainObserver = supplyChainObserver;
        State = PackageState.Created;

        contractCreated();
    }

    function RequestTransferResponsibility(address newCounterparty) {
        if (Counterparty != msg.sender || (State != PackageState.Created && State != PackageState.InTransit) || newCounterparty == SupplyChainObserver) { 
                revert(); 
        }
        RequestedCounterparty = newCounterparty; 
        State = PackageState.TransitionRequestPending; 
        
        /*When updating state */ 
        contractUpdated("RequestTransferResponsibility"); 
    }

}