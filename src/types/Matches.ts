export interface MatchListState {
  matches: any[];
  loading: boolean;
  error: null | string;
}

export interface MatchListAction {
  type: string;
  payload?: any;
}

export enum MatchesActionTypes {
  // eslint-disable-next-line no-unused-vars
  FETCH_MATCHES = 'FETCH_MATCHES',
  // eslint-disable-next-line no-unused-vars
  FETCH_MATCHES_SUCCESS = 'FETCH_MATCHES_SUCCESS',
  // eslint-disable-next-line no-unused-vars
  FETCH_MATCHES_ERROR = 'FETCH_MATCHES_ERROR',
}

interface FetchMatchesAction {
  type: MatchesActionTypes.FETCH_MATCHES;
}

interface FetchMatchesSuccessAction {
  type: MatchesActionTypes.FETCH_MATCHES_SUCCESS;
  payload: any[];
}

interface FetchMatchesErrorAction {
  type: MatchesActionTypes.FETCH_MATCHES_ERROR;
  payload: string;
}

export type MatchesAction =
  | FetchMatchesAction
  | FetchMatchesSuccessAction
  | FetchMatchesErrorAction;
