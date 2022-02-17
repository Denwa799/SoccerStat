export interface MatchResourceState {
  match: {
    head2head?: {
      numberOfMatches: number | null;
      totalGoals: number | null;
      homeTeam: {
        id: number;
        name: string;
        wins: number | null;
        draws: number | null;
        losses: number | null;
      };
      awayTeam: {
        id: number;
        name: string;
        wins: number | null;
        draws: number | null;
        losses: number | null;
      };
    };
    match?: {
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
      venue: string | null;
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
    };
  };
  loading: boolean;
  error: null | string;
}

export interface MatchResourceAction {
  type: string;
  // Невозможно определить точный тип для payload, так как он обрабатывает и полученный объект, и ошибку.
  // При попытке указать payload'у типы, принадлежащие competition и error происходит конфликт между ними внутри
  // reducer, так как error не может содержать объект, а competition не может содержать ничего другого,
  // кроме объекта с расписанными типами содержимого.
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
  payload: Object;
}

interface FetchMatchErrorAction {
  type: MatchActionTypes.FETCH_MATCH_ERROR;
  payload: string;
}

export type MatchAction = FetchMatchAction | FetchMatchSuccessAction | FetchMatchErrorAction;
