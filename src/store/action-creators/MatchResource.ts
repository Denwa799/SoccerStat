import axios from 'axios';
import { Dispatch } from 'redux';
import { MatchResourceAction, MatchActionTypes } from '../../types/Match';

export const fetchMatch = (id: number) => {
  return async (dispatch: Dispatch<MatchResourceAction>) => {
    try {
      dispatch({ type: MatchActionTypes.FETCH_MATCH });
      const response = await axios.get(
        `${process.env.REACT_APP_PROXY}${process.env.REACT_APP_MATCH_LIST}/${id}`,
        {
          headers: {
            'X-Auth-Token': `${process.env.REACT_APP_TOKEN}`,
          },
        }
      );
      dispatch({
        type: MatchActionTypes.FETCH_MATCH_SUCCESS,
        payload: response.data,
      });
    } catch (e: any) {
      if (e.response.status === 429) {
        return dispatch({
          type: MatchActionTypes.FETCH_MATCH_ERROR,
          payload: 'Превышен лимит на запросы',
        });
      } else if (e.response.status === 403) {
        return dispatch({
          type: MatchActionTypes.FETCH_MATCH_ERROR,
          payload: 'Этот матч не входит в бесплатный тариф',
        });
      } else {
        dispatch({
          type: MatchActionTypes.FETCH_MATCH_ERROR,
          payload: 'Произошла ошибка при загрузке матча' + ' / оно не входит в бесплатный тариф',
        });
      }
    }
  };
};
