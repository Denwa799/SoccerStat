export interface CompetitionResourceState {
  competition: any;
  loading: boolean;
  error: null | string;
}

export interface CompetitionResourceAction {
  type: string;
  payload?: any;
}

export enum CompetitionActionTypes {
  // eslint-disable-next-line no-unused-vars
  FETCH_COMPETITION = 'FETCH_COMPETITION',
  // eslint-disable-next-line no-unused-vars
  FETCH_COMPETITION_SUCCESS = 'FETCH_COMPETITION_SUCCESS',
  // eslint-disable-next-line no-unused-vars
  FETCH_COMPETITION_ERROR = 'FETCH_COMPETITION_ERROR',
}

interface FetchCompetitionAction {
  type: CompetitionActionTypes.FETCH_COMPETITION;
}

interface FetchCompetitionSuccessAction {
  type: CompetitionActionTypes.FETCH_COMPETITION_SUCCESS;
  payload: any[];
}

interface FetchCompetitionErrorAction {
  type: CompetitionActionTypes.FETCH_COMPETITION_ERROR;
  payload: string;
}

export type CompetitionAction =
  | FetchCompetitionAction
  | FetchCompetitionSuccessAction
  | FetchCompetitionErrorAction;
