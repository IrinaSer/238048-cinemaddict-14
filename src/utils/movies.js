import dayjs from 'dayjs';

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

export const sortMoviesByDate = (movieA, movieB) => {
  const weight = getWeightForNullDate(movieA.releaseDate, movieB.releaseDate);

  if (weight !== null) {
    return weight;
  }

  return dayjs(movieA.releaseDate).diff(dayjs(movieB.releaseDate));
};

export const sortMoviesByRating = (movieA, movieB) => {
  return movieA.rating - movieB.rating;
};
