import {
  CompetitionResourceAction,
  CompetitionResourceState,
  CompetitionActionTypes,
} from '../../types/Competition';

const initialState: CompetitionResourceState = {
  competition: {},
  loading: false,
  error: null,
};

export const competitionResourceReducer = (
  state = initialState,
  action: CompetitionResourceAction
): CompetitionResourceState => {
  switch (action.type) {
    case CompetitionActionTypes.FETCH_COMPETITION:
      return { loading: true, error: null, competition: {} };
    case CompetitionActionTypes.FETCH_COMPETITION_SUCCESS:
      return { loading: false, error: null, competition: action.payload };
    case CompetitionActionTypes.FETCH_COMPETITION_ERROR:
      return { loading: false, error: action.payload, competition: {} };
    default:
      return state;
  }
};
