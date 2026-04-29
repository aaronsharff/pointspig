export function formatUSD(dollars: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(dollars);
}

export function formatPoints(points: number): string {
  return new Intl.NumberFormat("en-US").format(Math.floor(points));
}
