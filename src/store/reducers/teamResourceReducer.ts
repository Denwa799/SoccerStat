import { ITeamResourceAction, ITeamResourceState, TeamActionTypes } from '../../types/store/Team';

const initialState: ITeamResourceState = {
  team: {},
  loadingTeam: false,
  errorTeam: null,
};

export const teamResourceReducer = (
  state = initialState,
  action: ITeamResourceAction
): ITeamResourceState => {
  switch (action.type) {
    case TeamActionTypes.FETCH_TEAM:
      return { loadingTeam: true, errorTeam: null, team: state.team };
    case TeamActionTypes.FETCH_TEAM_SUCCESS:
      return { loadingTeam: false, errorTeam: null, team: action.payload };
    case TeamActionTypes.FETCH_TEAM_ERROR:
      return { loadingTeam: false, errorTeam: action.payload, team: state.team };
    default:
      return state;
  }
};
