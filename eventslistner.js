const Web3 = require('web3');
const fs = require('fs');
const util = require("util");

// Define the contract address and ABI (replace with your contract's details)

const contractAddress = "0x45355f50664866B01xxxx"; //insert your smart contract address

const contractpath = "./yoursmartcontract.json"; // path of smart contract json file
const contractJson = JSON.parse(fs.readFileSync(contractpath), "utf8");
const contractABI = contractJson.abi;// Replace with your contract's ABI


// Configure reconnect options for WebsocketProvider
const websocketOptions = {
  timeout: 30000,
  clientConfig: {
    // Useful to keep a connection alive
    keepalive: true,
    keepaliveInterval: 60000 // ms
  },

  // Enable auto reconnection
  reconnect: {
    auto: true,
    delay: 5000, // ms
    maxAttempts: 5,
    onTimeout: false
  },
};

// Initialize a Web3 instance with the URL of your Besu node
const web3 = new Web3(
  new Web3.providers.WebsocketProvider("WEB SOCKET WEB3 URL", websocketOptions)); // Replace with your Besu node's URL

// Create a contract instance
const contract = new web3.eth.Contract(
  contractABI,
  contractAddress,
);

console.log('listening to events');


// Define the events you wish to listen to. If you have a large number of events, it would be better to manage them in a database and dynamically read them.
const eventNames = ['RegisterUser', 'UpdateUser', 'RemoveUser', 'ContractUpdate'];

// Subscribe to the event
const eventsubscribe = () => {
  eventNames.forEach((eventName) => {
    contract.events[eventName]()
      .on('data', (event) => {
        console.log('event received', event);
        console.log('event data:', event.returnValues);

        // Add custom logic to handle the event data here
        

      })
      .on('error', (error) => {
        console.error(`Event ${eventName} error:`, error);
       
        // Add custom error handling logic here
      });

    console.log(`Event listener for ${eventName} started.`);
  });
};

eventsubscribe();
