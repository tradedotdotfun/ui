export const formatRank = (rank: number) => {
  if (rank === 0) return "-";
  if (rank >= 11 && rank <= 13) {
    return `${rank}th`;
  } else if (rank % 10 === 1) {
    return `${rank}st`;
  } else if (rank % 10 === 2) {
    return `${rank}nd`;
  } else if (rank % 10 === 3) {
    return `${rank}rd`;
  } else {
    return `${rank}th`;
  }
};
