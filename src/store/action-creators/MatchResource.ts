import axios from 'axios';
import { Dispatch } from 'redux';
import { IMatchResourceAction, MatchActionTypes } from '../../types/store/Match';
import { errorResponseHandler } from '../../utils/errorResponseHandler';

export const fetchMatch = (id: string | undefined) => {
  return async (dispatch: Dispatch<IMatchResourceAction>) => {
    try {
      dispatch({ type: MatchActionTypes.FETCH_MATCH });
      const response = await axios.get(`${process.env.REACT_APP_MATCH_LIST}/${id}`, {
        headers: {
          'X-Auth-Token': `${process.env.REACT_APP_TOKEN}`,
        },
      });
      dispatch({
        type: MatchActionTypes.FETCH_MATCH_SUCCESS,
        payload: response.data,
      });
    } catch (e: any) {
      // Невозможно дать конкретный тип ошибке

      const type = MatchActionTypes.FETCH_MATCH_ERROR;
      const errorText403 = 'Этот матч не входит в бесплатный тариф';
      const otherErrorText =
        'Произошла ошибка при загрузке матча / он не входит в бесплатный тариф';

      errorResponseHandler(e.response.status, dispatch, type, errorText403, otherErrorText);
    }
  };
};
