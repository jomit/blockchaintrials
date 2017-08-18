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

contract AssetTransfer is LexingtonBase("AssetTransfer") {

    enum AssetState {Created, Active, OfferPlaced, PendingInspection, Inspected, Appraised, 
    NotionalAcceptance, BuyerAccepted, SellectedAccepted, Accepted, Complete, Terminated }

    AssetState public State;

    address public Owner;
    string public Description;
    uint public AskingPrice;

    address public Buyer;
    uint public OfferPrice;
    address public Inspector;
    address public Appraiser;

    function AssetTransfer(string description, uint256 price){
        Owner = msg.sender;
        AskingPrice = price;
        Description = description;

        State = AssetState.Active;
        contractCreated();
    }

    function terminate() {
        if (Owner != msg.sender) {
            revert();
        }

        State = AssetState.Terminated;
        contractUpdated("terminate");
    }

    function modify(string description, uint256 price) {
        if (Owner != msg.sender) {
            revert();
        }
        Description = description;
        AskingPrice = price;

        contractUpdated("modify");
    }

    function makeOffer(address inspector, address appraiser, uint256 offerPrice) {
        if (inspector == 0x0 || appraiser == 0x0 || offerPrice == 0) {
            revert();
        }

        if (Buyer != 0x0 || Owner == msg.sender) {
            revert();
        }

        Buyer = msg.sender;
        Inspector = inspector;
        Appraiser = appraiser;
        OfferPrice = offerPrice;

        State = AssetState.OfferPlaced;
        contractUpdated("makeOffer");
    }

    function modifyOffer(uint256 offerPrice) {
         if (Buyer != msg.sender || offerPrice == 0) {
            revert();
        }

        OfferPrice = offerPrice;
        contractUpdated("modifyOffer");
    }

    function acceptOffer() {
        if (Owner != msg.sender || State != AssetState.OfferPlaced) {
            revert();
        }

        State = AssetState.PendingInspection;
        contractUpdated("acceptOffer");
    }

    function rejectOffer() {
        if (Owner != msg.sender) {
            revert();
        }

        State = AssetState.Active;
        contractUpdated("rejectOffer");
    }

    function rescindOffer() {
        if (Buyer != msg.sender) {
            revert();
        }

        Buyer = 0x0;
        OfferPrice = 0;
        State = AssetState.Active;
        contractUpdated("rescindOffer");
    }

    function markAppraised() {
        if (Appraiser != msg.sender) {
            revert();
        }

        if (State == AssetState.PendingInspection) {
            State = AssetState.Appraised;
        } else if (State == AssetState.Inspected) {
            State = AssetState.NotionalAcceptance;
        }

        contractUpdated("markAppraised");
    }

    function markInspected() {
        if (Inspector != msg.sender) {
            revert();
        }

        if (State == AssetState.PendingInspection) {
            State = AssetState.Inspected;
        } else if (State == AssetState.Appraised) {
            State = AssetState.NotionalAcceptance;
        }

        contractUpdated("markInspected");
    }

    function accept() {
        if (msg.sender != Buyer && msg.sender != Owner) {
            revert();
        }

        if (State != AssetState.NotionalAcceptance && State != AssetState.BuyerAccepted && State != AssetState.SellectedAccepted) {
                revert();
        }

        if (msg.sender == Buyer) {
            if (State == AssetState.NotionalAcceptance) {
                State = AssetState.BuyerAccepted;
            } else if (State == AssetState.SellectedAccepted) {
                State = AssetState.Accepted;
            }
        } else {
            if (State == AssetState.NotionalAcceptance) {
                State = AssetState.SellectedAccepted;
            } else if (State == AssetState.BuyerAccepted) {
                State = AssetState.Accepted;
            }
        }
        contractUpdated("accept");
    }

}

