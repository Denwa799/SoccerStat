import { combineReducers } from 'redux';
import { competitionListReducer } from './competitionListReducer';
import { matchListReducer } from './matchListReducer';

export const rootReducer = combineReducers({
  competitionList: competitionListReducer,
  matchList: matchListReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
