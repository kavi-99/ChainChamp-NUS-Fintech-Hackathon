// Dashboard.js
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './usercontext.js';
//import { useHistory } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import './Dashboard.css'; // Your CSS file for styling
import { SignIn, PortkeyProvider, getChain} from "@portkey/did-ui-react";
import { IPortkeyContract, getContractBasic } from '@portkey/contracts';
import { MethodsBase } from "@portkey/provider-types";
import detectProvider from "@portkey/detect-provider";

// Mock data for brands [in reality this could some from a database of brands that are working with us]
const brands = [
  { name: 'Starbucks', points: 20, color: '#00704A',code: '001'},
  { name: 'Nike', points: 100, color: '#ba2b2b',code: '002' },
  { name: 'Adidas', points: 0, color: '#fca311', code: '003' },
  { name: 'PQR', points: 50, color: '#005cbf', code: '004' },
  { name: 'Reebok', points: 25, color: '#E21A2C', code: '005' }, // Reebok red
  { name: 'Under Armour', points: 75, color: '#B3B5B6', code: '006' }, // Metallic silver
  { name: 'New Balance', points: 35, color: '#FFEEDB', code: '007' }, // Off-white peach
  { name: 'Converse', points: 85, color: '#E6E6E6', code: '008' }, // Light gray
  { name: 'Vans', points: 15, color: '#C4A484', code: '009' }, // Tan brown
  { name: 'Fila', points: 65, color: '#0062BE', code: '010' }, // Fila blue
  { name: 'Asics', points: 10, color: '#009F4D', code: '011' }, // Asics green
  { name: 'Puma', points: 95, color: '#ED1C24', code: '012' }, // Puma red
  { name: 'Google', points: 120, color: '#4285F4', code: '013' },
  { name: 'Amazon', points: 180, color: '#FF9900', code: '014' },
  { name: 'Apple', points: 220, color: '#A3AAAE', code: '015' },
  { name: 'Netflix', points: 140, color: '#E50914', code: '016' },
  { name: 'Spotify', points: 190, color: '#1DB954', code: '017' },
  { name: 'Samsung', points: 80, color: '#1428A0', code: '018' },
  { name: 'Intel', points: 60, color: '#0071C5', code: '019' },
  { name: 'Sony', points: 50, color: '#003171', code: '020' }
  // Add more brands as needed
];

const Dashboard = () => {  
  const user = useContext(UserContext);
  console.log('user', user)
  const [balance, setBalance] = useState(null);
  const [amt, setAmt] = useState('0');
  const [Addr, setAddr] = useState('');
  const [message, setMessage] = useState('Gift/Transfer Message: ');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  let navigate = useNavigate();

  // Function to navigate to brand details page
  const navigateToBrand = (brand) => {
      console.log(`Navigating to details for: ${brand.name}`);
      console.log('with',balance)
      navigate(`/brand/${brand.name}`, { state: { balance: balance } });
      // Actual navigation logic would go here
  };

  // useEffect(() => {
  //   const providerBalance = async () => {
  //     const provider = await detectProvider();

  //     const accounts = await provider.request({method:"requestAccounts"})
  //     // {AELF:["AELF_Address"],tDVV:["tDVV_Address"]}

  //     // get chain
  //     const chain = await provider.getChain('AELF');

  //     // status
  //     const status =  await chain.getChainStatus();
  //     console.log("Status:  ", status);

  //     // get contract
  //     const info = await getChain('AELF');
  //     const tokenContractAddress = info?.defaultToken.address;
  //     const tokenC = await chain.getContract('token contract address');

  //     // Transfer
  //     // const req = await tokenC.callSendMethod('Transfer',accounts.AELF[0],{amount:100000,symbol:"ELF",to:'xxx'})

  //     // GetBalance
  //     const req = await tokenC.callViewMethod('GetBalance',{symbol: 'ELF',owner: "owner"})
  //     console.log(req)
  //   }

  //   providerBalance();
  // })

  useEffect(() => {
    // This function should be defined to get the balance from the blockchain
    const fetchBalance = async () => {
      try {
        const info = await getChain('AELF');
        const tokenContractAddress = info?.defaultToken.address;
        const contract = await getContractBasic({
          contractAddress: tokenContractAddress,
          account: user.walletInfo,
          rpcUrl: info?.endPoint // "https://aelf-test-node.aelf.io"
        });

        const retrievedBalance = await contract.callViewMethod("GetBalance", {
          symbol: "ELF",
          owner: user.caInfo.caAddress
        });
        setBalance(retrievedBalance.data.balance); 

      } catch (error) {
        console.error('Failed to fetch balance:', error);
      }
    };

    if (user) {
      console.log('here')
      fetchBalance();
    }
  }, [user]);

  // if (!provider) return <>Provider not found.</>;

  const handleSubmit = async () => {
    // TODO validate purchase id
    // Reset purchase code input after submission
    console.log("handle submit")
    var merchantWalletInfo = ' '
    
    const info = await getChain('AELF');
    const tokenContractAddress = info?.defaultToken.address;
    console.log(tokenContractAddress);
    console.log("space2");
    const contract = await getContractBasic({
      contractAddress: tokenContractAddress,
      account: user.walletInfo,
      rpcUrl: info?.endPoint // "https://aelf-test-node.aelf.io"
    });
    console.log(contract);
    console.log("space3");

    // const retrievedBalance = await contract.callViewMethod("GetBalance", {
    //   symbol: "ELF",
    //   owner: user.caInfo.caAddress
    // })
    // console.log("balance")
    // setBalance(retrievedBalance.data.balance);
    // console.log(retrievedBalance.data.balance)
    // console.log(balance)

    const transferResult = await contract.callSendMethod("Transfer", "2JEr8cnTn11cqHz8vrQRexFgN7hCnsaBc7LmMofEXqRKARQCHR", {
      symbol: 'ELF',
      to: Addr,
      amount: amt,
      memo: message
    })
    console.log("transfer result")
    console.log(transferResult)
    togglePopup()

  };


  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="dashboard-title">Consumer Dashboard</div>
          <div className="dashboard-subtitle">
            <p>Welcome to your dashboard,</p>
            <p>Access all your favourite brands in one stop!</p>
          </div>
          <div className='gift-tokens'>
            <button onClick={togglePopup}>Click Here to Gift/Transfer Tokens!</button>
          </div>
      </div>
      <div className="brand-grid">
        {brands.map((brand, index) => (
          <div
            key={index}
            className="brand-card"
            style={{ backgroundColor: brand.color }}
            onClick={() => navigateToBrand(brand)}
          >
            {/* <h2>{brand.name}</h2> */}
            <p>{brand.name}</p>
            {/* <p>{brand.points} loyalty tokens</p> */}
          </div>
        ))}
      </div>

      {isPopupOpen && (
        <div className="popup-container">
          <div className="popup">
            <div className="popup-header">
              <p>Gift/Transfer Tokens</p>
              <button onClick={togglePopup} className="close-popup">✕</button>
            </div>
            {/* Your form elements go here */}
            <form className="popup-form" onSubmit={handleSubmit}>
              {/* Your input fields */}
              <input 
                type="text" 
                value={amt}
                onChange={(e) => setAmt(e.target.value)}
                placeholder="Amount"
              />
              <input 
                type="text" 
                value={Addr}
                onChange={(e) => setAddr(e.target.value)}
                placeholder="Recipient Wallet Address"
              />
              <input 
                type="text" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message"
              />
              <button type="button" onClick={handleSubmit}>Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
