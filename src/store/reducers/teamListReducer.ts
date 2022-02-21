import { ITeamListAction, ITeamListState, TeamsActionTypes } from '../../types/store/Teams';

const initialState: ITeamListState = {
  teams: [],
  loading: false,
  error: null,
};

export const teamListReducer = (state = initialState, action: ITeamListAction): ITeamListState => {
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
