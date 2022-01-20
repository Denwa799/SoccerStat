export interface TeamResourceState {
  team: any;
  loading: boolean;
  error: null | string;
}

export interface TeamResourceAction {
  type: string;
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

interface FetchTeamAction {
  type: TeamActionTypes.FETCH_TEAM;
}

interface FetchTeamSuccessAction {
  type: TeamActionTypes.FETCH_TEAM_SUCCESS;
  payload: any[];
}

interface FetchTeamErrorAction {
  type: TeamActionTypes.FETCH_TEAM_ERROR;
  payload: string;
}

export type TeamAction = FetchTeamAction | FetchTeamSuccessAction | FetchTeamErrorAction;
