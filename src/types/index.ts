export interface APIResource {
  name: string;
  url: string;
}

interface MoveVersion {
  move_learn_method: APIResource;
  version_group: APIResource;
  level_learned_at: number;
}

export interface Move {
  move: APIResource;
  version_group_details: MoveVersion[];
}

export type Pokemon = {
  id: number;
  name: string;
  types: {
    type: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
  }[];
  moves: Move[];
  stats: [
    {
      base_stat: number;
      effort: 0;
      stat: {
        name: string;
        url: string;
      };
    },
  ];
};

export type Type = {
  name: string;
  url: string;
};

export type TypeNormalized = {
  id: number;
  name: string;
};

export type PokemonResponseData = {
  count: number;
  next: string;
  results: Pokemon[];
};

export type TypeResponseData = {
  count: number;
  next: string;
  results: Type[];
};

export enum LearnMethod {
  'level-up' = 'level-up',
  'machine' = 'machine',
  'egg' = 'egg',
  'tutor' = 'tutor',
}
