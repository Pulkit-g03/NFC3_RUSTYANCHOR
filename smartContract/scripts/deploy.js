const hre = require("hardhat");
const fs = require("fs");

let premimumCalculator, DogSurksha, claimDogSuraksha;

async function main() {
	// premium calculator
	const PremimumCalculator = await hre.ethers.getContractFactory(
		"PremimumCalculator"
	);
	premimumCalculator = await PremimumCalculator.deploy();
	await premimumCalculator.deployed();

	// inititalze premimiumCalculator
	await premimumCalculator.initialize("100000000", "5", "190");

	// usdcToken
	const USDCToken = await hre.ethers.getContractFactory("USDCToken");
	const uSDCToken = await USDCToken.deploy("9999999999999999000000");
	await uSDCToken.deployed();

	// DogSurksha
	let DogSurksha = await hre.ethers.getContractFactory("DogSurksha");
	DogSurksha = await DogSurksha.deploy();
	await DogSurksha.deployed();

	//claimDogSuraksha
	const ClaimDogSuraksha = await hre.ethers.getContractFactory(
		"ClaimDogSuraksha"
	);
	claimDogSuraksha = await ClaimDogSuraksha.deploy();
	await claimDogSuraksha.deployed();

	// initialize DogSurksha
	await DogSurksha.updateContractsAddress(
		uSDCToken.address,
		premimumCalculator.address,
		claimDogSuraksha.address
	);

	await claimDogSuraksha.updateDogSurakshaAddr(DogSurksha.address);

	console.log(
		"PremimumCalculator is deployed at : ",
		premimumCalculator.address
	);

	console.log("USDCToken is deployed at : ", uSDCToken.address);

	console.log(
		"claimDogSuraksha is deployed at : ",
		claimDogSuraksha.address
	);

	console.log("DogSurksha is deployed at : ", DogSurksha.address);

	// get abi of PremimumCalculator, usdcToken, Dogsurksha, DogsurkshaVerifier
	const premimiumCalculatorAbi = PremimumCalculator.interface.format("json");
	const usdcTokenAbi = USDCToken.interface.format("json");
	const DogSurkshaAbi = DogSurksha.interface.format("json");
	const claimDogSurakshaAbi = ClaimDogSuraksha.interface.format("json");

	// Write contract addresses to file
	const contracts = {
		PremimumCalculator: [premimiumCalculatorAbi, premimumCalculator.address],
		DogSurksha: [DogSurkshaAbi, DogSurksha.address],
		ClaimDogSuraksha: [claimDogSurakshaAbi, claimDogSuraksha.address],
		USDCToken: [usdcTokenAbi, uSDCToken.address],
	};

	fs.writeFileSync(
		"../frontend/src/constants/contracts.json",
		JSON.stringify(contracts, null, 2)
	);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});

// PremimumCalculator is deployed at :  0xDF41af4FFB9A8d5A3e57Eaa0B9d00bfCa6e41cb4
// USDCToken is deployed at :  0xFE63F9327C53529a5aCB08B0411920C7bE0F6f0D
// claimDogSuraksha is deployed at :  0x00d663b771897D1a5d14ED0a01ec0CEa18f0a0C5
// DogSurksha is deployed at :  0xB3a88833f417ceCc4965Ac787015655f412deF56