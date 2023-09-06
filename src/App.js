import { useState, useEffect } from 'react';
import { NFTStorage, File } from 'nft.storage'
import { Buffer } from 'buffer';
import { ethers } from 'ethers';
import axios from 'axios';

// Components
import Spinner from 'react-bootstrap/Spinner';
import Navigation from './components/Navigation';

// ABIs
import NFT from './abis/NFT.json'

// Config
import config from './config.json';

function App() {
  const [provider, setProvider] = useState(null)
  const [account, setAccount] = useState(null)

  // Event Listener for the name and description for mint Action //
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider)
  }

  // submitHandler async to prevent default form reload then route 'mint' action the AI Neural Networks through the API //
  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log('x Submtting x', name, description);

    createImage();
  }

  //call function for parameters for the AI Neural Network API //
  const createImage = async () => {
    console.log("Generating Image...");

    const URL = 'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2';

    const response = axios({
      url: URL,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_HUGGING_FACE_API_KEY}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        inputs: description, options: { wait_for_model: true },
      }),
      responseType: 'arraybuffer'

    });
  }

  useEffect(() => {
    loadBlockchainData()
  }, [])

  return (
    <div>
      <Navigation account={account} setAccount={setAccount} />

      <div className="form">
        <form onSubmit={submitHandler}>
          <input type="text" placeholder="create a name..." onChange={(e) => { setName(e.target.value) }}></input>
          <input type="text" placeholder="write a description..." onChange={(e) => { setDescription(e.target.value) }}></input>
          <input type="submit" value="mint" onChange={(e) => { }}></input>
        </form>
        <div className="image">
          <img src="" alt="AI generated Image" />
          <img src="" alt="AI generated Image" />
        </div>
      </div>

      <p> View &nbsp; <a href="" target="_blank" rel="noreferrer" >Metadata</a></p>
    </div>
  );
}

export default App;
