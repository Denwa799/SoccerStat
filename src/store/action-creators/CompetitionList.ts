import axios from 'axios';
import { Dispatch } from 'redux';
import { CompetitionListAction, CompetitionsActionTypes } from '../../types/Competitions';

// `${process.env.REACT_APP_COMPETITION_LIST}?X-Auty-Token=${process.env.REACT_APP_TOKEN}&X-API-Version=${process.env.REACT_APP_API_VERSION}&X-Authenticated-Client=${process.env.REACT_APP_CLIENT}`

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
      console.log(response.data);
    } catch (e) {
      dispatch({
        type: CompetitionsActionTypes.FETCH_COMPETITIONS_ERROR,
        payload: 'Произошла ошибка при загрузке' + ' списка соревнований',
      });
    }
  };
};
