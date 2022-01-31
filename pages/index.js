import Head from 'next/head'
import Sidebar from '../components/Sidebar'
import Feed from '../components/Feed'
import { getProviders, getSession, useSession } from "next-auth/react";
import Login from './auth/Login'
import Modal from '../components/Modal'
import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/modalAtom'
import Widget from '../components/Widget'

export default function Home({ trendingResults, followResults, providers }) {
  const { data: session } = useSession();
  const [isOpen,setIsOpen]=useRecoilState(modalState);

  if (!session) return <Login provide={providers} />;

  return (
    <div className="">
      <Head>
        <title>Home / Twitter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className=" min-h-screen flex max-w-[1500px] mx-auto">
        <Sidebar />
        <Feed />
        <Widget trendingResults={trendingResults}
           followResults={followResults} />
        {isOpen &&<Modal/>}

      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const trendingResults = await fetch("https://jsonkeeper.com/b/NKEV").then(
    (res) => res.json()
  );
  const followResults = await fetch("https://jsonkeeper.com/b/WWMJ").then(
    (res) => res.json()
  );
  const providers = await getProviders();
  //const session = await getSession(context);

  return {
    props: {
      trendingResults,
      followResults,
      providers,
    // session,
    },
  };
}
