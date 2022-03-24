const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const { mnemonic, BSCSCANAPIKEY} = require('./env.json');
const web3 = require("web3")
// const mnemonic = fs.readFileSync(".secret").toString().trim();
const devPrivKeys =  
  [
    '0x953dbe85f02d84377f90a6eb6d8a6dd128aa50f69c4671d32414b139040be24b',
    '0xa568b36fca21714f879e3cf157f021a4c5dccd6229ef6e6eee7fb7888193c026',
    '0xc484de1ef84e998869d59752d1f09bffa161673d54250ea152ec82d684e2f154',
    '0x4d5211ccb78c977d7ae7094b27b561458274a1c2df8be5f3c66479fe33ea8838',
    '0x3c6efff45290e2204cc19b091cdefffcead5757b074b1723e9cf8973e6337ba4',
    '0x81f43b0303746bfacbaae64947850e86deca412d3b39b1f8d3c89bf483d615f3',
    '0xeca0930606860b8ae4a7f2b9a56ee62c4e11f613a894810b7642cabef689cf09',
    '0x68ef711b398fa47f22fbc44a972efbd2c2e25338e7c6afb92dc84b569bf784a5',
  ];

module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */

  networks: {
    development: {
      provider: () => new HDWalletProvider({
        privateKeys: devPrivKeys,
        providerOrUrl: process.env.BSC_PROVIDER || "http://localhost:8555",
      }),
      network_id: "*",       // Any network (default: none)
    },
    testnet: {
      provider: () => new HDWalletProvider(mnemonic, `https://data-seed-prebsc-1-s1.binance.org:8545`),
      network_id: 97,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    mainnet: {
      provider: () => new HDWalletProvider(mnemonic, `wss://bsc-ws-node.nariox.org:443`),
      network_id: 56,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true,
      gas: 10000000,
      gasPrice: 10 * 1e9,
      timeoutBlocks: 1,
      confirmations: 0
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.3",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  },
  plugins: [
    'truffle-contract-size'
  ]

  // Truffle DB is currently disabled by default; to enable it, change enabled:
  // false to enabled: true. The default storage location can also be
  // overridden by specifying the adapter settings, as shown in the commented code below.
  //
  // NOTE: It is not possible to migrate your contracts to truffle DB and you should
  // make a backup of your artifacts to a safe location before enabling this feature.
  //
  // After you backed up your artifacts you can utilize db by running migrate as follows: 
  // $ truffle migrate --reset --compile-all
  //
  // db: {
    // enabled: false,
    // host: "127.0.0.1",
    // adapter: {
    //   name: "sqlite",
    //   settings: {
    //     directory: ".db"
    //   }
    // }
  // }
};
