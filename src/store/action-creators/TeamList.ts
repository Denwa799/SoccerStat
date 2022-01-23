import { Dispatch } from 'redux';
import axios from 'axios';
import { TeamsActionTypes, TeamListAction } from '../../types/Teams';

export const fetchTeams = () => {
  return async (dispatch: Dispatch<TeamListAction>) => {
    try {
      dispatch({ type: TeamsActionTypes.FETCH_TEAMS });
      const response = await axios.get(`${process.env.REACT_APP_TEAM_LIST}`, {
        headers: {
          'X-Auth-Token': `${process.env.REACT_APP_TOKEN}`,
        },
      });
      dispatch({
        type: TeamsActionTypes.FETCH_TEAMS_SUCCESS,
        payload: response.data.teams,
      });
    } catch (e: any) {
      if (e.response.status === 429) {
        return dispatch({
          type: TeamsActionTypes.FETCH_TEAMS_ERROR,
          payload: 'Превышен лимит на запросы',
        });
      } else if (e.response.status === 403) {
        return dispatch({
          type: TeamsActionTypes.FETCH_TEAMS_ERROR,
          payload: 'Список команд не входит в бесплатный тариф',
        });
      } else {
        dispatch({
          type: TeamsActionTypes.FETCH_TEAMS_ERROR,
          payload: 'Произошла ошибка при загрузке' + ' списка команд',
        });
      }
    }
  };
};
