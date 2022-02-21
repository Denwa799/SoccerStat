import { CompetitionListState } from '../../types/Competitions';
import { CompetitionResourceState } from '../../types/Competition';
import { MatchListState } from '../../types/Matches';
import { MatchResourceState } from '../../types/Match';
import { TeamListState } from '../../types/Teams';
import { TeamMatchesResourceState } from '../../types/TeamMatches';
import { TeamResourceState } from '../../types/Team';

interface IState {
  competitionList: CompetitionListState;
  competitionResource: CompetitionResourceState;
  matchList: MatchListState;
  matchResource: MatchResourceState;
  teamList: TeamListState;
  teamMatchesResource: TeamMatchesResourceState;
  teamResource: TeamResourceState;
}

export const competitionListSelector = (state: IState) => state.competitionList;
export const competitionResourceSelector = (state: IState) => state.competitionResource;
export const matchListSelector = (state: IState) => state.matchList;
export const matchResourceSelector = (state: IState) => state.matchResource;
export const teamListSelector = (state: IState) => state.teamList;
export const teamResourceSelector = (state: IState) => state.teamResource;
export const teamMatchesResourceSelector = (state: IState) => state.teamMatchesResource;
