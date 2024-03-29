import Head from "next/head";
import { useAccount } from "wagmi";
// import TokenBal from "@/components/Modal/TokenBal";
// import StakedNft from "@/components/Modal/StakedNft";
// import UnstakedNft from "@/components/Modal/UnstakedNft";
import Main from "@/components/Cards/Main";
export default function Home() {
  const { address } = useAccount();

  return (
    <>
      <Head>
        <title>My staking dapp</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {address ? (
          <div>
            {/* <TokenBal />
            <StakedNft /> */}
            <Main />
          </div>
        ) : (
          <div className="flex justify-center">
            <section className="px-5 border rounded-lg my-20 shadow-lg bg-[#0000009d]">
              <h2 className="text-2xl my-10">
                Connect wallet to get started !!
              </h2>
            </section>
          </div>
        )}
      </main>
    </>
  );
}