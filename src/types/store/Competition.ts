export interface ICompetitionResourceState {
  competition: {
    count?: number;
    filters?: {};
    competition?: {
      id: number;
      area: {
        id: number;
        name: string;
      };
      name: string;
      code: string;
      plan: string | null;
      lastUpdated: string;
    };
    matches?: Array<{
      id: number;
      season: {
        id: number;
        startDate: string;
        endDate: string;
        currentMatchday: number | null;
      };
      utcDate: string;
      status: string;
      matchday: number | null;
      stage: string | null;
      group: string | null;
      lastUpdated: string;
      odds: {
        msg: string | null;
      };
      score: {
        winner: string | null;
        duration: string | null;
        fullTime: {
          homeTeam: number | null;
          awayTeam: number | null;
        };
        halfTime: {
          homeTeam: number | null;
          awayTeam: number | null;
        };
        extraTime: {
          homeTeam: number | null;
          awayTeam: number | null;
        };
        penalties: {
          homeTeam: number | null;
          awayTeam: number | null;
        };
      };
      homeTeam: {
        id: number;
        name: string;
      };
      awayTeam: {
        id: number;
        name: string;
      };
      referees: [];
    }>;
  };
  loading: boolean;
  error: null | string;
}

export interface ICompetitionResourceAction {
  type: string;
  // Невозможно определить точный тип для payload, так как он обрабатывает и полученный объект, и ошибку.
  // При попытке указать payload'у типы, принадлежащие competition и error происходит конфликт между ними внутри
  // reducer, так как error не может содержать объект, а competition не может содержать ничего другого,
  // кроме объекта с расписанными типами содержимого.
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

interface IFetchCompetitionAction {
  type: CompetitionActionTypes.FETCH_COMPETITION;
}

interface IFetchCompetitionSuccessAction {
  type: CompetitionActionTypes.FETCH_COMPETITION_SUCCESS;
  payload: Object;
}

interface IFetchCompetitionErrorAction {
  type: CompetitionActionTypes.FETCH_COMPETITION_ERROR;
  payload: string;
}

export type CompetitionAction =
  | IFetchCompetitionAction
  | IFetchCompetitionSuccessAction
  | IFetchCompetitionErrorAction;
