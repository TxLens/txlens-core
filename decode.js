const { ethers } = require("ethers");

const abi = [
  "function transfer(address to, uint256 amount)",
  "function approve(address spender, uint256 amount)",
  "function transferFrom(address from, address to, uint256 amount)"
];

const iface = new ethers.Interface(abi);

// Clean hex as a Uint8Array — bypasses any string encoding issues
const hexData = ethers.getBytes(
  "0xa9059cbb" +
  "000000000000000000000000ab5801a7d398351b8be11c439e05c5b3259aec9b" +
  "0000000000000000000000000000000000000000000000000de0b6b3a7640000"
);

try {
  const decoded = iface.decodeFunctionData("transfer", hexData);
  console.log("Function: transfer");
  console.log("To:", decoded[0]);
  console.log("Amount:", ethers.formatEther(decoded[1]), "tokens");
} catch (e) {
  console.log("Could not decode:", e.message);
}