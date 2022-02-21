import axios from 'axios';
import { Dispatch } from 'redux';
import { ITeamMatchesResourceAction, TeamMatchesActionTypes } from '../../types/store/TeamMatches';
import { errorResponseHandler } from '../../utils/errorResponseHandler';

export const fetchTeamMatches = (id: string | undefined, dateFrom: string, dateTo: string) => {
  return async (dispatch: Dispatch<ITeamMatchesResourceAction>) => {
    try {
      dispatch({ type: TeamMatchesActionTypes.FETCH_TEAM_MATCHES });
      const response = await axios.get(
        `${process.env.REACT_APP_TEAM_LIST}/${id}${process.env.REACT_APP_MATCH}`,
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
      // Невозможно дать конкретный тип ошибке

      const type = TeamMatchesActionTypes.FETCH_TEAM_MATCHES_ERROR;
      const errorText403 = 'Список матчей этой команды не входит в бесплатный тариф';
      const otherErrorText =
        'Произошла ошибка при загрузке списка матчей команды / он не входит в бесплатный тариф';

      errorResponseHandler(e.response.status, dispatch, type, errorText403, otherErrorText);
    }
  };
};
