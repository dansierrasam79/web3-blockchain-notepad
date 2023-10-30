export const ContractAddress = "0x5D3073e9334bCf226753e6794D777C232604c1e9";

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
	}
];