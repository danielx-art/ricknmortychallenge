import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { fetchSingleCharacter } from "../../queries";
import Image from "next/image";

const CharacterPage = () => {
  const router = useRouter();
  const { cid } = router.query;

  const { data, isSuccess } = useQuery(
    ["singleCharacterQuery"],
    () => fetchSingleCharacter(cid as string),
    {
      enabled: router.isReady,
    }
  );

  return (
    <>
      {isSuccess && (
        <div className="flex h-full w-full flex-col items-center p-4">
          <Image
            src={data.image}
            alt={data.name}
            className="h-[300px] w-[300px]"
            width={300}
            height={300}
            priority={true}
          />
          <div className="mx-auto my-4 flex w-fit max-w-full border-2 border-red-500">
            <div className="whitespace-nowrap rounded-md border-2 border-slate-400 p-2">
              <div>Name:</div>
              <div className="">{data.name}</div>
            </div>
            <div className="whitespace-nowrap rounded-md border-2 border-slate-400 p-2">
              <div>Status:</div>
              <div>{data.status}</div>
            </div>
            <div className="whitespace-nowrap rounded-md border-2 border-slate-400 p-2">
              <div>Species:</div>
              <div>{data.species}</div>
            </div>
            {data.type != "" && (
              <div className="whitespace-nowrap rounded-md border-2 border-slate-400 p-2">
                <div>Type:</div>
                <div>{data.type}</div>
              </div>
            )}
            <div className="whitespace-nowrap rounded-md border-2 border-slate-400 p-2">
              <div>Gender:</div>
              <div>{data.gender}</div>
            </div>
            <div className="whitespace-nowrap rounded-md border-2 border-slate-400 p-2">
              <div>Original location:</div>
              <div>{data.origin.name}</div>
            </div>
            <div className="whitespace-nowrap rounded-md border-2 border-slate-400 p-2">
              <div>Last known location:</div>
              <div>{data.location.name}</div>
            </div>
            <div className="rounded-md border-2 border-slate-400 p-2">
              <div>Episodes:</div>
              <div>
                {data.episode.map((item) => item.split("/").pop()).join(", ")}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CharacterPage;
