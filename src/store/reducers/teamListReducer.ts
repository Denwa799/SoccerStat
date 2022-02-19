import { TeamListAction, TeamListState, TeamsActionTypes } from '../../types/Teams';

const initialState: TeamListState = {
  teams: [],
  loading: false,
  error: null,
};

export const teamListReducer = (state = initialState, action: TeamListAction): TeamListState => {
  switch (action.type) {
    case TeamsActionTypes.FETCH_TEAMS:
      return { loading: true, error: null, teams: state.teams };
    case TeamsActionTypes.FETCH_TEAMS_SUCCESS:
      return { loading: false, error: null, teams: action.payload };
    case TeamsActionTypes.FETCH_TEAMS_ERROR:
      return { loading: false, error: action.payload, teams: state.teams };
    default:
      return state;
  }
};
