import axios from 'axios';
import { Dispatch } from 'redux';
import { ITeamResourceAction, TeamActionTypes } from '../../types/store/Team';
import { errorResponseHandler } from '../../utils/errorResponseHandler';

export const fetchTeam = (id: string | undefined) => {
  return async (dispatch: Dispatch<ITeamResourceAction>) => {
    try {
      dispatch({ type: TeamActionTypes.FETCH_TEAM });
      const response = await axios.get(`${process.env.REACT_APP_TEAM_LIST}/${id}`, {
        headers: {
          'X-Auth-Token': `${process.env.REACT_APP_TOKEN}`,
        },
      });
      dispatch({
        type: TeamActionTypes.FETCH_TEAM_SUCCESS,
        payload: response.data,
      });
    } catch (e: any) {
      // Невозможно дать конкретный тип ошибке

      const type = TeamActionTypes.FETCH_TEAM_ERROR;
      const errorText403 = 'Эта команда не входит в бесплатный тариф';
      const otherErrorText =
        'Произошла ошибка при загрузке команды / она не входит в бесплатный тариф';

      errorResponseHandler(e.response.status, dispatch, type, errorText403, otherErrorText);
    }
  };
};
