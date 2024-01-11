import React, { useState, useRef } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import BrandDetails from './BrandDetails';
import ChainChampLogo from './ChainChampLogo-transparent.png';
import './App.css';
import { SignIn, PortkeyProvider, getChain} from "@portkey/did-ui-react";
import { IPortkeyContract, getContractBasic } from '@portkey/contracts';
import "@portkey/did-ui-react/dist/assets/index.css";
import { UserContext } from './usercontext.js';


function App() {

  const [signInMethod, setSignInMethod] = useState(null);
  const [user, setUser] = useState(null);
  const ref = useRef();
  
  var fromOwner = '2JEr8cnTn11cqHz8vrQRexFgN7hCnsaBc7LmMofEXqRKARQCHR' //JueLin wallet
  var toReceipient = 'J3fNf2mHedV4YgG739qf74VF9NDthZRsmsnLknRspbPxzkZQR' //Anni wallet, replace with your wallet 

  const handleSignInEnterprise = () => {
    alert('Sign in as Enterprise clicked!');
    setSignInMethod('Enterprise');
    // Additional logic for signing in as Enterprise can be added here
  };

  const handleSignInCustomer = () => {
    alert('Sign in as Customer clicked!');
    ref.current.setOpen(true);
  };

  const onFinish = async (result) => {
    setSignInMethod('Customer');
    setUser(result);
    console.log(result)
    console.log(user)
    // const balance = await contract.callViewMethod("GetBalance", {
    //   symbol: "ELF",
    //   owner: result.caInfo.caAddress
    // })
    // console.log("balance")
    // console.log(balance)
  }

  return (
   // <Dashboard/>
    <Router>
    <UserContext.Provider value={user}>
      <div>
        {signInMethod === 'Enterprise' && (
          <>
            {/* Navigation Links */}
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>

            {/* Routes */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </>
        )}
        {signInMethod === 'Customer' && (
          <>
            {/* Routes */}
            {/* <Link to="/about">About</Link>
            <Routes>
              <Route path="/about" element={<About />} />
            </Routes> */}
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/brand/:name" element={<BrandDetails />} />
            </Routes> 
          </>
        )}
        {signInMethod !== 'Enterprise' && signInMethod !== 'Customer' && (
          // Render login content when not signed in
          <div className="login-container">
            <img src={ChainChampLogo} className="App-logo" alt="logo" />
            <h2>LOG IN TO <span className="blue-text">CHAIN CHAMP</span></h2>
            <h3 className="blue-text">Reward Programs Like Never Before</h3>
            <div className="button-container">
              <button className="signin-button" onClick={handleSignInEnterprise}>
                <b>Sign in as Enterprise</b>
                <br />
                <span className="small-text">Customize Loyalty Program</span>
              </button>
              <button className="signin-button" onClick={handleSignInCustomer}>
                <b>Sign in as Customer</b>
                <br />
                <span className="small-text">Wallet for Loyalty Tokens</span>
              </button>
              <button className="signup-button">No account? Sign Up Here</button>
              <PortkeyProvider networkType={"TESTNET"}>
                <SignIn ref={ref} onFinish={onFinish} />
              </PortkeyProvider>
            </div>
          </div>
        )}
      </div>
      {/* <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/brand/:name" element={<BrandDetails />} />
      </Routes> */}
    </UserContext.Provider>
    </Router>
  );
}

function Home() {
  return <h3>Home Page</h3>;
}

function About() {
  return <h3>About Page</h3>;
}

export default App;
