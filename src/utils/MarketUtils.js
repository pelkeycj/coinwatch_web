//  Utility functions for markets

export function sortByPair(markets) {
  if (!markets) {
    return markets;
  }
  return markets.sort((a, b) => {
    const exchCompare = a.exchange.localeCompare(b.exchange);
    const pairCompare = a.pair.localeCompare(b.pair);

    return ((pairCompare * 10) + exchCompare);
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
    watched: sortByPair(watched),
    unwatched: sortByPair(unwatched),
  };
}

//  group markets as a list mapped to key (asset pair)
export function groupByAssetPair(markets) {
  const groups = {};
  if (!markets) {
    return groups;
  }

  markets.forEach((market) => {
    let exchanges = groups[market.pair];
    if (!exchanges) {
      exchanges = [];
    }
    exchanges.push(market);
    groups[market.pair] = exchanges;
  });

  console.log('groups', groups);
  return groups;
}
