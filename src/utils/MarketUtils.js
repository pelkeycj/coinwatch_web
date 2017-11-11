//  Utility functions for markets

export function sortAlphabetical(markets) {
  return markets.sort((a, b) => {
    const exchCompare = a.exchange.localeCompare(b.exchange);
    const pairCompare = a.pair.localeCompare(b.pair);

    return ((exchCompare * 10) + pairCompare);
  });
}

// filters allMarkets into two arrays (watched, unwatched)
export function filterWatching(allMarkets, watchedMarkets) {
  const watched = [];
  const unwatched = [];

  if (allMarkets) {
    allMarkets.forEach((market) => {
      let contains = false;
      watchedMarkets.forEach((w) => {
        if (market.id === w.id) {
          watched.push(market);
          contains = true;
        }
      });
      if (!contains) {
        unwatched.push(market);
      }
    });
  }

  return {
    watched: sortAlphabetical(watched),
    unwatched: sortAlphabetical(unwatched),
  };
}
