import {
  ITeamMatchesResourceAction,
  ITeamMatchesResourceState,
  TeamMatchesActionTypes,
} from '../../types/store/TeamMatches';

const initialState: ITeamMatchesResourceState = {
  teamMatches: {},
  loadingTeamMatches: false,
  errorTeamMatches: null,
};

export const teamMatchesResourceReducer = (
  state = initialState,
  action: ITeamMatchesResourceAction
): ITeamMatchesResourceState => {
  switch (action.type) {
    case TeamMatchesActionTypes.FETCH_TEAM_MATCHES:
      return { loadingTeamMatches: true, errorTeamMatches: null, teamMatches: state.teamMatches };
    case TeamMatchesActionTypes.FETCH_TEAM_MATCHES_SUCCESS:
      return { loadingTeamMatches: false, errorTeamMatches: null, teamMatches: action.payload };
    case TeamMatchesActionTypes.FETCH_TEAM_MATCHES_ERROR:
      return {
        loadingTeamMatches: false,
        errorTeamMatches: action.payload,
        teamMatches: state.teamMatches,
      };
    default:
      return state;
  }
};
