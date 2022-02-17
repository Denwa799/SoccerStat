import axios from 'axios';
import { Dispatch } from 'redux';
import { CompetitionResourceAction, CompetitionActionTypes } from '../../types/Competition';

export const fetchCompetition = (id: string | undefined, dateFrom: string, dateTo: string) => {
  return async (dispatch: Dispatch<CompetitionResourceAction>) => {
    try {
      dispatch({ type: CompetitionActionTypes.FETCH_COMPETITION });
      const response = await axios.get(
        `${process.env.REACT_APP_COMPETITION_LIST}/${id}${process.env.REACT_APP_MATCH}`,
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
        type: CompetitionActionTypes.FETCH_COMPETITION_SUCCESS,
        payload: response.data,
      });
    } catch (e: any) {
      // Невозможно дать конкретный тип ошибке
      if (e.response.status === 429) {
        return dispatch({
          type: CompetitionActionTypes.FETCH_COMPETITION_ERROR,
          payload: 'Превышен лимит на запросы',
        });
      } else if (e.response.status === 403) {
        return dispatch({
          type: CompetitionActionTypes.FETCH_COMPETITION_ERROR,
          payload: 'Это соревнование не входит в бесплатный тариф',
        });
      } else {
        dispatch({
          type: CompetitionActionTypes.FETCH_COMPETITION_ERROR,
          payload:
            'Произошла ошибка при загрузке соревнования' + ' / оно не входит в бесплатный тариф',
        });
      }
    }
  };
};
