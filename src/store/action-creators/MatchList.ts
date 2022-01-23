import { Dispatch } from 'redux';
import axios from 'axios';
import { MatchesActionTypes, MatchListAction } from '../../types/Matches';

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
      if (e.response.status === 429) {
        return dispatch({
          type: MatchesActionTypes.FETCH_MATCHES_ERROR,
          payload: 'Превышен лимит на запросы',
        });
      } else if (e.response.status === 403) {
        return dispatch({
          type: MatchesActionTypes.FETCH_MATCHES_ERROR,
          payload: 'Список матчей не входит в бесплатный тариф',
        });
      } else {
        dispatch({
          type: MatchesActionTypes.FETCH_MATCHES_ERROR,
          payload: 'Произошла ошибка при загрузке' + ' списка матчей',
        });
      }
    }
  };
};
