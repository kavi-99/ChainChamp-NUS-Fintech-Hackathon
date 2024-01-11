import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import './BrandDetails.css';

const BrandDetails = () => {
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

  return (
    <div className='brand-details'>
    <button onClick={goBack} className="go-back-button">Go Back to Dashboard</button>
        <div className='brand-header'>
            <h2>{name}</h2>
        </div>   
      {/* Add more brand details as needed */}
      <div className="points-summary">
        <h2 className='hi-user'>Hi User,</h2>
        <p className='wallet-balance'>You have {balance} loyalty points in your wallet!</p>
        {balance === 0 && (
          <p>Make more purchases from your favourite brands to earn more points!</p>
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
                {transaction.points > 0 ? `+${transaction.points}` : transaction.points} points
              </span>
              <span className="time">{transaction.time}</span>
            </div>
          ))}
        </div>
      </div>
      <div className='buttons-container'>
        <button className="button view-offers">View Rewards and Offers From {name}</button> {/* Added class */}
        {/* <button className="button view-rewards">View Rewards</button> Added class */}
      </div>
    </div>
  );
};

export default BrandDetails;