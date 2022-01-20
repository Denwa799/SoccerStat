export interface TeamMatchesResourceState {
  teamMatches: any;
  loading: boolean;
  error: null | string;
}

export interface TeamMatchesResourceAction {
  type: string;
  payload?: any;
}

export enum TeamMatchesActionTypes {
  // eslint-disable-next-line no-unused-vars
  FETCH_TEAM_MATCHES = 'FETCH_TEAM_MATCHES',
  // eslint-disable-next-line no-unused-vars
  FETCH_TEAM_MATCHES_SUCCESS = 'FETCH_TEAM_MATCHES_SUCCESS',
  // eslint-disable-next-line no-unused-vars
  FETCH_TEAM_MATCHES_ERROR = 'FETCH_TEAM_MATCHES_ERROR',
}

interface FetchTeamMatchesAction {
  type: TeamMatchesActionTypes.FETCH_TEAM_MATCHES;
}

interface FetchTeamMatchesSuccessAction {
  type: TeamMatchesActionTypes.FETCH_TEAM_MATCHES_SUCCESS;
  payload: any[];
}

interface FetchTeamMatchesErrorAction {
  type: TeamMatchesActionTypes.FETCH_TEAM_MATCHES_ERROR;
  payload: string;
}

export type TeamMatchesAction =
  | FetchTeamMatchesAction
  | FetchTeamMatchesSuccessAction
  | FetchTeamMatchesErrorAction;
