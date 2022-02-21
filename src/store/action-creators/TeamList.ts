import { Dispatch } from 'redux';
import axios from 'axios';
import { TeamsActionTypes, ITeamListAction } from '../../types/store/Teams';
import { errorResponseHandler } from '../../utils/errorResponseHandler';

export const fetchTeams = () => {
  return async (dispatch: Dispatch<ITeamListAction>) => {
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
      // Невозможно дать конкретный тип ошибке

      const type = TeamsActionTypes.FETCH_TEAMS_ERROR;
      const errorText403 = 'Список команд не входит в бесплатный тариф';
      const otherErrorText = 'Произошла ошибка при загрузке списка команд';

      errorResponseHandler(e.response.status, dispatch, type, errorText403, otherErrorText);
    }
  };
};
