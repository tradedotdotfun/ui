import apiClient from ".";
import { LeaderBoard } from "../types/leaderboard";

export const fetchLeaderBoard: (round: number, limit: number) => Promise<LeaderBoard> = async (round: number = 0, limit = 10) => {
  const response = await apiClient.get(`/leaderboard?round=${round}&limit=${limit}`);

  return response.data;
}
