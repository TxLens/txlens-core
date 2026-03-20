console.log("[TxLens] Watching for transactions...");

const provider = window.ethereum;
if (provider) {
  const _request = provider.request.bind(provider);
  provider.request = async (args) => {
    if (args.method === "eth_sendTransaction" || args.method === "eth_sendRawTransaction") {
      const tx = args.params[0];
      console.log("[TxLens] 🔍 Transaction intercepted!");
      console.log("[TxLens] To:", tx.to);
      console.log("[TxLens] Data:", tx.data || "ETH transfer — no data");
      console.log("[TxLens] Value:", tx.value || "0");
    }
    return _request(args);
  };

  provider.on("message", (msg) => {
    console.log("[TxLens] Message:", msg);
  });
}