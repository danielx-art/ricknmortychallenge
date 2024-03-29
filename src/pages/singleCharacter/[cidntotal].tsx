import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { fetchSingleCharacter } from "../../queries";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

const CharacterPage = () => {
  const router = useRouter();
  const { cidntotal } = router.query;

  const [cid, setCid] = useState<string>("");
  const [total, setTotal] = useState<number>();

  useEffect(() => {
    if (!cidntotal && !router.isReady) return;
    const [routercid, routertotal] = (cidntotal as string).split("-") as [
      string,
      string
    ];
    setCid(routercid);
    setTotal(Number(routertotal));
  }, [cidntotal, router.isReady]);

  const { data, isSuccess, refetch, isLoading, isFetching } = useQuery(
    ["singleCharacterQuery"],
    () => fetchSingleCharacter(cid),
    {
      enabled: router.isReady,
      keepPreviousData: false,
    }
  );

  useEffect(() => {
    refetch();
    console.log(data);
  }, [cid, data, refetch]);

  return (
    <div className="h-full w-full bg-rmdarkblue">
      <div className="group fixed z-10 mx-4 my-4">
        <div className="absolute left-1/2 translate-x-1/2 text-sm text-rmgreen opacity-0 transition-opacity group-hover:opacity-100">
          Mural
        </div>
        <Link href={`/`} className=" text-rmgreen">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
            />
          </svg>
        </Link>
      </div>
      {!isSuccess && (isLoading || isFetching) && (
        <div className="z-50 flex h-full w-full flex-col items-center justify-center">
          <div className="h-fit w-fit border-2 border-rmpink p-4 text-rmpink">
            Character data loading...
          </div>
        </div>
      )}
      {isSuccess && data.id && (
        <div className="flex h-full min-h-full w-full flex-col items-center justify-start overflow-auto p-4 text-white">
          <div className="h-[300px] w-[300px] rounded-md border-4 border-rmgreen shadow-md">
            <Image
              src={data.image}
              alt={data.name}
              className=""
              width={300}
              height={300}
              priority={true}
            />
          </div>
          <div className="mx-auto my-4 flex w-full flex-wrap justify-center gap-2 p-4 lg:w-1/2">
            <div className="flex-grow whitespace-nowrap rounded-md border-2 border-rmgreen p-2 shadow-md">
              <div>Name:</div>
              <div className="">{data.name}</div>
            </div>
            <div className="flex-grow whitespace-nowrap rounded-md border-2 border-rmgreen p-2 shadow-md">
              <div>Status:</div>
              <div>{data.status}</div>
            </div>
            <div className="flex-grow whitespace-nowrap rounded-md border-2 border-rmgreen p-2 shadow-md">
              <div>Species:</div>
              <div>{data.species}</div>
            </div>
            {data.type != "" && (
              <div className="flex-grow whitespace-nowrap rounded-md border-2 border-rmgreen p-2 shadow-md">
                <div>Type:</div>
                <div>{data.type}</div>
              </div>
            )}
            <div className="flex-grow whitespace-nowrap rounded-md border-2 border-rmgreen p-2 shadow-md">
              <div>Gender:</div>
              <div>{data.gender}</div>
            </div>
            <div className="flex-grow whitespace-nowrap rounded-md border-2 border-rmgreen p-2 shadow-md">
              <div>Original location:</div>
              <div>{data.origin.name}</div>
            </div>
            <div className="flex-grow whitespace-nowrap rounded-md border-2 border-rmgreen p-2 shadow-md">
              <div>Last known location:</div>
              <div>{data.location.name}</div>
            </div>
            <div className="flex-grow rounded-md border-2 border-rmgreen p-2 shadow-md">
              <div>Episodes:</div>
              <div>
                {data.episode.map((item) => item.split("/").pop()).join(", ")}
              </div>
            </div>
          </div>
          <div className="text-sm italic text-rmlightblue">
            *This list only considers episodes 1-51.
          </div>
          <div className="mt-4 flex flex-row flex-nowrap  gap-2">
            {Number(cid) > 1 && (
              <Link
                href={`/singleCharacter/${Number(cid) - 1}-${total}`}
                className=" text-rmgreen"
              >
                <div className="w-fit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"
                    />
                  </svg>
                </div>
              </Link>
            )}
            <div className="w-fit text-sm">
              {cid} of {total}
            </div>
            {total && Number(cid) < total && (
              <Link
                href={`/singleCharacter/${Number(cid) + 1}-${total}`}
                className="text-rmgreen"
              >
                <div className="w-fit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
                    />
                  </svg>
                </div>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterPage;
