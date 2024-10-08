const hre = require("hardhat");
const contracts = require("../../frontend/src/constants/contracts.json");

async function verifyContracts(contractInfo) {
	for (const info of contractInfo) {
		await hre.run("verify:verify", {
			address: info.address,
			constructorArguments: info.args || [],
		});
	}
}

const contractsToVerify = [
	{
		address: contracts.PremimumCalculator[1],
		args: [],
	},

	{
		address: contracts.USDCToken[1],
		args: ["9999999999999999000000"],
	},
	{
		address: contracts.ClaimDogSuraksha[1],
		args: [],
	},
	{
		address: contracts.DogSurksha[1],
		args: [],
	},
];

verifyContracts(contractsToVerify);
