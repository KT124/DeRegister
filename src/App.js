import "./App.css";
import { useState } from "react";
import { ethers } from "ethers";
import Locate from "./Locate";


import Register from "./artifacts/contracts/Register.sol/Register.json";
import RegisterFactory from "./artifacts/contracts/Register.sol/RegisterFactory.json";
import FactoryAddress from "./artifacts/contracts/Register.sol/contract-address.json";
const RegisterFactoryAdress = FactoryAddress.RegisterFactoryAddress;

function App() {
  const [account, setAccount] = useState([]);
  const [name, setName] = useState([]);
  const [country, setCountry] = useState([]);
  const [IdName, setIdName] = useState([]);
  const [IdNum, setIdNum] = useState([]);
  const [address, setAddress] = useState([]);
  const [signer, setSigner] = useState();
  const [fetchCoords, setFetchCoords] = useState();
  const [errorMes, setErrorMes] = useState();
  const [defAccount, setDefAccount] = useState();
  const [connButtonText, setConnButtonText] = useState("connect wallet");
  const [newPerson, setNewPerson] = useState();
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const isConnected = Boolean(account[0]);
  const [factory, setFactory] = useState({});
  const [registerContract, setRegisterContract] = useState();

  async function connectWallet() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setAccount(accounts);
      setDefAccount(accounts[0]);
      console.log(accounts);
    } else {
      setErrorMes("Install Metamask!");
      console.error("Install Metamask!");
    }
  }

  async function getRegistered() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log(provider);
    const signer = provider.getSigner();

    // creating an instance of Factory contract..

    const contractFactory = new ethers.Contract(
      RegisterFactoryAdress,
      RegisterFactory.abi,
      signer
    );

    // fetching newly created register address from the registers arrary in Factory contract...

    const newRegAddress = await contractFactory.registers(0);
    console.log(
      "calling register on Register contract @" + " " + newRegAddress
    );

    // loading an instance of Register base contract...
    const newRegContract = new ethers.Contract(
      newRegAddress,
      Register.abi,
      signer
    );

    // Calling register function of Register contract...

    const firstRegistry = await newRegContract.register(
      country,
      name,
      address,
      IdName,
      IdNum
    );
    await firstRegistry.wait();

    // calling persons array of Register contract to fetch just registered details person...

    console.log(await newRegContract.persons(0));
    console.log(newRegContract.address);
  }

  async function getRegisteredPersons() {
    // this function fetches intemize details of registered individual...

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log(provider);
    const signer = provider.getSigner();

    const contractFactory = new ethers.Contract(
      RegisterFactoryAdress,
      RegisterFactory.abi,
      signer
    );

    const newReg = await contractFactory.registers(0);
    const newRegContract = new ethers.Contract(newReg, Register.abi, signer);
    const getPersons = await newRegContract.persons(0);
    setNewPerson(getPersons);

    console.log(getPersons[0]);
    console.log(getPersons[1]);
    console.log(getPersons[2]);
    console.log(getPersons[3]);
    console.log(getPersons[4].toString());
    console.log(getPersons[5].toString());
  }

  async function setLocale(event) {
    event.preventDefault();
    // getting signer..
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log(provider);
    const signer = provider.getSigner();
    // creating an instance of Factory contract..

    const contractFactory = new ethers.Contract(
      RegisterFactoryAdress,
      RegisterFactory.abi,
      signer
    );

    // fetching newly created register address from registers array in Factory contract...

    const newRegAddress = await contractFactory.registers(0);

    // loding an instance of Register contract...

    const newRegContract = new ethers.Contract(
      newRegAddress,
      Register.abi,
      signer
    );

    // calling setLocate function on Register contract...
    const Latitude = ethers.utils.parseUnits(lat, 9);
    const Longitude = ethers.utils.parseUnits(lng, 9);

    const setLocale = await newRegContract.setLocale(Latitude, Longitude);
    await setLocale.wait();

    //console logging new captured locate...

    // console.log(await newRegContract.locales(0));
    const locate1 = await newRegContract.locales(0);
    console.log(locate1.toString());
  }

  async function getLocales() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log(provider);
    const signer = provider.getSigner();
    // creating an instance of Factory contract..

    const contractFactory = new ethers.Contract(
      RegisterFactoryAdress,
      RegisterFactory.abi,
      signer
    );

    // fetching newly created register address from registers array in Factory contract...

    const newRegAddress = await contractFactory.registers(0);

    // loding an instance of Register contract...
    const newRegContract = new ethers.Contract(
      newRegAddress,
      Register.abi,
      signer
    );

    const addrOwner = await newRegContract.owner();
    const details = await newRegContract.addrToLocale(addrOwner);

    setFetchCoords(
      ethers.utils.formatUnits(details.lat, "gwei"),
      ethers.utils.formatUnits(details.lng, "gwei")
    );

    console.log(
      ethers.utils.formatUnits(details.lat, "gwei"),
      ethers.utils.formatUnits(details.lng, "gwei")
    );
  }

  async function createRegister(event) {
    event.preventDefault();

    // getting provider and signer
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log(provider);
    const signer = provider.getSigner();

    // setting signer in useState...
    setSigner(signer);

    // creating an instance of Factory contract..

    const contractFactory = new ethers.Contract(
      RegisterFactoryAdress,
      RegisterFactory.abi,
      signer
    );

    // setting factory in useState...
    setFactory(contractFactory);

    // creating a new register contract....

    const createRegister = await contractFactory.createRegister(
      event.target.setText.value
    );
    await createRegister.wait();

    const newRegAddress = await contractFactory.registers(1);

    console.log("New crated Register @:" + " " + newRegAddress);
  }

  async function getIndividul() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log(provider);
    const signer = provider.getSigner();
    // creating an instance of Factory contract..

    const contractFactory = new ethers.Contract(
      RegisterFactoryAdress,
      RegisterFactory.abi,
      signer
    );

    // fetching newly created register address from registers array in Factory contract...

    const newRegAddress = await contractFactory.registers(0);

    // loding an instance of Register contract...
    const newRegContract = new ethers.Contract(
      newRegAddress,
      Register.abi,
      signer
    );
    const addrOwner = await newRegContract.owner();
    console.log(addrOwner);
    const individual = await newRegContract.addrtoPerson(addrOwner);
    console.log(individual.citizen);
    console.log(individual.fullName);
    console.log(individual.addr);
    console.log(individual.IDtype);
    console.log(individual.IDnum.toString());
    console.log(individual.registerID.toString());
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Property Register</h1>
        <div>
          <div>
            {isConnected ? (
              <p>connected!</p>
            ) : (
              <button
                style={{ backgroundColor: "blue" }}
                onClick={connectWallet}
              >
                connect Account
              </button>
            )}
            <h5>{errorMes}</h5>
          </div>
        </div>

        {/* <button onClick={connectWallet}>{connButtonText}</button> */}
        <button style={{ background: "red" }} onClick={getRegistered}>
          getRegistered
        </button>
        <input
          onChange={(e) => setCountry(e.target.value)}
          placeholder="country"
        />
        <input onChange={(e) => setName(e.target.value)} placeholder="name" />
        <input
          onChange={(e) => setIdName(e.target.value)}
          placeholder="IdName"
        />
        <input
          onChange={(e) => setAddress(e.target.value)}
          placeholder="address"
        />
        <input onChange={(e) => setIdNum(e.target.value)} placeholder="IdNum" />
        {/* <button onClick={updateEthers}>Instantiate</button> */}
        <button style={{ background: "green" }} onClick={getRegisteredPersons}>
          get person
        </button>
        <button style={{ background: "skyblue" }} onClick={getIndividul}>
          fetch individual
        </button>

        <h4>Address: {defAccount}</h4>

        <form onSubmit={createRegister}>
          <input id="setText" type="text" />
          <button type={"submit"}>create new register contract</button>
        </form>
        <button onClick={setLocale}>capture</button>
        <input
          onChange={(e) => setLat(e.target.value)}
          placeholder="Latitude"
        />
        <input
          onChange={(e) => setLng(e.target.value)}
          placeholder="Longitude"
        />

        {/* <form onSubmit={setLocale}>
          <input
            style={{ background: "orange" }}
            id="setNumber"
            type="number"
          />
          <button type={"submit"}>capture locale</button>
        </form> */}

        <Locate />
        <button onClick={getLocales}>fetch coordinates</button>
        <h5>{fetchCoords}</h5>
      </header>
    </div>
  );
}

export default App;
