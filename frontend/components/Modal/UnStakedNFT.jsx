import React, { useEffect, useState } from "react";
import NFTAbi from "@/ABIs/BuidlNFT.json";
import StakingAbi from "@/ABIs/Staking.json";

import NFTCard from "../Cards/NFTCard";
import { useContract, useSigner } from "wagmi";

const UnstakedNft = ({ smartAccount }) => {
  const { data: signer } = useSigner();
  const [nfts, setNfts] = useState([]);
  console.log("UNSTAKED", smartAccount?.address);
  const nftContract = useContract({
    address: NFTAbi.address,
    abi: NFTAbi.abi,
    signerOrProvider: signer,
  });


 
  async function getNfts() {
    if (smartAccount?.address) {
      const getNFTs = async () => {
        try {
          const tx1 = await nftContract?.balanceOf(smartAccount?.address);
          console.log(tx1);
          const index = tx1.toNumber();
          console.log(index);
          const txss = await nftContract?.tokenOfOwnerByIndex(
            smartAccount?.address,
            0
          );
          console.log("txss", txss);
          for (let i = 0; i < index; i++) {
            const tx = await nftContract?.tokenOfOwnerByIndex(
              smartAccount?.address,
              i
            );
            console.log(tx);
            const tx2 = await nftContract?.tokenURI(tx.toNumber());
            console.log(tx2);

            setNfts([{ tokenId: tx.toNumber(), url: tx2 }]);
          }
          console.log(nfts);
        } catch (err) {
          console.log(err);
        }
      };
      getNFTs();
    }
  }

  return (
    <div className="flex flex-col mx-auto text-center">
      <button onClick={getNfts}>See Your NFTS</button>

      {nfts && console.log(nfts)}
      <h2 className="text-2xl">Your NFTs</h2>
      <div className="flex mx-auto my-7">
        {nfts.map((nft, id) => (
          <NFTCard
            key={id}
            url={nft.url}
            stake={true}
            tokenId={nft.tokenId}
            address={smartAccount}
          />
        ))}
      </div>
    </div>
  );
};

export default UnstakedNft;
