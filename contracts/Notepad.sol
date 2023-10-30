// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Notepad {
    // this Note struct will contain two items: cid, filename
    struct Note {
        string cid;
        string fileName;
    }

    // this mapping will hold an array of Note objects
    // address1 -> [Note(cid,fileName), Note(cid, fileName)]
    mapping(address => Note[]) user;

    // this function adds a Note with a cid and filename
    function setUserNotes(string memory _cid, string memory _fileName) public {
        user[msg.sender].push(Note(_cid,_fileName));
    }

    //this function will return a cid based on the filename provided by user
    function getNoteCID(string memory _fileName) public view returns (string memory fn) {
        // Performs linear search to find the related cid of the entered filename
        for (uint i = 0; i < user[msg.sender].length; i++) {
            if ((keccak256(abi.encodePacked(bytes(_fileName))) == keccak256(abi.encodePacked(user[msg.sender][i].fileName)))){
                return user[msg.sender][i].cid;
            }
        }
    }

    // this function will return a string of filenames for display on the webpage
    function getAllNoteNames() public view returns(string memory) {
        string memory myNotes;
        for (uint i = 0; i < user[msg.sender].length; i++) {
            string memory text = user[msg.sender][i].fileName;
            myNotes = string.concat(text,myNotes);
            myNotes = string.concat("_",myNotes);
        }
        return myNotes;
    }

    // this function will delete a Note containing the fileName that is passed in
    function deleteNoteInfo(string memory _fileName) public {
        for (uint i = 0; i < user[msg.sender].length; i++) {
            if ((keccak256(abi.encodePacked(bytes(_fileName))) == keccak256(abi.encodePacked(user[msg.sender][i].fileName)))){
                delete user[msg.sender][i];
            }
        }
    }

}