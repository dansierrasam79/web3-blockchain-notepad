//old contract address "0x6eE3196c77C3fB03d1367ec5096d4D397E141145";

export const ContractAddress = "0xcc7B3e20C868F71A008B88e783d4e7E9003602fB";

export const ContractABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_fileName",
				"type": "string"
			}
		],
		"name": "deleteNoteInfo",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_cid",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_fileName",
				"type": "string"
			}
		],
		"name": "setUserNotes",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllNoteNames",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_fileName",
				"type": "string"
			}
		],
		"name": "getNoteCID",
		"outputs": [
			{
				"internalType": "string",
				"name": "fn",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "returnNoteLengths",
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
];