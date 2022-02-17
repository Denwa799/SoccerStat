export interface MatchListState {
  matches: Array<{
    id: number;
    competition: {
      id: number;
      name: string;
      area: {
        name: string;
        code: string;
        ensignUrl: string | null;
      };
    };
    season: {
      id: number;
      startDate: string;
      endDate: string;
      currentMatchday: number | null;
      winner: {
        id: number;
        name: string;
        shortName: string | null;
        tla: string | null;
        crestUrl: string | null;
      } | null;
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
  loading: boolean;
  error: null | string;
}

export interface MatchListAction {
  type: string;
  // Невозможно определить точный тип для payload, так как он обрабатывает и полученный массив, и ошибку.
  // При попытке указать payload'у типы, принадлежащие matches и error происходит конфликт между ними внутри
  // reducer, так как error не может содержать массив объектов, а matches не может содержать ничего другого,
  // кроме массива объектов с расписанными типами содержимого.
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
  payload: Object[];
}

interface FetchMatchesErrorAction {
  type: MatchesActionTypes.FETCH_MATCHES_ERROR;
  payload: string;
}

export type MatchesAction =
  | FetchMatchesAction
  | FetchMatchesSuccessAction
  | FetchMatchesErrorAction;
