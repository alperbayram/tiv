// app/components/WalletConnect.tsx
"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function WalletConnect() {
  const [address, setAddress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedAddress = Cookies.get("walletAddress");
    if (savedAddress) {
      setAddress(savedAddress);
    }
  }, []);

  const CAMINO_CHAIN_ID = "0x1F5"; // 501 in hexadecimal
  const CAMINO_NETWORK_PARAMS = {
    chainId: CAMINO_CHAIN_ID,
    chainName: "Columbus (testnet)",
    nativeCurrency: {
      name: "CAM",
      symbol: "CAM",
      decimals: 18,
    },
    rpcUrls: ["https://columbus.camino.network/ext/bc/C/rpc"],
    blockExplorerUrls: ["https://suite.camino.network/explorer/c-chain"],
  };

  const connectWallet = async () => {
    setIsConnecting(true);
    setError("");

    try {
      if (!window.ethereum) {
        throw new Error("Please install MetaMask to connect wallet");
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const chainId = await window.ethereum.request({
        method: "eth_chainId",
      });

      if (chainId !== CAMINO_CHAIN_ID) {
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: CAMINO_CHAIN_ID }],
          });
        } catch (switchError: any) {
          if (switchError.code === 4902) {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [CAMINO_NETWORK_PARAMS],
            });
          } else {
            throw switchError;
          }
        }
      }

      setAddress(accounts[0]);
      Cookies.set("walletAddress", accounts[0], { expires: 7 }); // Address'i çerezlere kaydediyoruz

      window.ethereum.on("accountsChanged", (newAccounts: string[]) => {
        setAddress(newAccounts[0]);
        Cookies.set("walletAddress", newAccounts[0], { expires: 7 }); // Yeni adresi çerezlere kaydediyoruz
      });

      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsConnecting(false);
    }
  };

  if (!isClient) return null;

  return (
    <button
      onClick={connectWallet}
      disabled={isConnecting}
      className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
    >
      {isConnecting
        ? "Connecting..."
        : address
        ? `Connected: ${address.slice(0, 6)}...${address.slice(-4)}`
        : "Connect Wallet"}
    </button>
  );
}
