import { Dispatch } from 'redux';
import axios from 'axios';
import { MatchesActionTypes, MatchListAction } from '../../types/Matches';

export const fetchMatches = () => {
  return async (dispatch: Dispatch<MatchListAction>) => {
    try {
      dispatch({ type: MatchesActionTypes.FETCH_MATCHES });
      const response = await axios.get(
        `${process.env.REACT_APP_PROXY}${process.env.REACT_APP_MATCH_LIST}`,
        {
          headers: {
            'X-Auth-Token': `${process.env.REACT_APP_TOKEN}`,
          },
        }
      );
      dispatch({
        type: MatchesActionTypes.FETCH_MATCHES_SUCCESS,
        payload: response.data.matches,
      });
    } catch (e) {
      dispatch({
        type: MatchesActionTypes.FETCH_MATCHES_ERROR,
        payload: 'Произошла ошибка при загрузке' + ' списка матчей',
      });
    }
  };
};
