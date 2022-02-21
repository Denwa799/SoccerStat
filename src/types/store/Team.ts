export interface ITeamResourceState {
  team: {
    id?: number;
    area?: {
      id: number;
      name: string;
    };
    activeCompetitions?: {
      id: number;
      area: {
        id: number;
        name: string;
      };
      name: string;
      code: string;
      plan: string | null;
      lastUpdated: string;
    }[];
    name?: string;
    shortName?: string | null;
    tla?: string;
    crestUrl?: string | null;
    address?: string | null;
    phone?: string | null;
    website?: string | null;
    email?: string | null;
    founded?: number | null;
    clubColors?: string | null;
    venue?: string | null;
    squad?: {
      id: number;
      name: string;
      position: string | null;
      dateOfBirth: string | null;
      countryOfBirth: string | null;
      nationality: string | null;
      shirtNumber: number | null;
      role: string | null;
    }[];
    lastUpdated?: string;
  };
  loadingTeam: boolean;
  errorTeam: null | string;
}

export interface ITeamResourceAction {
  type: string;
  // Невозможно определить точный тип для payload, так как он обрабатывает и полученный объект, и ошибку.
  // При попытке указать payload'у типы, принадлежащие team и error происходит конфликт между ними внутри
  // reducer, так как error не может содержать объект, а team не может содержать ничего другого,
  // кроме объекта с расписанными типами содержимого.
  payload?: any;
}

export enum TeamActionTypes {
  // eslint-disable-next-line no-unused-vars
  FETCH_TEAM = 'FETCH_TEAM',
  // eslint-disable-next-line no-unused-vars
  FETCH_TEAM_SUCCESS = 'FETCH_TEAM_SUCCESS',
  // eslint-disable-next-line no-unused-vars
  FETCH_TEAM_ERROR = 'FETCH_TEAM_ERROR',
}

interface IFetchTeamAction {
  type: TeamActionTypes.FETCH_TEAM;
}

interface IFetchTeamSuccessAction {
  type: TeamActionTypes.FETCH_TEAM_SUCCESS;
  payload: Object;
}

interface IFetchTeamErrorAction {
  type: TeamActionTypes.FETCH_TEAM_ERROR;
  payload: string;
}

export type TeamAction = IFetchTeamAction | IFetchTeamSuccessAction | IFetchTeamErrorAction;
