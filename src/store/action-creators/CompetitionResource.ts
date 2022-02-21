import axios from 'axios';
import { Dispatch } from 'redux';
import { ICompetitionResourceAction, CompetitionActionTypes } from '../../types/store/Competition';
import { errorResponseHandler } from '../../utils/errorResponseHandler';

export const fetchCompetition = (id: string | undefined, dateFrom: string, dateTo: string) => {
  return async (dispatch: Dispatch<ICompetitionResourceAction>) => {
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

      const type = CompetitionActionTypes.FETCH_COMPETITION_ERROR;
      const errorText403 = 'Это соревнование не входит в бесплатный тариф';
      const otherErrorText =
        'Произошла ошибка при загрузке соревнования / оно не входит в бесплатный тариф';

      errorResponseHandler(e.response.status, dispatch, type, errorText403, otherErrorText);
    }
  };
};
