const movieToFilterMap = {
  all: (movies) => movies.length,
  watchlist: (movies) => movies
    .filter((task) => task.isToWatchlist).length,
  history: (movies) => movies
    .filter((task) => task.isWatched).length,
  favorites: (movies) => movies
    .filter((task) => task.isFavorite).length,
};

export const generateFilter = (movies) => {
  return Object.entries(movieToFilterMap).map(([filterName, countTasks]) => {
    return {
      name: filterName,
      count: countTasks(movies),
    };
  });
};
