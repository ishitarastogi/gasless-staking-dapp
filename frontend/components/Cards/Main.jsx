import React, { useEffect, useState } from "react";

import { useAccount, useSigner } from "wagmi";
import { ChainId } from "@biconomy/core-types";
import SmartAccount from "@biconomy/smart-account";
 import UnstakedNft from "../Modal/UnStakedNFT";
 import StakedNft from "../Modal/StakedNft";

const Main = () => {
  const { data: signer } = useSigner();
  const { address } = useAccount();
  const [smartAccount, setSmartAccount] = useState(null);
  const [scwAddress, setScwAddress] = useState("");
  const [scwLoading, setScwLoading] = useState(false);
  const activeChainId = ChainId.POLYGON_MUMBAI;

  useEffect(() => {
if(signer){
    async function setupSmartAccount() {
      setScwAddress("");
      setScwLoading(true);

      const smartAccount = new SmartAccount(signer.provider, {
        activeNetworkId: activeChainId,
        supportedNetworksIds: [activeChainId],
        networkConfig: [
          {
            chainId: activeChainId,
            dappAPIKey: "59fRCMXvk.8a1652f0-b522-4ea7-b296-98628499aee3", // Get one from Paymaster Dashboard
            // customPaymasterAPI: <IPaymaster Instance of your own Paymaster>
          },
        ],
      });
      console.log("wallet", smartAccount);

      const smartAccountss = await smartAccount.init();
      console.info("smartAccount", smartAccountss);
      setScwAddress(smartAccount.address);
      setSmartAccount(smartAccount);
      setScwLoading(false);
    }
  if (!!signer.provider && !!address) {
    setupSmartAccount();
    }}
  }, [address]);

  return (
    <div>
      {scwLoading && <h2>Loading Smart Account...</h2>}
      {scwAddress && console.log(scwAddress)}
          <StakedNft smartAccount={smartAccount} />
      <UnstakedNft smartAccount={smartAccount} />
  
    </div>
  );
};

export default Main;
