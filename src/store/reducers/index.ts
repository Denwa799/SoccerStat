import { combineReducers } from 'redux';
import { competitionListReducer } from './competitionListReducer';

export const rootReducer = combineReducers({
  competitionList: competitionListReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
