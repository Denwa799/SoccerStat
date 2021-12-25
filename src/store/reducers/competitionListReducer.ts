import {
  CompetitionListAction,
  CompetitionListState,
  CompetitionsActionTypes,
} from '../../types/Competitions';

const initialState: CompetitionListState = {
  competitions: [],
  loading: false,
  error: null,
};

export const competitionListReducer = (
  state = initialState,
  action: CompetitionListAction
): CompetitionListState => {
  switch (action.type) {
    case CompetitionsActionTypes.FETCH_COMPETITIONS:
      return { loading: true, error: null, competitions: [] };
    case CompetitionsActionTypes.FETCH_COMPETITIONS_SUCCESS:
      return { loading: false, error: null, competitions: action.payload };
    case CompetitionsActionTypes.FETCH_COMPETITIONS_ERROR:
      return { loading: false, error: action.payload, competitions: [] };
    default:
      return state;
  }
};
