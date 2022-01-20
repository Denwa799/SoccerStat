import {
  TeamMatchesResourceAction,
  TeamMatchesResourceState,
  TeamMatchesActionTypes,
} from '../../types/TeamMatches';

const initialState: TeamMatchesResourceState = {
  teamMatches: {},
  loading: false,
  error: null,
};

export const teamMatchesResourceReducer = (
  state = initialState,
  action: TeamMatchesResourceAction
): TeamMatchesResourceState => {
  switch (action.type) {
    case TeamMatchesActionTypes.FETCH_TEAM_MATCHES:
      return { loading: true, error: null, teamMatches: {} };
    case TeamMatchesActionTypes.FETCH_TEAM_MATCHES_SUCCESS:
      return { loading: false, error: null, teamMatches: action.payload };
    case TeamMatchesActionTypes.FETCH_TEAM_MATCHES_ERROR:
      return { loading: false, error: action.payload, teamMatches: {} };
    default:
      return state;
  }
};
