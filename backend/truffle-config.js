const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();
const { INFURA_API_KEY, MNEMONIC } = process.env;
module.exports = {
  networks: {
    goerli: {
      network_id: 5,
      gasPrice: 100000000000,
      provider: new HDWalletProvider(MNEMONIC, INFURA_API_KEY)
    }
  },
  mocha: {},
  compilers: {
    solc: {
      version: "0.8.15"
    }
  }
};



// require('dotenv').config();
// const HDWalletProvider = require('@truffle/hdwallet-provider');
// const { INFURA_API_KEY, MNEMONIC } = process.env;

// module.exports = {
//   networks: {
//     development: {
//       host: "127.0.0.1",
//       port: 8545,
//       network_id: "*"
//     },
//     goerli: {
//       provider: () => new HDWalletProvider(MNEMONIC, INFURA_API_KEY),
//       network_id: '5',
//       gas: 4465030
//     }
//   }
// };