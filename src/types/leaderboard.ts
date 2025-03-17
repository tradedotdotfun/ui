// "rank": 1,
// "address": "AfwFC6dY1x623nXPXUmTmm9wVGo6Aq2dRDjHgEnZqRJ3",
// "name": "chan",
// "pnl": 27977.280581738276,
// "roi": 2.7977280581738277
export type RankInfo = {
  rank: number;
  address: string;
  name: string;
  pnl: number;
  roi: number;
}

export type LeaderBoard = RankInfo[];
