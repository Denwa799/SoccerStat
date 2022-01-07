import { combineReducers } from 'redux';
import { competitionListReducer } from './competitionListReducer';
import { matchListReducer } from './matchListReducer';
import { teamListReducer } from './teamListReducer';

export const rootReducer = combineReducers({
  competitionList: competitionListReducer,
  matchList: matchListReducer,
  teamList: teamListReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
