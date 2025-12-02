export function formatTimeAgo(time: Date | string | number) {
  const start = new Date(time);
  const end = new Date();

  const secondDiff = Math.floor((end.getTime() - start.getTime()) / 1000);
  if (secondDiff < 60) return "now";

  const minDiff = Math.floor(secondDiff / 60);
  if (minDiff < 60) return `${minDiff} mins ago`;

  const hourDiff = Math.floor(minDiff / 60);
  if (hourDiff < 24) return `${hourDiff} hours ago`;

  const dayDiff = Math.floor(hourDiff / 24);
  return `${dayDiff} days ago`;
}
