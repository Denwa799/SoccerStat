import {
  ICompetitionListAction,
  ICompetitionListState,
  CompetitionsActionTypes,
} from '../../types/store/Competitions';

const initialState: ICompetitionListState = {
  competitions: [],
  loading: false,
  error: null,
};

export const competitionListReducer = (
  state = initialState,
  action: ICompetitionListAction
): ICompetitionListState => {
  switch (action.type) {
    case CompetitionsActionTypes.FETCH_COMPETITIONS:
      return { loading: true, error: null, competitions: state.competitions };
    case CompetitionsActionTypes.FETCH_COMPETITIONS_SUCCESS:
      return { loading: false, error: null, competitions: action.payload };
    case CompetitionsActionTypes.FETCH_COMPETITIONS_ERROR:
      return { loading: false, error: action.payload, competitions: state.competitions };
    default:
      return state;
  }
};
