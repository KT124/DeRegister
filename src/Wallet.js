import React from "react";

const Wallet = ({ account, setAccount }) => {
  async function connectWallet() {
    const isConnected = Boolean(account[0]);

    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setAccount(accounts);
      console.log(accounts);
    } else {
      console.error("Install Metamask!");
    }

    return (
      <div>
        {isConnected ? (
          <p>connected!</p>
        ) : (
          <button style={{ backgroundColor: "blue" }} onClick={connectWallet}>
            connect Account
          </button>
        )}
      </div>
    );
  }
};

export default Wallet;
