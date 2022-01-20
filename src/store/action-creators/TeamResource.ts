import axios from 'axios';
import { Dispatch } from 'redux';
import { TeamResourceAction, TeamActionTypes } from '../../types/Team';

export const fetchTeam = (id: number) => {
  return async (dispatch: Dispatch<TeamResourceAction>) => {
    try {
      dispatch({ type: TeamActionTypes.FETCH_TEAM });
      const response = await axios.get(
        `${process.env.REACT_APP_PROXY}${process.env.REACT_APP_TEAM_LIST}/${id}`,
        {
          headers: {
            'X-Auth-Token': `${process.env.REACT_APP_TOKEN}`,
          },
        }
      );
      dispatch({
        type: TeamActionTypes.FETCH_TEAM_SUCCESS,
        payload: response.data,
      });
    } catch (e: any) {
      if (e.response.status === 429) {
        return dispatch({
          type: TeamActionTypes.FETCH_TEAM_ERROR,
          payload: 'Превышен лимит на запросы',
        });
      } else if (e.response.status === 403) {
        return dispatch({
          type: TeamActionTypes.FETCH_TEAM_ERROR,
          payload: 'Эта команда не входит в бесплатный тариф',
        });
      } else {
        dispatch({
          type: TeamActionTypes.FETCH_TEAM_ERROR,
          payload: 'Произошла ошибка при загрузке команды' + ' / она не входит в бесплатный тариф',
        });
      }
    }
  };
};
