// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./interfaces/IDogSurksha.sol";

contract ClaimDogSuraksha {
    IDogSurksha public DogSuraksha;
    mapping(bytes32 => ClaimPolicyData) private claimPolicies;
    bytes32[] private policyIds;

    //events
    event ClaimRequested(bytes32 indexed policyId);

    address admin;

    constructor() {
        admin = msg.sender;
    }

    // modifier
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier onlyDogSuraksha() {
        require(
            msg.sender == address(DogSuraksha),
            "Only Dogsurakhsha contract can call."
        );
        _;
    }

    function updateDogSurakshaAddr(
        address _DogSurakshaAddr
    ) external onlyAdmin {
        DogSuraksha = IDogSurksha(_DogSurakshaAddr);
    }

    struct ClaimDetails {
        string dateAndTime;
        string location;
        string description;
        bool isAccident;
        string[] otherPartiesInvolved;
    }

    struct VeterinaryInfo {
        string veterinarianName;
        string contactDetails;
        string clinicOrHospitalName;
        string[] visitDates;
        string diagnosis;
        string treatmentProvided;
    }

    struct ClaimAmount {
        uint256 totalAmount;
        string breakdownOfExpenses;
    }

    struct ClaimPolicyData {
        ClaimDetails claimDetails;
        VeterinaryInfo veterinaryInfo;
        ClaimAmount claimAmount;
        string supportinDocIpfsHash;
        bool isAdminApproved;
    }

    function requestClaimPolicy(
        bytes32 policyId,
        ClaimDetails memory _claimDetails,
        VeterinaryInfo memory _veterinaryInfo,
        string memory _supportinDocIpfsHash,
        ClaimAmount memory _claimAmount
    ) external {
        (address owner, bool claimed) = DogSuraksha
            .getPolicyOwnerAndIsClaimed(policyId);
        require(!claimed, "Policy has already been claimed");

        require(
            owner == msg.sender,
            "Policy does not exist or you are not the owner"
        );

        ClaimPolicyData memory newClaimPolicyData = ClaimPolicyData(
            _claimDetails,
            _veterinaryInfo,
            _claimAmount,
            _supportinDocIpfsHash,
            false
        );

        DogSuraksha.updateClaimRequestedStatus(policyId, true);
        claimPolicies[policyId] = newClaimPolicyData;
        policyIds.push(policyId);

        emit ClaimRequested(policyId);
    }

    function removeClaim(bytes32 policyId) external {
        address policyOwner = DogSuraksha.getPolicyHolderAddress(policyId);
        require(
            policyOwner == msg.sender,
            "Policy does not exist or you are not the owner"
        );

        DogSuraksha.updateClaimRequestedStatus(policyId, false);

        delete claimPolicies[policyId];

        for (uint256 i = 0; i < policyIds.length; i++) {
            if (policyIds[i] == policyId) {
                policyIds[i] = policyIds[policyIds.length - 1];
                policyIds.pop();
                break;
            }
        }
    }

    function updateClaimStatus(
        bytes32 policyId,
        bool _status
    ) external onlyDogSuraksha {
        ClaimPolicyData storage policyData = claimPolicies[policyId];
        require(!policyData.isAdminApproved, "Already approved by admin");
        policyData.isAdminApproved = _status;
    }

    // getters
    function getRequestedPolicyIdData(
        bytes32 policyId
    )
        external
        view
        returns (
            ClaimDetails memory,
            VeterinaryInfo memory,
            ClaimAmount memory,
            string memory,
            bool
        )
    {
        ClaimPolicyData storage claimPolicyData = claimPolicies[policyId];
        return (
            claimPolicyData.claimDetails,
            claimPolicyData.veterinaryInfo,
            claimPolicyData.claimAmount,
            claimPolicyData.supportinDocIpfsHash,
            claimPolicyData.isAdminApproved
        );
    }

    function getActivePoliciesForClaim()
        external
        view
        returns (bytes32[] memory)
    {
        return policyIds;
    }
}
