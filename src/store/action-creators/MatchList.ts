import { Dispatch } from 'redux';
import axios from 'axios';
import { MatchesActionTypes, MatchListAction } from '../../types/Matches';
import { errorResponseHandler } from '../../utils/errorResponseHandler';

export const fetchMatches = () => {
  return async (dispatch: Dispatch<MatchListAction>) => {
    try {
      dispatch({ type: MatchesActionTypes.FETCH_MATCHES });
      const response = await axios.get(`${process.env.REACT_APP_MATCH_LIST}`, {
        headers: {
          'X-Auth-Token': `${process.env.REACT_APP_TOKEN}`,
        },
      });
      dispatch({
        type: MatchesActionTypes.FETCH_MATCHES_SUCCESS,
        payload: response.data.matches,
      });
    } catch (e: any) {
      // Невозможно дать конкретный тип ошибке

      const type = MatchesActionTypes.FETCH_MATCHES_ERROR;
      const errorText403 = 'Список матчей не входит в бесплатный тариф';
      const otherErrorText = 'Произошла ошибка при загрузке списка матчей';

      errorResponseHandler(e.response.status, dispatch, type, errorText403, otherErrorText);
    }
  };
};
