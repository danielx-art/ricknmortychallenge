import { useRouter } from "next/router";

const CharacterPage = () => {
  const router = useRouter();
  const { cid } = router.query;

  return <p>Character Id: {cid}</p>;
};

export default CharacterPage;
