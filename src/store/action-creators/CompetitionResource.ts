import axios from 'axios';
import { Dispatch } from 'redux';
import { CompetitionResourceAction, CompetitionActionTypes } from '../../types/Competition';

export const fetchCompetition = (id: number) => {
  return async (dispatch: Dispatch<CompetitionResourceAction>) => {
    try {
      dispatch({ type: CompetitionActionTypes.FETCH_COMPETITION });
      const response = await axios.get(
        `${process.env.REACT_APP_PROXY}${process.env.REACT_APP_COMPETITION_LIST}/${id}${process.env.REACT_APP_MATCH}`,
        {
          headers: {
            'X-Auth-Token': `${process.env.REACT_APP_TOKEN}`,
          },
        }
      );
      dispatch({
        type: CompetitionActionTypes.FETCH_COMPETITION_SUCCESS,
        payload: response.data,
      });
    } catch (e: any) {
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
