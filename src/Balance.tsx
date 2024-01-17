import {
    IPortkeyProvider,
    MethodsBase,
    ChainId,
  } from "@portkey/provider-types";
  import BigNumber from "bignumber.js";
  import { useState } from "react";
  import useTokenContract from "./provider/useTokenContract.ts";
  import React from 'react'
  
  function Balance({
    provider,
    chainId,
    symbol,
  }: {
    provider: IPortkeyProvider | null;
    chainId: ChainId;
    symbol: string;
  }) {
    const [balance, setBalance] = useState<string>();
    const tokenContract = useTokenContract(provider, chainId);
  
    const onClick = async () => {
      setBalance("Fetching...");
      try {
        const accounts = await provider?.request({
          method: MethodsBase.ACCOUNTS,
        });
        if (!accounts) throw new Error("No accounts");
  
        const result = await tokenContract?.callViewMethod<{
          balance: string;
          owner: string;
          symbol: string;
        }>("GetBalance", {
          symbol,
          owner: accounts?.[chainId]?.[0],
        });
  
        if (result) {
          const balance = result.data?.balance;
  
          if (balance) {
            setBalance(new BigNumber(balance).dividedBy(10 ** 8).toFixed(5));
          }
        }
      } catch (error) {
        console.log(error, "====error");
        setBalance("Failed.");
      }
    };
  
    if (!provider) return null;
  
    return (
      <div>
        <button onClick={onClick}>
          Get {chainId} {symbol} Balance
        </button>
        <div>
          {balance} {symbol}
        </div>
      </div>
    );
  }
  
  export default Balance;