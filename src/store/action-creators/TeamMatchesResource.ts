import axios from 'axios';
import { Dispatch } from 'redux';
import { TeamMatchesResourceAction, TeamMatchesActionTypes } from '../../types/TeamMatches';

export const fetchTeamMatches = (id: number, dateFrom: string, dateTo: string) => {
  return async (dispatch: Dispatch<TeamMatchesResourceAction>) => {
    try {
      dispatch({ type: TeamMatchesActionTypes.FETCH_TEAM_MATCHES });
      const response = await axios.get(
        `${process.env.REACT_APP_PROXY}${process.env.REACT_APP_TEAM_LIST}/${id}${process.env.REACT_APP_MATCH}`,
        {
          headers: {
            'X-Auth-Token': `${process.env.REACT_APP_TOKEN}`,
          },
          params: {
            dateFrom: dateFrom,
            dateTo: dateTo,
          },
        }
      );
      dispatch({
        type: TeamMatchesActionTypes.FETCH_TEAM_MATCHES_SUCCESS,
        payload: response.data,
      });
    } catch (e: any) {
      if (e.response.status === 429) {
        return dispatch({
          type: TeamMatchesActionTypes.FETCH_TEAM_MATCHES_ERROR,
          payload: 'Превышен лимит на запросы',
        });
      } else if (e.response.status === 403) {
        return dispatch({
          type: TeamMatchesActionTypes.FETCH_TEAM_MATCHES_ERROR,
          payload: 'Список матчей этой команды не входит в бесплатный тариф',
        });
      } else {
        dispatch({
          type: TeamMatchesActionTypes.FETCH_TEAM_MATCHES_ERROR,
          payload:
            'Произошла ошибка при загрузке списка матчей команды' +
            ' / он не входит в бесплатный тариф',
        });
      }
    }
  };
};
