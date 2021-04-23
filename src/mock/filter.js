const movieToFilterMap = {
  all: (movies) => movies.length,
  watchlist: (movies) => movies
    .filter((task) => task.isToWatch).length,
  history: (movies) => movies
    .filter((task) => task.isViewed).length,
  favorites: (movies) => movies
    .filter((task) => task.isFavorite).length,
};

export const generateFilter = (movies) => {
  return Object.entries(movieToFilterMap).map(([filterName, countTasks]) => {
    return {
      filterName,
      count: countTasks(movies),
    };
  });
};
