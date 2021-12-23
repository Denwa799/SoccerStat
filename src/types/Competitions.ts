export interface CompetitionListState {
  competitions: any[];
  loading: boolean;
  error: null | string;
}

export interface CompetitionListAction {
  type: string;
  payload?: any;
}

export enum CompetitionsActionTypes {
  // eslint-disable-next-line no-unused-vars
  FETCH_COMPETITIONS = 'FETCH_COMPETITIONS',
  // eslint-disable-next-line no-unused-vars
  FETCH_COMPETITIONS_SUCCESS = 'FETCH_COMPETITIONS_SUCCESS',
  // eslint-disable-next-line no-unused-vars
  FETCH_COMPETITIONS_ERROR = 'FETCH_COMPETITIONS_ERROR',
}

interface FetchCompetitionsAction {
  type: CompetitionsActionTypes.FETCH_COMPETITIONS;
}

interface FetchCompetitionsSuccessAction {
  type: CompetitionsActionTypes.FETCH_COMPETITIONS_SUCCESS;
  payload: any[];
}

interface FetchCompetitionsErrorAction {
  type: CompetitionsActionTypes.FETCH_COMPETITIONS_ERROR;
  payload: string;
}

export type CompetitionsAction =
  | FetchCompetitionsAction
  | FetchCompetitionsSuccessAction
  | FetchCompetitionsErrorAction;
