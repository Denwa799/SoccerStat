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
    } catch (e) {
      dispatch({
        type: CompetitionActionTypes.FETCH_COMPETITION_ERROR,
        payload:
          'Произошла ошибка при загрузке соревнования' + ' / оно не входит в бесплатный тариф',
      });
    }
  };
};
