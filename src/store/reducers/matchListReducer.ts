import { IMatchListAction, IMatchListState, MatchesActionTypes } from '../../types/store/Matches';

const initialState: IMatchListState = {
  matches: [],
  loading: false,
  error: null,
};

export const matchListReducer = (
  state = initialState,
  action: IMatchListAction
): IMatchListState => {
  switch (action.type) {
    case MatchesActionTypes.FETCH_MATCHES:
      return { loading: true, error: null, matches: state.matches };
    case MatchesActionTypes.FETCH_MATCHES_SUCCESS:
      return { loading: false, error: null, matches: action.payload };
    case MatchesActionTypes.FETCH_MATCHES_ERROR:
      return { loading: false, error: action.payload, matches: state.matches };
    default:
      return state;
  }
};
