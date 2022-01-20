export interface MatchResourceState {
  match: any;
  loading: boolean;
  error: null | string;
}

export interface MatchResourceAction {
  type: string;
  payload?: any;
}

export enum MatchActionTypes {
  // eslint-disable-next-line no-unused-vars
  FETCH_MATCH = 'FETCH_MATCH',
  // eslint-disable-next-line no-unused-vars
  FETCH_MATCH_SUCCESS = 'FETCH_MATCH_SUCCESS',
  // eslint-disable-next-line no-unused-vars
  FETCH_MATCH_ERROR = 'FETCH_MATCH_ERROR',
}

interface FetchMatchAction {
  type: MatchActionTypes.FETCH_MATCH;
}

interface FetchMatchSuccessAction {
  type: MatchActionTypes.FETCH_MATCH_SUCCESS;
  payload: any[];
}

interface FetchMatchErrorAction {
  type: MatchActionTypes.FETCH_MATCH_ERROR;
  payload: string;
}

export type MatchAction = FetchMatchAction | FetchMatchSuccessAction | FetchMatchErrorAction;
