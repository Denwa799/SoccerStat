import { combineReducers } from 'redux';
import { competitionListReducer } from './competitionListReducer';
import { competitionResourceReducer } from './competitionResourceReducer';
import { matchListReducer } from './matchListReducer';
import { teamListReducer } from './teamListReducer';
import { teamMatchesResourceReducer } from './teamMatchesResourceReducer';
import { teamResourceReducer } from './teamResourceReducer';
import { matchResourceReducer } from './matchResourceReducer';

export const rootReducer = combineReducers({
  competitionList: competitionListReducer,
  matchList: matchListReducer,
  teamList: teamListReducer,
  competitionResource: competitionResourceReducer,
  teamMatchesResource: teamMatchesResourceReducer,
  teamResource: teamResourceReducer,
  matchResource: matchResourceReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
