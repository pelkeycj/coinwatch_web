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

  return groups;
}

export function viewRateChange(old_markets, new_markets) {
  const map = mapMarkets(old_markets);
  new_markets.map((market) => {
    const old_market = map[market.id];
    let color = 'black';
    let delta = 0;
    if (old_market && (old_market.rate > market.rate)) {
      color = 'red';
      delta = '-' +  (market.rate - old_market.rate);

    } else if (old_market && (old_market.rate < market.rate)) {
      color = 'green';
      delta =  '+' + (market.rate - old_market.rate);
    }
    market['color'] = color;
    market['delta'] = delta;
  });
  return new_markets;
}

// turn array of markets into map
function mapMarkets(markets) {
  const map = {};
  if (!markets) {
    return map;
  }

  markets.forEach((market) => {
    map[market.id] = market;
  });
  return map;
}
