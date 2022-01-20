import { TeamResourceAction, TeamResourceState, TeamActionTypes } from '../../types/Team';

const initialState: TeamResourceState = {
  team: {},
  loading: false,
  error: null,
};

export const teamResourceReducer = (
  state = initialState,
  action: TeamResourceAction
): TeamResourceState => {
  switch (action.type) {
    case TeamActionTypes.FETCH_TEAM:
      return { loading: true, error: null, team: {} };
    case TeamActionTypes.FETCH_TEAM_SUCCESS:
      return { loading: false, error: null, team: action.payload };
    case TeamActionTypes.FETCH_TEAM_ERROR:
      return { loading: false, error: action.payload, team: {} };
    default:
      return state;
  }
};
