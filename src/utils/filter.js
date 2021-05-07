import {FilterType} from '../const';

export const filter = {
  [FilterType.ALL]: (movies) => movies,
  [FilterType.HISTORY]: (movies) => movies.filter((task) => task.isWatched),
  [FilterType.WATCHLIST]: (movies) => movies.filter((task) => task.isToWatchlist),
  [FilterType.FAVORITES]: (movies) => movies.filter((task) => task.isFavorite),
};
