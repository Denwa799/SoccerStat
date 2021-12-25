import axios from 'axios';
import { Dispatch } from 'redux';
import { CompetitionListAction, CompetitionsActionTypes } from '../../types/Competitions';

export const fetchCompetitions = () => {
  return async (dispatch: Dispatch<CompetitionListAction>) => {
    try {
      dispatch({ type: CompetitionsActionTypes.FETCH_COMPETITIONS });
      const response = await axios.get(
        `${process.env.REACT_APP_PROXY}${process.env.REACT_APP_COMPETITION_LIST}`,
        {
          headers: {
            'X-Auth-Token': `${process.env.REACT_APP_TOKEN}`,
          },
        }
      );
      dispatch({
        type: CompetitionsActionTypes.FETCH_COMPETITIONS_SUCCESS,
        payload: response.data.competitions,
      });
    } catch (e) {
      dispatch({
        type: CompetitionsActionTypes.FETCH_COMPETITIONS_ERROR,
        payload: 'Произошла ошибка при загрузке' + ' списка соревнований',
      });
    }
  };
};
