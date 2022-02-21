import { ICompetitionListState } from '../../types/store/Competitions';
import { ICompetitionResourceState } from '../../types/store/Competition';
import { IMatchListState } from '../../types/store/Matches';
import { IMatchResourceState } from '../../types/store/Match';
import { ITeamListState } from '../../types/store/Teams';
import { ITeamMatchesResourceState } from '../../types/store/TeamMatches';
import { ITeamResourceState } from '../../types/store/Team';

interface IState {
  competitionList: ICompetitionListState;
  competitionResource: ICompetitionResourceState;
  matchList: IMatchListState;
  matchResource: IMatchResourceState;
  teamList: ITeamListState;
  teamMatchesResource: ITeamMatchesResourceState;
  teamResource: ITeamResourceState;
}

export const competitionListSelector = (state: IState) => state.competitionList;
export const competitionResourceSelector = (state: IState) => state.competitionResource;
export const matchListSelector = (state: IState) => state.matchList;
export const matchResourceSelector = (state: IState) => state.matchResource;
export const teamListSelector = (state: IState) => state.teamList;
export const teamResourceSelector = (state: IState) => state.teamResource;
export const teamMatchesResourceSelector = (state: IState) => state.teamMatchesResource;
