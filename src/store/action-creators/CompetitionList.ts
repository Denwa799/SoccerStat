import axios from 'axios';
import { Dispatch } from 'redux';
import { ICompetitionListAction, CompetitionsActionTypes } from '../../types/store/Competitions';
import { errorResponseHandler } from '../../utils/errorResponseHandler';

export const fetchCompetitions = () => {
  return async (dispatch: Dispatch<ICompetitionListAction>) => {
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
      // Невозможно дать конкретный тип ошибке

      const type = CompetitionsActionTypes.FETCH_COMPETITIONS_ERROR;
      const errorText403 = 'Список соревнований не входит в бесплатный тариф';
      const otherErrorText = 'Произошла ошибка при загрузке списка соревнований';

      errorResponseHandler(e.response.status, dispatch, type, errorText403, otherErrorText);
    }
  };
};
