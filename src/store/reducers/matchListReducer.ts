import { MatchListAction, MatchListState, MatchesActionTypes } from '../../types/Matches';

const initialState: MatchListState = {
  matches: [],
  loading: false,
  error: null,
};

export const matchListReducer = (state = initialState, action: MatchListAction): MatchListState => {
  switch (action.type) {
    case MatchesActionTypes.FETCH_MATCHES:
      return { loading: true, error: null, matches: [] };
    case MatchesActionTypes.FETCH_MATCHES_SUCCESS:
      return { loading: false, error: null, matches: action.payload };
    case MatchesActionTypes.FETCH_MATCHES_ERROR:
      return { loading: false, error: action.payload, matches: [] };
    default:
      return state;
  }
};
