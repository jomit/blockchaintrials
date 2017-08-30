pragma solidity ^0.4.10;

contract LexingtonBase {

    event LexingtonContractCreated (string contractType, address originatingAddress);

    event LexingtonContractUpdated(string contractType, string action, address originatingAddress);

    string ContractType;

    function LexingtonBase(string contractType) {
        ContractType = contractType;
    }

    function ContractCreated() {
        LexingtonContractCreated(ContractType, msg.sender);
    }

    function ContractUpdated(string action) {
        LexingtonContractUpdated(ContractType, action, msg.sender);
    }
}

contract LoanSecuritization is LexingtonBase("LoanSecuritization") {

    enum LoanState { PoolCreated, InternalValidationDone, SIVCreated, AgencyValidationDone, PartiallyCommitted, FullyCommitted, CashSettled, InventoryReconciliationDone, Complete  }
    LoanState public State;

    // LOAN POOL PROPERTIES
    address BankLoanTreasury;
    string public ProductConfiguration;
    int public ItemId;
    int public Price;
    int public Stipulations;
    int public Yield;
    int public Duration;

    // LOAN PROPERTIES  [assuming 1 single loan in the pool for simplicity]
    int public LoanAccountId;
    int public LoanPropertyZipCode;
    int public LoanFicoScore;
    uint public LoanApprovalTimeStamp;
    int public LoanToValue;
    int public LoanDebtToFinanceRatio;
    int public LoanBorrowersIncome;

    // BANK VALIDATION PROPERTIES
    address BankOversight;
    bool public RiskModelUsed;
    string public RiskModelName;
    bool public RiskModelApproved;
    bool public ReleaseAllowed;

    // RISK AGENCY PROPERTIES
    address RatingsAgency;
    enum AgencyRating { Low, Medium, High}
    AgencyRating public AgencyRiskRating;

    // SPECIALIZED INVESTMENT VEHICLE PROPERTIES
    address ExternalTrustee;
    bool public LoansAddedToTrust;
    bool public LoansCollateralized;

    // BUYER PROPERTIES
    address Buyer;
    int public IncrementPercentage;
    int public IncrementOfferPrice;

    function LoanSecuritization(string productConfiguration, int itemId, int price, int stipulations, int duration, int yield,
        int loanAccountId, int loanPropertyZipCode, int loanFicoScore, uint loanApprovalTimeStamp, int loanToValue, int loanDebtToFinanceRatio, int loanBorrowersIncome) {
    
        BankLoanTreasury = msg.sender;
        ProductConfiguration = productConfiguration;
        ItemId = itemId;
        Price = price;
        Stipulations = stipulations;
        Yield = yield;
        Duration = duration;

        LoanAccountId = loanAccountId;
        LoanPropertyZipCode = loanPropertyZipCode;
        LoanFicoScore = loanFicoScore;
        LoanApprovalTimeStamp = loanApprovalTimeStamp;
        LoanToValue = loanToValue;
        LoanDebtToFinanceRatio = loanDebtToFinanceRatio;
        LoanBorrowersIncome = loanBorrowersIncome;

        State = LoanState.PoolCreated;
        ContractCreated();
    }

    function internalValidation(bool riskModelUsed, string riskModelName, bool releaseAllowed, bool riskModelApproved) {
        if (State != LoanState.PoolCreated || msg.sender == BankLoanTreasury || msg.sender == RatingsAgency || msg.sender == Buyer || msg.sender == ExternalTrustee) {
            revert();
        }

        BankOversight = msg.sender;
        RiskModelUsed = riskModelUsed;
        RiskModelName = riskModelName;
        RiskModelApproved = riskModelApproved;
        ReleaseAllowed = releaseAllowed;

        State = LoanState.InternalValidationDone;
        ContractUpdated("internalValidation");
    }

    function createSpecializedInvestmentVehicle(bool loansAddedToTrust, bool loansCollateralized) {
        if (State != LoanState.InternalValidationDone || msg.sender == BankLoanTreasury || msg.sender == BankOversight || msg.sender == RatingsAgency || msg.sender == Buyer) {
            revert();
        }

        ExternalTrustee = msg.sender;
        LoansAddedToTrust = loansAddedToTrust;
        LoansCollateralized = loansCollateralized;
        State = LoanState.SIVCreated;
        ContractUpdated("createSpecializedInvestmentVehicle");
    }

    function agencyValidation(uint8 rating) {
        if (State != LoanState.SIVCreated || msg.sender == BankLoanTreasury || msg.sender == BankOversight || msg.sender == Buyer || msg.sender == ExternalTrustee) {
            revert();
        }

        RatingsAgency = msg.sender;
        AgencyRiskRating = AgencyRating(rating);
        State = LoanState.AgencyValidationDone;
        ContractUpdated("agencyValidation");
    }

    // assuming only 1 buyer. 
    function purchaseLoanIncrement(int incrementPercentage, int incrementOfferPrice) {
        if (State != LoanState.AgencyValidationDone || msg.sender == BankLoanTreasury || msg.sender == BankOversight || msg.sender == RatingsAgency || msg.sender == ExternalTrustee || incrementPercentage > 100 || incrementPercentage <= 0) {
            revert();
        }

        Buyer = msg.sender;
        IncrementPercentage = IncrementPercentage;
        IncrementOfferPrice = incrementOfferPrice;

        if (IncrementPercentage == 100 ) {
            State = LoanState.FullyCommitted;
        } else {
            State = LoanState.PartiallyCommitted;
        }
        ContractUpdated("purchaseLoanIncrement");
    }

    function confirmCashOnWire() {
        
        if (State != LoanState.FullyCommitted || msg.sender != BankLoanTreasury) {
            revert();
        }
        State = LoanState.CashSettled;
        ContractUpdated("confirmCashOnWire");
    }

    function confirmInventoryReconciliationDone() {
        
        if (State != LoanState.CashSettled || msg.sender != BankLoanTreasury) {
            revert();
        }
        State = LoanState.InventoryReconciliationDone;
        ContractUpdated("confirmInventoryReconciliationDone");
    } 

    function removeLoanFromBalanceSheet() {
        
        if (State != LoanState.InventoryReconciliationDone || msg.sender != BankLoanTreasury) {
            revert();
        }
        State = LoanState.Complete;
        ContractUpdated("removeLoanFromBalanceSheet");
    }  
}
