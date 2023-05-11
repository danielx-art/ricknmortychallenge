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
        className="w-full"
        width={100}
        height={100}
        priority={true}
      />
      <div className="absolute z-10 w-full -translate-y-full bg-black bg-opacity-50 p-1 font-bold text-white">
        <div className="text-sm">{character.name}</div>
        <div className="text-xs">{character.species}</div>
      </div>
    </Link>
  );
};

export default CharactersCard;
