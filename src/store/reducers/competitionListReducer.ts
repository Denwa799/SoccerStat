import {
  CompetitionListAction,
  CompetitionListState,
  CompetitionsActionTypes,
} from '../../types/Competitions';

const initialState: CompetitionListState = {
  competitions: [
    {
      id: 2006,
      area: {
        id: 2001,
        name: 'Africa',
        countryCode: 'AFR',
        ensignUrl: null,
      },
      name: 'WC Qualification CAF',
      code: 'QCAF',
      emblemUrl: null,
      plan: 'TIER_FOUR',
      currentSeason: {
        id: 555,
        startDate: '2019-09-04',
        endDate: '2021-11-16',
        currentMatchday: 6,
        winner: null,
      },
      numberOfAvailableSeasons: 2,
      lastUpdated: '2021-11-11T10:27:41Z',
    },
    {
      id: 2023,
      area: {
        id: 2011,
        name: 'Argentina',
        countryCode: 'ARG',
        ensignUrl: null,
      },
      name: 'Primera B Nacional',
      code: null,
      emblemUrl: null,
      plan: 'TIER_FOUR',
      currentSeason: {
        id: 716,
        startDate: '2021-03-13',
        endDate: '2021-12-26',
        currentMatchday: 17,
        winner: null,
      },
      numberOfAvailableSeasons: 5,
      lastUpdated: '2021-04-17T11:21:38Z',
    },
    {
      id: 2024,
      area: {
        id: 2011,
        name: 'Argentina',
        countryCode: 'ARG',
        ensignUrl: null,
      },
      name: 'Liga Profesional',
      code: 'ASL',
      emblemUrl: 'https://crests.football-data.org/LPDF.svg',
      plan: 'TIER_TWO',
      currentSeason: {
        id: 715,
        startDate: '2021-07-18',
        endDate: '2021-12-12',
        currentMatchday: 25,
        winner: null,
      },
      numberOfAvailableSeasons: 4,
      lastUpdated: '2021-05-28T18:02:40Z',
    },
    {
      id: 2006,
      area: {
        id: 2001,
        name: 'Africa',
        countryCode: 'AFR',
        ensignUrl: null,
      },
      name: 'WC Qualification CAF',
      code: 'QCAF',
      emblemUrl: null,
      plan: 'TIER_FOUR',
      currentSeason: {
        id: 555,
        startDate: '2019-09-04',
        endDate: '2021-11-16',
        currentMatchday: 6,
        winner: null,
      },
      numberOfAvailableSeasons: 2,
      lastUpdated: '2021-11-11T10:27:41Z',
    },
    {
      id: 2023,
      area: {
        id: 2011,
        name: 'Argentina',
        countryCode: 'ARG',
        ensignUrl: null,
      },
      name: 'Primera B Nacional',
      code: null,
      emblemUrl: null,
      plan: 'TIER_FOUR',
      currentSeason: {
        id: 716,
        startDate: '2021-03-13',
        endDate: '2021-12-26',
        currentMatchday: 17,
        winner: null,
      },
      numberOfAvailableSeasons: 5,
      lastUpdated: '2021-04-17T11:21:38Z',
    },
    {
      id: 2024,
      area: {
        id: 2011,
        name: 'Argentina',
        countryCode: 'ARG',
        ensignUrl: null,
      },
      name: 'Liga Profesional',
      code: 'ASL',
      emblemUrl: 'https://crests.football-data.org/LPDF.svg',
      plan: 'TIER_TWO',
      currentSeason: {
        id: 715,
        startDate: '2021-07-18',
        endDate: '2021-12-12',
        currentMatchday: 25,
        winner: null,
      },
      numberOfAvailableSeasons: 4,
      lastUpdated: '2021-05-28T18:02:40Z',
    },
  ],
  loading: false,
  error: null,
};

export const competitionListReducer = (
  state = initialState,
  action: CompetitionListAction
): CompetitionListState => {
  switch (action.type) {
    case CompetitionsActionTypes.FETCH_COMPETITIONS:
      return { loading: true, error: null, competitions: [] };
    case CompetitionsActionTypes.FETCH_COMPETITIONS_SUCCESS:
      return { loading: false, error: null, competitions: action.payload };
    case CompetitionsActionTypes.FETCH_COMPETITIONS_ERROR:
      return { loading: false, error: action.payload, competitions: [] };
    default:
      return state;
  }
};
