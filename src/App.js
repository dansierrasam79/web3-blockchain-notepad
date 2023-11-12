import './App.css';
import React, {useState, useEffect} from "react";
import { ContractABI, ContractAddress } from "./utils/contractdeets";
import {NFTStorage, Blob} from 'nft.storage';
import Logo from "./components/Logo";
import Header from "./components/Header";
import Button from "./components/Button";
const ethers = require("ethers");
const {ethereum} = window;
var notesArray = [];
const APITOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDlCRDhBODJiRDNGMjcyRjFCZDI1REYwNWZlOUZEMEM5QTRhYjA3QkYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY5ODMxODA1NTAwMSwibmFtZSI6IkZvcm1UZXh0In0.-AnInK4pomMjGPYTNUsnt1MjTd3TlS8HsgrMA759zNs"
const CHAIN_ID = 80001;
const NETWORK_NAME = "Mumbai";

function App() {
  const [textAreaString, settextAreaString] = useState("");
  const [fileName, setfileName] = useState("");
  const [walletAddress, setwalletAddress] = useState(null);
  const [readOnly, setreadOnly] = useState(false);

  const getChainID = async(provider) => {
    const {chainId} =  await provider.getNetwork();
    if (chainId !== CHAIN_ID) {
      setreadOnly(true);
      window.alert(`Please switch to the ${NETWORK_NAME} network`);
      throw new Error(`Please switch to the ${NETWORK_NAME} network`);

    }
  }

  const getEthereumContract = () => {
    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        getChainID(provider);
        const transactionContract = new ethers.Contract(
          ContractAddress,
          ContractABI,
          signer
        );
        return transactionContract;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ConnectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Please install metamask");
        return;
      } else {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        setwalletAddress(accounts[0]);
        console.log("Connected", walletAddress);
      }
      } catch (error) {
      console.log(error);
    }
    };

    const findIteminArray = (element) => {
      var length = notesArray.length;
      for (var i = 0; i < length; i++) {
      if (notesArray[i] === element)
       return true;
      }
      return false;
     }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formText = e.target.elements.Content;
    const val = findIteminArray(fileName);
    let finalFinalFileName = fileName.replace(/\s/g, "");
    if (finalFinalFileName !== "" && formText.value !== "" && val === false) {
      addNewNote(APITOKEN, finalFinalFileName, formText.value);
      document.forms[0].reset();
    }
    else {
      alert("ERROR: Filename missing or duplicate")
    }
  }

  const addNewNote = async (APITOKEN, fileName, formTextval) => {
    try {
      const client = new NFTStorage({ token: APITOKEN })
      const content = new Blob([formTextval])
      const cid = await client.storeBlob(content)
      const transactionContract = getEthereumContract();
      await transactionContract.setUserNotes(cid, fileName);
      alert("Note created!");
      
    } catch (error) {
      console.log(error);
    }
  };

  const retrieveOldNote = async (fileName) => {
    try {
      const val = findIteminArray(fileName);
      if (fileName !== "" && val === true) {
        const transactionContract = getEthereumContract();
        const CID = await transactionContract.getNoteCID(fileName);
        fetch(`https://ipfs.io/ipfs/${CID}`)
        .then(response => response.text())
        .then(data => {
        settextAreaString(data);
        });
      }
      else {
        alert("ERROR: Incorrect or empty filename")
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  const editOldNote = async(APITOKEN, fileName, textAreaString) => {
    try {
      const val = findIteminArray(fileName);
      if (fileName !== "" && val === true) {
      // Retrieve cid from the blockchain
      await deleteOldNote(APITOKEN, fileName);
      await addNewNote(APITOKEN, fileName, textAreaString);
      document.forms[0].reset();
      alert("Note edited");
    }
    else {
      alert("ERROR: Incorrect or empty filename")
    }
   } catch (error) {
      console.log(error);
    }
  };

  const deleteOldNote = async(APITOKEN, fileName) => {
    try {
      const val = findIteminArray(fileName);
      if (fileName !== "" && val === true) {
      // retrieve the CID using the fileName
      const transactionContract = getEthereumContract();
      const CID = await transactionContract.getNoteCID(fileName);
      const client = new NFTStorage({ token: APITOKEN });
      await client.delete(CID);
      // delete the the Note struct on the blockchain based on the Note file name
      await transactionContract.deleteNoteInfo(fileName);
      document.forms[0].reset();
      alert("Note deleted");
    }
      else {
        alert("Incorrect or empty filename. Please try again.");
      }
    } catch (error) {
      console.log(error);
    }
    }

  const displayNotes = async() => {
    try {
      const transactionContract = getEthereumContract();
    //You should obtain a string of file names separated by an underscore
    const text_Notes = await transactionContract.getAllNoteNames();
    notesArray = text_Notes.split(" ");
    for (var i=0; i<notesArray.length; i++) {
      if (notesArray[i].length === 0) {
        notesArray.splice(i,1);
      }
    }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    displayNotes();
  });

  return (
    <div className="App">
      <header className="center">
      <Logo />
      <Header title = "Blockchain Notepad" />
      <div className = "right">
          {walletAddress === null ? (<button onClick={() => ConnectWallet()} > Metamask Connect Wallet </button>) 
          : (<p> Wallet Address Connected </p>)}
      </div>
      <form id = "myForm" onSubmit={handleSubmit} className = "center">
      <br/>
      <input type = "text" placeholder = "Enter filename" disabled = {readOnly} value = {fileName} onChange={(e)=>(setfileName(e.target.value))} name = "txtfile" />
      <br/>
        <textarea defaultValue = {textAreaString} disabled = {readOnly} placeholder = "Enter Note text here" onChange={(e)=>(settextAreaString(e.target.value))} name = "Content" rows={10} cols={60}/> <br/>
      </form>
      <div className = "bottom">
        <button type = "submit" form = "myForm">Create Note</button>
        <Button type = "button"  onClick={() => retrieveOldNote(fileName)} text = "Read Note" />
        <Button type = "button"  onClick={() => editOldNote(APITOKEN, fileName, textAreaString)} text = "Edit Note"/>
        <Button type = "button" onClick={() => deleteOldNote(APITOKEN, fileName)} text = "Delete Note" /> <br/> <br/> <br/>
      </div>
      <div>
      <h3>Created File Names</h3>
        {notesArray.map((note) => (
            <label key={note} >
                {note.concat(" ")}
            </label>
        ))
    }
      </div>
      </header>
    </div>
  );
}

export default App;