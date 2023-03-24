require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const ALCHEMY_HTTP_URL =
  "https://polygon-mumbai.g.alchemy.com/v2/9McXtaYKbr8Y3SyMb3Be_rgZwREq4r3J";
const PRIVATE_KEY =
  "77a50a599608427a9c750247d2124e2e8df722824fc789433e751e9937d23926";
const POLYGON_SCAN_KEY = "SU9TRVHIPSHE8WQHD2X5X879W7TMD9D44W";

module.exports = {
  solidity: "0.8.18",
  networks: {
    mumbai: {
      url: ALCHEMY_HTTP_URL,
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      polygonMumbai: POLYGON_SCAN_KEY,
    },
  },
};
