import './App.css';
import React, {useState} from "react";
import { ContractABI, ContractAddress } from "./utils/contractdeets";
import {NFTStorage, Blob} from 'nft.storage';
import Logo from "./components/Logo";
import Header from "./components/Header";
import Button from "./components/Button";
const ethers = require("ethers");
const {ethereum} = window;
var notesArray = [];
const APITOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDlCRDhBODJiRDNGMjcyRjFCZDI1REYwNWZlOUZEMEM5QTRhYjA3QkYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY5ODMxODA1NTAwMSwibmFtZSI6IkZvcm1UZXh0In0.-AnInK4pomMjGPYTNUsnt1MjTd3TlS8HsgrMA759zNs"

function App() {
  const [fileNames, setfileNames] = useState(null);
  const [textAreaString, settextAreaString] = useState("");
  const [fileName, setfileName] = useState(null);
  const [walletAddress, setwalletAddress] = useState(null);

  const getEthereumContract = () => {
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const transactionContract = new ethers.Contract(
        ContractAddress,
        ContractABI,
        signer
      );
      return transactionContract;
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formText = e.target.elements.Content;
    addNewNote(APITOKEN, fileName, formText.value);
    document.forms[0].reset();
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
      const transactionContract = getEthereumContract();
    const CID = await transactionContract.getNoteCID(fileName);
    fetch(`https://ipfs.io/ipfs/${CID}`)
    .then(response => response.text())
    .then(data => {
    settextAreaString(data);
        });
    } catch (error) {
      console.log(error);
    }
    
  };

  const displayNotes = async() => {
    try {
      const transactionContract = getEthereumContract();
    //You should obtain an string of file names separated by an underscore
    const text_Notes = await transactionContract.getAllNoteNames();
    console.log(text_Notes);
    notesArray = text_Notes.split(" ");

    for (var i=0; i<notesArray.length; i++) {
      if (notesArray[i].length === 0) {
        notesArray.splice(i,1);
      }
    }
    console.log(notesArray);
    } catch (error) {
      console.log(error);
    }
    
  }

const deleteOldNote = async(APITOKEN, fileName) => {
  try {
    // retrieve the CID using the fileName
  const transactionContract = getEthereumContract();
  const CID = await transactionContract.getNoteCID(fileName);
  const client = new NFTStorage({ token: APITOKEN });
  await client.delete(CID);
  // delete the the Note struct on the blockchain based on the Note file name
  await transactionContract.deleteNoteInfo(fileName);
  // update the Display File Names list
  document.forms[0].reset();
  } catch (error) {
    console.log(error);
  }
  
  }

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
      <input type = "text" placeholder = "Enter Note Name" onChange={(e)=>(setfileName(e.target.value))} />
      <br/>
        <textarea defaultValue = {textAreaString} placeholder = "Enter your text here" name = "Content" rows={10} cols={60}/> <br/>
      </form>
      <div className = "bottom">
        <button type = "submit" form = "myForm">Submit Note</button>
        <Button type = "button" onClick={() => retrieveOldNote(fileName)} text = "Read Note" />
        {/*<Button type = "button" onClick={() => editOldNote(APITOKEN,fileName)} text = "Edit Note" />*/}
        <Button type = "button" onClick={() => deleteOldNote(APITOKEN, fileName)} text = "Delete Note" /> <br/> <br/> <br/>
        <Button type = "button" onClick={() => displayNotes()} text = "Display Notes" />
        
      </div>
      </header>
    </div>
  );
}

export default App;