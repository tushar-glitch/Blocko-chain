const web3 = require('../web3');

// Contract address
const contractAddress = '0xc1C63f462Bd42aD3A6E1f2C8C46da713D5A1c001';

// Replace with actual ABI
const abi =[
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "data",
				"type": "uint256"
			}
		],
		"name": "addData",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "getData",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
  
const contract = new web3.eth.Contract(abi, contractAddress);

module.exports = contract;
