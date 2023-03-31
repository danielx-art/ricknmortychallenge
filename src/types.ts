export type Info = {
  count: number;
  pages: number;
  next: string;
  prev: null;
};

export const possibleStatus = ["Alive", "Dead", "unknown"] as const;

export type Status = (typeof possibleStatus)[number];

export const possibleSpecies = [
  "Human",
  "Alien",
  "Humanoid",
  "Poopybutthole",
  "Mythological",
  "Unknown",
  "Animal",
  "Disease",
  "Robot",
  "Cronenberg",
  "Planet",
] as const;

export type Species = (typeof possibleSpecies)[number];

export type Gender = "Female" | "Male" | "Genderless" | "unknown";

export type Character = {
  id: number;
  name: string;
  status: Status;
  species: Species;
  type: string;
  gender: Gender;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: Date;
};

export type Episode = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: Date;
};

export type Location = {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: Date;
};

export type CharactersResponse = {
  info: Info;
  results: Character[];
};
