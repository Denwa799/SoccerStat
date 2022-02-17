export interface CompetitionListState {
  competitions: Array<{
    id: number;
    area: {
      id: number;
      name: string;
      countryCode: string;
      ensignUrl: string | null;
    };
    name: string;
    code: string;
    emblemUrl: string | null;
    plan: string | null;
    currentSeason: {
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
      numberOfAvailableSeasons: number | null;
      lastUpdated: string;
    };
  }>;
  loading: boolean;
  error: null | string;
}

export interface CompetitionListAction {
  type: string;
  // Невозможно определить четкий тип для payload, так как он обрабатывает и полученный массив, и ошибку.
  // При попытке указать payload'у типы, принадлежащие competitions и error происходит конфликт между ними внутри
  // reducer, так как error не может содержать массив объектов, а competitions не может содержать ничего другого,
  // кроме массива объектов с расписанными типами содержимого.
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
  payload: Object[];
}

interface FetchCompetitionsErrorAction {
  type: CompetitionsActionTypes.FETCH_COMPETITIONS_ERROR;
  payload: string;
}

export type CompetitionsAction =
  | FetchCompetitionsAction
  | FetchCompetitionsSuccessAction
  | FetchCompetitionsErrorAction;
