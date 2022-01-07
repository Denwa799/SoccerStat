export interface TeamListState {
  teams: any[];
  loading: boolean;
  error: null | string;
}

export interface TeamListAction {
  type: string;
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

interface FetchTeamsAction {
  type: TeamsActionTypes.FETCH_TEAMS;
}

interface FetchTeamsSuccessAction {
  type: TeamsActionTypes.FETCH_TEAMS_SUCCESS;
  payload: any[];
}

interface FetchTeamsErrorAction {
  type: TeamsActionTypes.FETCH_TEAMS_ERROR;
  payload: string;
}

export type TeamsAction = FetchTeamsAction | FetchTeamsSuccessAction | FetchTeamsErrorAction;
