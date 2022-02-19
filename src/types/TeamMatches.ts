export interface TeamMatchesResourceState {
  teamMatches: {
    count?: number;
    filters?: {
      permission?: string | null;
      limit?: number | null;
    };
    matches?: Array<{
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
          shortName?: string | null;
          tla?: string | null;
          crestUrl?: string | null;
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
      referees: {
        id: number;
        name: string;
        role: string | null;
        nationality: string | null;
      }[];
    }>;
  };
  loadingTeamMatches: boolean;
  errorTeamMatches: null | string;
}

export interface TeamMatchesResourceAction {
  type: string;
  // Невозможно определить точный тип для payload, так как он обрабатывает и полученный объект, и ошибку.
  // При попытке указать payload'у типы, принадлежащие teamMatches и error происходит конфликт между ними внутри
  // reducer, так как error не может содержать объект, а teamMatches не может содержать ничего другого,
  // кроме объекта с расписанными типами содержимого.
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
  payload: Object;
}

interface FetchTeamMatchesErrorAction {
  type: TeamMatchesActionTypes.FETCH_TEAM_MATCHES_ERROR;
  payload: string;
}

export type TeamMatchesAction =
  | FetchTeamMatchesAction
  | FetchTeamMatchesSuccessAction
  | FetchTeamMatchesErrorAction;
