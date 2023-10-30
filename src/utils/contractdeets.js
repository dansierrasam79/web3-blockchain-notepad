export const ContractAddress = "0x6eE3196c77C3fB03d1367ec5096d4D397E141145";

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