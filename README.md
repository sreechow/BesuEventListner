# Hyperledger Besu - Blockchain EventsListner
This simple guide is useful if you want to learn how to set up event listeners from the blockchain.

Recently, we configured the private Hyperledger Besu. As part of this setup, we developed an independent service to listen to all events and subsequently perform various actions, such as saving event timestamps on an off-chain database, among others.

Feel free to review the code in eventslisteners.js; we have added comments for better comprehension.

The final step involves ensuring the application runs continuously, similar to a Windows service. For achieving this, it's advisable to utilize tools like PM2 to initiate the service and maintain its functionality. We found PM2 to be fantastic and have used it in production.
