import { MatchResourceAction, MatchResourceState, MatchActionTypes } from '../../types/Match';

const initialState: MatchResourceState = {
  match: {},
  loading: false,
  error: null,
};

export const matchResourceReducer = (
  state = initialState,
  action: MatchResourceAction
): MatchResourceState => {
  switch (action.type) {
    case MatchActionTypes.FETCH_MATCH:
      return { loading: true, error: null, match: state.match };
    case MatchActionTypes.FETCH_MATCH_SUCCESS:
      return { loading: false, error: null, match: action.payload };
    case MatchActionTypes.FETCH_MATCH_ERROR:
      return { loading: false, error: action.payload, match: state.match };
    default:
      return state;
  }
};
