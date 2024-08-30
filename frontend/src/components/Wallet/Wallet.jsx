import { useState, useEffect } from "react";
import { useConnectWallet } from "./useConnectWallet";
import { utils } from "ethers";


export function Wallet() {
	const { account, requestAccount, connectStatus } = useConnectWallet();

	const [isLoading, setIsLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");

	useEffect(() => {
		if (connectStatus === "disconnected") {
			setErrorMsg("");
		}
	}, [connectStatus]);

	const connectWallet = async () => {
		try {
		  if (window.ethereum) {
			try {
			  const chain = await window.ethereum.request({ method: "eth_chainId" });
			  if (chain === utils.hexValue(84532) ) {
				const addressArray = await window.ethereum.request({
				  method: "eth_requestAccounts",
				});
	  
				console.log("addressArray", addressArray);
				if (addressArray.length > 0) {
				  return {
					address: await addressArray[0],
					// status: "👆🏽 Ethereum Wallet is connected.",
				  };
				} else {
				  return 0;
				}
			  } else {
				
				await window.ethereum.request({
				  method: "wallet_switchEthereumChain",
				  params: [{ chainId: utils.hexValue(84532)  }],
				});
				const addressArray = await window.ethereum.request({
				  method: "eth_requestAccounts",
				});
				if (addressArray.length > 0) {
				  return {
					address: await addressArray[0],
				  };
				}
			  }
			} catch (e) {
			  // No exist base chain in your wallet
			  const networkMap = {
				Base_Testnet: {
				  chainId: utils.hexValue(84532), // '0x89'
				  chainName: "baseSepolia",
				  nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
				  rpcUrls: ["https://sepolia.base.org"],
				  blockExplorerUrls: ["https://sepolia.basescan.org"],
				},
			  };
	  
			  await window.ethereum.request({
				method: "wallet_addEthereumChain",
				params: [networkMap.Base_Testnet],
			  });
	  
			  const addressArray = await window.ethereum.request({
				method: "eth_requestAccounts",
			  });
			  if (addressArray.length > 0) {
				return {
				  address: await addressArray[0],
				};
			  }
			}
		  } else {
			
		  }
		} catch (error) {
		  console.log("error", error);
		}
	  };

	const handleConnectWallet = async () => {
		setIsLoading(true);
		setErrorMsg("");
		//await connectWallet()
		const result = await requestAccount();
		
		

		setIsLoading(false);

		if (!result.success) {
			setErrorMsg(result.msg);
		}
	};

	return (
		<div className="flex justify-between items-center text-white">
			{connectStatus === "disconnected" && (
				<div className="flex gap-4 bg-lightblue font-bold p-2 rounded-lg justify-center items-center">
					<span className="text-lg">Connect Wallet</span>
					{isLoading && <span className=" text-red-500">Loading...</span>}
					{errorMsg && <span className="text-red-500">{errorMsg}</span>}
					{!isLoading && !errorMsg && (
						<button
							className="bg-blue-600 font-semibold hover:bg-blue-700 text-white rounded-md font-medium uppercase p-2"
							onClick={handleConnectWallet}
						>
							Connect
						</button>
					)}
				</div>
			)}

			{connectStatus === "connecting" && (
				<div className="text-center">Connecting...</div>
			)}

			{connectStatus === "connected" && (
				<div className="flex items-center justify-between gap-4 text-green-600 font-medium text-uppercase border-2 border-green-600 rounded-md p-2">
					<div>
						{account ? `${account.slice(0, 5)}...${account.slice(-4)}` : ""}
					</div>
					<div>Connected</div>
				</div>
			)}
		</div>
	);
}
