require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	solidity: {
		version: "0.8.4",
		settings: {
			optimizer: {
				enabled: true,
				runs: 100,
			},
		},
	},

	networks: {
		baseSepolia : {
			url: "https://sepolia.base.org",
			accounts: [process.env.PRIVATE_KEY],
			gasPrice: 2000000000,
		},
	},
	etherscan: {
		apiKey: {
			baseSepolia : process.env.scan_key,
		},
	},
	// customChains: [
	// 	{
	// 	  network: "base-sepolia",
	// 	  chainId: 84532,
	// 	  urls: {
	// 	   apiURL: "https://api-sepolia.basescan.org/api",
	// 	   browserURL: "https://sepolia.basescan.org"
	// 	  }
	// 	}
	//   ]
};
