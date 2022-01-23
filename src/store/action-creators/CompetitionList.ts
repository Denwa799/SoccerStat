import axios from 'axios';
import { Dispatch } from 'redux';
import { CompetitionListAction, CompetitionsActionTypes } from '../../types/Competitions';

export const fetchCompetitions = () => {
  return async (dispatch: Dispatch<CompetitionListAction>) => {
    try {
      dispatch({ type: CompetitionsActionTypes.FETCH_COMPETITIONS });
      const response = await axios.get(`${process.env.REACT_APP_COMPETITION_LIST}`, {
        headers: {
          'X-Auth-Token': `${process.env.REACT_APP_TOKEN}`,
        },
      });
      dispatch({
        type: CompetitionsActionTypes.FETCH_COMPETITIONS_SUCCESS,
        payload: response.data.competitions,
      });
    } catch (e: any) {
      if (e.response.status === 429) {
        return dispatch({
          type: CompetitionsActionTypes.FETCH_COMPETITIONS_ERROR,
          payload: 'Превышен лимит на запросы',
        });
      } else if (e.response.status === 403) {
        return dispatch({
          type: CompetitionsActionTypes.FETCH_COMPETITIONS_ERROR,
          payload: 'Список соревнований не входит в бесплатный тариф',
        });
      } else {
        dispatch({
          type: CompetitionsActionTypes.FETCH_COMPETITIONS_ERROR,
          payload: 'Произошла ошибка при загрузке' + ' списка соревнований',
        });
      }
    }
  };
};
