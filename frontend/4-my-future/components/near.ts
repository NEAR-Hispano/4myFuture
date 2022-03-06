import { keyStores, connect, WalletConnection, utils } from "near-api-js";
import { getConfig } from '../config';
import * as nearAPI from 'near-api-js';

// Initializing contract
export const initContract = async () => {


  // create a keyStore for signing transactions using the user's key
  // which is located in the browser local storage after user logs in
  const nearConfig = getConfig(process.env.NEAR_ENV || 'testnet');
  const keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore();

  // Initializing connection to the NEAR testnet
  const near = await nearAPI.connect({
    keyStore, ...nearConfig,
    headers: {}
  });


  // Initialize wallet connection
  const walletConnection = new nearAPI.WalletConnection(near, null);

  // Load in user's account data
  let currentUser;
  if (walletConnection.getAccountId()) {
    currentUser = {
      // Gets the accountId as a string
      accountId: walletConnection.getAccountId(),
      // Gets the user's token balance
      balance: (await walletConnection.account().state()).amount,
    };
  }

  // Initializing our contract APIs by contract name and configuration
  const contract = await new nearAPI.Contract(
    // User's accountId as a string
    walletConnection.account(),
    // accountId of the contract we will be loading
    // NOTE: All contracts on NEAR are deployed to an account and
    // accounts can only have one contract deployed to them.
    nearConfig.contractName,
    {
      // View methods are read-only – they don't modify the state, but usually return some value
      viewMethods: ['getAllProposals', 'getProposal', 'getAllUsers', 'getAllPayments', 'getUser', 'getAllContributions', 'getTime'],
      // Change methods can modify the state, but you don't receive the returned value when called
      changeMethods: ['createUser', 'createNewProposal', 'createContribution','fund', 'login'],
      // Sender is the account ID to initialize transactions.
      // getAccountId() will return empty string if user is still unauthorized
      // @ts-ignore: Unreachable code error
      sender: walletConnection.getAccountId(),
    }
  );

  return (
    {
      contract, nearConfig, walletConnection
    }
  );
}