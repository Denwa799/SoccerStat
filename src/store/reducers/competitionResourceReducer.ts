import {
  ICompetitionResourceAction,
  ICompetitionResourceState,
  CompetitionActionTypes,
} from '../../types/store/Competition';

const initialState: ICompetitionResourceState = {
  competition: {},
  loading: false,
  error: null,
};

export const competitionResourceReducer = (
  state = initialState,
  action: ICompetitionResourceAction
): ICompetitionResourceState => {
  switch (action.type) {
    case CompetitionActionTypes.FETCH_COMPETITION:
      return { loading: true, error: null, competition: state.competition };
    case CompetitionActionTypes.FETCH_COMPETITION_SUCCESS:
      return { loading: false, error: null, competition: action.payload };
    case CompetitionActionTypes.FETCH_COMPETITION_ERROR:
      return { loading: false, error: action.payload, competition: state.competition };
    default:
      return state;
  }
};
