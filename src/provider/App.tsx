import { useEffect, useState } from "react";
import { IPortkeyProvider, MethodsBase } from "@portkey/provider-types";
import "./App.css";
import detectProvider from "@portkey/detect-provider";
import Balance from "../Balance";
import React from 'react'

function App() {
  const [provider, setProvider] = useState<IPortkeyProvider | null>(null);

  const init = async () => {
    try {
      setProvider(await detectProvider());
    } catch (error) {
      console.log(error, "=====error");
    }
  };

  const connect = async () => {
    await provider?.request({
      method: MethodsBase.REQUEST_ACCOUNTS,
    });
  };

  useEffect(() => {
    if (!provider) init();
  }, [provider]);

  if (!provider) return <>Provider not found.</>;

  return (
    <>
      <button onClick={connect}>Connect</button>
      <div style={{ display: "flex" }}>
        <Balance provider={provider} chainId="AELF" symbol="ELF" />
        <Balance provider={provider} chainId="tDVW" symbol="ELF" />
        <Balance provider={provider} chainId="AELF" symbol="AELFWSFTBF" />
      </div>
    </>
  );
}

export default App;