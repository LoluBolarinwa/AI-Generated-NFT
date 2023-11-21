import { useState, useEffect } from 'react';
import { NFTStorage, File } from 'nft.storage'
import { Buffer } from 'buffer';
import { ethers } from 'ethers';
import axios from 'axios';
// import REACT_APP_HUGGING_FACE_API_KEY from '.env'

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

  // Event Listener for the Image response from the AI //
  const [image, setImage] = useState(null);

  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider)
  }

  // submitHandler async to prevent default form reload then route 'mint' action the AI Neural Networks through the API //
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log('x Submtting x', name, description);

     createImage(); // API call to generte image based on description
  }

  //call function for parameters for the AI Neural Network API //
  const createImage = async () => {
    console.log("Generating Image...");

    // API URL from AI generating model //
    const URL = 'https://api-inference.huggingface.co/api/models/stabilityai/stable-diffusion-2';
    // const URL = 'https://huggingface.co/stabilityai/stable-diffusion-2?text=';

    // Send the request //
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

    // const type = response.headers['content-type']
    // const data = response.data 

    // const base64data = Buffer.from(data).toString('base64');
    // const img = `data:${type};base64,` + base64data   //This is for showing it on the page
   
    // setImage(img)

    // return data;

  }

  useEffect(() => {
    loadBlockchainData()
  }, [])





  return (
    <div>
      <Navigation account={account} setAccount={setAccount} />

      <div className="form">
        <div className="image">
          <img src={`https://bafybeia7l2hefmvflkvusalrwidvtvdjmi6vslfd5xaapsv77ndspwmxge.ipfs.dweb.link/ETH%20Playground%20_%20Foundation.png`} alt="AI generated Image" />
        </div>
        <form onSubmit={submitHandler}>
          <input type="text" placeholder="create a name..." onChange={(e) => { setName(e.target.value) }}></input>
          <input type="text" placeholder="write a description..." onChange={(e) => { setDescription(e.target.value) }}></input>
          <input type="submit" value="mint" onChange={(e) => { }}></input>
        </form>
      </div>

      <p> View &nbsp; <a href="" target="_blank" rel="noreferrer" >Metadata</a></p>
    </div>
  );
}

export default App;
