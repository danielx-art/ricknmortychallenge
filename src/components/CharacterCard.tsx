import Link from "next/link";
import Image from "next/image";
import type { Character } from "../types";

interface Props {
  character: Character;
}

const CharactersCard: React.FC<Props> = (props) => {
  const { character } = props;
  const episode = character.episode[0]?.split("/").slice(-2).join(" ");

  return (
    <Link className="episode_Card" href={`/singleCharacter/${character.id}`}>
      <Image
        src={character.image}
        alt={character.name}
        className=""
        width={100}
        height={100}
      />
      <h3>{character.name}</h3>
      <h3>{character.gender}</h3>
      <h3>{episode}</h3>
    </Link>
  );
};

export default CharactersCard;
