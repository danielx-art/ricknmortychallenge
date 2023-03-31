import Head from "next/head";
import CharactersMural from "../components/CharactersMural";

export default function Home() {
  return (
    <>
      <Head>
        <title>Rick And Morty Api Challenge</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CharactersMural />
    </>
  );
}
