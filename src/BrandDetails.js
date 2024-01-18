import React, { useState, useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { UserContext } from './usercontext.js';
import { SignIn, PortkeyProvider, getChain} from "@portkey/did-ui-react";
import { IPortkeyContract, getContractBasic } from '@portkey/contracts';
import './BrandDetails.css';

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

function getBrandNameById(brandId, brands) {
  const brand = brands.find(brand => brand.code === brandId);
  return brand ? brand.name : null;
}

// Assuming you have a function to retrieve the wallet account for a brand
function retrieveBrandWalletAccount(brandName) {
  // Placeholder logic
  console.log(`Retrieving wallet account for ${brandName}`);
  // Insert logic to actually retrieve the wallet account
}

const BrandDetails = () => {
  const user = useContext(UserContext);
  console.log('user', user)
  const [purchaseId, setPurchaseId] = useState('');
  const [memotext, setMemotext] = useState('');
  const [productId, setProductId] = useState('');
  const [product, setProduct] = useState('');
   const { name } = useParams(); // Get brand name from URL params
   console.log(name)
   console.log(useLocation)
   const location = useLocation();
   const { balance } = location.state || {};
   console.log(balance)
//   const location = useLocation(); // Access state passed during navigation
    const transactions = [
        { points: +5, time: '01:28 pm' },
        { points: -2, time: '10:45 am' },
        { points: +10, time: 'yesterday' },
        { points: -3, time: 'yesterday' },
        { points: +30, time: 'yesterday' },
        { points: +3, time: 'yesterday' },
        { points: +1, time: 'yesterday' },
        { points: -10, time: 'yesterday' },
        { points: +10, time: 'yesterday' },
        { points: -10, time: 'yesterday' },
        // Add more transactions as needed
    ];
    const goBack = () => {
        window.history.back();
    };

    const handleSubmit = async () => {
      // TODO validate purchase id
      // Reset purchase code input after submission
      const brandName = getBrandNameById(purchaseId, brands);
  
      console.log("brand", brandName)
  
      if (brandName) {
        retrieveBrandWalletAccount(brandName);
        alert(`Congratulations! You have earned loyalty tokens from ${brandName}`);
      } else if (productId) {
        alert('Tokens submitted! Visit our site to receive your product!')
      }
      else {
        alert('Brand not found for this ID');
      }
      
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
        to: user.caInfo.caAddress,
        amount: '1',
        memo: memotext
      })
      console.log("transfer result")
      console.log(transferResult)
  
      setPurchaseId('');
  
    };

  return (
  <div className='brand-details-container'> {/* New container */} 
    <div className='brand-details'>
    <button onClick={goBack} className="go-back-button">Go Back to Dashboard</button>
        <div className='brand-header'>
            {/* <h2>{name}</h2> */}
            <p>{name}</p>
        </div>   
      {/* Add more brand details as needed */}
      <div className="points-summary">
        <p className='hi-user'>Hi User,</p>
        <p className='wallet-balance'>You have {balance} loyalty tokens in your wallet!</p>
        {balance === 0 && (
          <p>Make more purchases from your favourite brands to earn more tokens!</p>
        )}
        {/* <button className="wallet-button">Go to Wallet</button>  */}
        {/* <p className="recent-points">You have just received 5 from {name}!</p> */}
      </div>
      <div className="transaction-history">
        <h3 className='transaction-history-title'>Transaction History</h3>
        <div className="transaction-list"> {/* Added div for scrolling */}
          {transactions.map((transaction, index) => (
            <div key={index} className="transaction">
              <span className={`points ${transaction.points > 0 ? 'positive' : 'negative'}`}>
                {transaction.points > 0 ? `+${transaction.points}` : transaction.points} tokens
              </span>
              <span className="time">{transaction.time}</span>
            </div>
          ))}
        </div>
      </div>
      {/* <div className='buttons-container'>
        <button className="button view-offers">View Rewards and Offers From {name}</button> {/* Added class */}
        {/* <button className="button view-rewards">View Rewards</button> Added class}
      </div> */}
    </div>
   <div className='left-side'> 
    <div className="purchase-id-input">
    <h3>Made any recent purchases?</h3>
    <p>Fill and Submit this form to redeem your tokens!</p>
    <div className='purchase-form'>
      <div className='form-field'>
        <p>Enter purchase code</p>
        <input 
          type="text" 
          value={purchaseId}
          onChange={(e) => setPurchaseId(e.target.value)}
          placeholder="e.g. 001"
        />
      </div>
      <div className='form-field'>
        <p>Enter product purchased</p>
        <input 
          type="text" 
          value={memotext}
          onChange={(e) => setMemotext(e.target.value)}
          placeholder="e.g. coffee"
        />
      </div>
    </div>
    <button onClick={handleSubmit}>Submit</button>
   </div>
   <div className="purchase-id-input">
    <h3>Have any Tokens?</h3>
    <p>Fill and Submit this form to redeem your desired reward!</p>
    <div className='purchase-form'>
      <div className='form-field'>
        <p>Enter product to be purchased</p>
        <input 
          type="text" 
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          placeholder="e.g. coffee"
        />
      </div>
      <div className='form-field'>
        <p>Enter product code</p>
        <input 
          type="text" 
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          placeholder="e.g. 0ax2"
        />
      </div>
    </div>
    <button onClick={handleSubmit}>Submit</button>
   </div>
  </div> 
  </div>
  );
};

export default BrandDetails;