import { combineReducers } from 'redux';
import { competitionListReducer } from './competitionListReducer';
import { competitionResourceReducer } from './competitionResourceReducer';
import { matchListReducer } from './matchListReducer';
import { teamListReducer } from './teamListReducer';
import { teamMatchesResourceReducer } from './teamMatchesResourceReducer';
import { teamResourceReducer } from './teamResourceReducer';

export const rootReducer = combineReducers({
  competitionList: competitionListReducer,
  matchList: matchListReducer,
  teamList: teamListReducer,
  competitionResource: competitionResourceReducer,
  teamMatchesResource: teamMatchesResourceReducer,
  teamResource: teamResourceReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
