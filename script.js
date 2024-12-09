// script.js

// Connect to Ethereum blockchain and interact with smart contract
document.addEventListener("DOMContentLoaded", async () => {
    // Ensure Web3 is available
    if (typeof window.ethereum !== "undefined") {
        console.log("Ethereum wallet detected!");
        const web3 = new Web3(window.ethereum);

        // Request account access
        await window.ethereum.request({ method: "eth_requestAccounts" });

        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        console.log("Connected account:", account);

        // Contract details
        const contractAddress = "0x7b96aF9Bd211cBf6BA5b0dd53aa61Dc5806b6AcE";
        const contractABI = [[
	{
		"inputs": [],
		"name": "donate",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "donor",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "DonationReceived",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "donations",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalDonations",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]];
        const contract = new web3.eth.Contract(contractABI, contractAddress);

        // Update UI
        async function updateUI() {
            const totalDonations = await contract.methods.totalDonations().call();
            const contractBalance = await web3.eth.getBalance(contractAddress);
            const userDonations = await contract.methods.donations(account).call();

            document.getElementById("totalDonations").textContent = web3.utils.fromWei(totalDonations, "ether");
            document.getElementById("contractBalance").textContent = web3.utils.fromWei(contractBalance, "ether");
            document.getElementById("yourDonations").textContent = web3.utils.fromWei(userDonations, "ether");
        }

        // Donate button
        document.getElementById("donateButton").addEventListener("click", async () => {
            await contract.methods.donate().send({
                from: account,
                value: web3.utils.toWei("0.01", "ether"),
            });
            updateUI();
        });

        // Withdraw button
        document.getElementById("withdrawButton").addEventListener("click", async () => {
            await contract.methods.withdraw().send({ from: account });
            updateUI();
        });

        // Initial UI update
        updateUI();
    } else {
        alert("No Ethereum wallet detected. Please install MetaMask!");
    }
});
