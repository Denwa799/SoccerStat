export interface ITeamListState {
  teams: Array<{
    id: number;
    area: {
      id: number;
      name: string;
    };
    name: string;
    shortName: string | null;
    tla: string;
    crestUrl: string | null;
    address: string | null;
    phone: string | null;
    website: string | null;
    email: string | null;
    founded: number | null;
    clubColors: string | null;
    venue: string | null;
    lastUpdated: string;
  }>;
  loading: boolean;
  error: null | string;
}

export interface ITeamListAction {
  type: string;
  // Невозможно определить точный тип для payload, так как он обрабатывает и полученный массив, и ошибку.
  // При попытке указать payload'у типы, принадлежащие teams и error происходит конфликт между ними внутри
  // reducer, так как error не может содержать массив объектов, а teams не может содержать ничего другого,
  // кроме массива объектов с расписанными типами содержимого.
  payload?: any;
}

export enum TeamsActionTypes {
  // eslint-disable-next-line no-unused-vars
  FETCH_TEAMS = 'FETCH_TEAMS',
  // eslint-disable-next-line no-unused-vars
  FETCH_TEAMS_SUCCESS = 'FETCH_TEAMS_SUCCESS',
  // eslint-disable-next-line no-unused-vars
  FETCH_TEAMS_ERROR = 'FETCH_TEAMS_ERROR',
}

interface IFetchTeamsAction {
  type: TeamsActionTypes.FETCH_TEAMS;
}

interface IFetchTeamsSuccessAction {
  type: TeamsActionTypes.FETCH_TEAMS_SUCCESS;
  payload: Object[];
}

interface IFetchTeamsErrorAction {
  type: TeamsActionTypes.FETCH_TEAMS_ERROR;
  payload: string;
}

export type TeamsAction = IFetchTeamsAction | IFetchTeamsSuccessAction | IFetchTeamsErrorAction;
