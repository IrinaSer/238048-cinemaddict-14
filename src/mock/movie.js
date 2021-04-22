import dayjs from 'dayjs';
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomFloat = (a = 1, b = 0) => {
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);
  return lower + Math.random() * (upper - lower);
};

const generateDescription = () => {
  const descriptions = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    'Sed sed nisi sed augue convallis suscipit in sed felis.',
    'Aliquam erat volutpat.',
    'Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
  ];

  const randomCount = getRandomInteger(1, 5);
  let description = '';

  for (let i = 0; i < randomCount; i++) {
    const randomIndex = getRandomInteger(0, descriptions.length - 1);
    description += `${descriptions[randomIndex]} `;
  }

  return description.trim();
};

const generateTitle = () => {
  const titles = [
    'Made for Each Other',
    'The Dance of Life',
    'Sagebrush Trail',
    'The Man with the Golden Arm',
    'Santa Claus Conquers the Martians',
    'Popeye the Sailor Meets Sindbad the Sailor',
    'The Great Flamarion',
  ];

  const randomIndex = getRandomInteger(0, titles.length - 1);

  return titles[randomIndex];
};

const generateRating = () => {
  const randomRating = getRandomFloat(1, 9);

  return randomRating.toFixed(2);
};

const generatePoster = () => {
  const images = [
    'made-for-each-other.png',
    'popeye-meets-sinbad.png',
    'sagebrush-trail.jpg',
    'santa-claus-conquers-the-martians.jpg',
    'the-dance-of-life.jpg',
    'the-great-flamarion.jpg',
    'the-man-with-the-golden-arm.jpg',
  ];

  const randomIndex = getRandomInteger(0, images.length - 1);

  return images[randomIndex];
};

const generateDuration = () => {
  const hour = getRandomInteger(0, 1);
  const min = getRandomInteger(10, 60);

  return hour ? `${hour}h ${min}m` : `${min}m`;
};

const generateGenre = () => {
  const genres = [
    'Musical',
    'Western',
    'Drama',
    'Comedy',
    'Cartoon',
    'Mystery',
  ];

  const randomIndex = getRandomInteger(0, genres.length - 1);

  return genres[randomIndex];
};

const generateDate = () => {
  const day = getRandomInteger(1, 30);
  const month = getRandomInteger(1, 12);
  const year = getRandomInteger(1900, 1970);
  const date = new Date(year, month, day);

  return dayjs(date).format('D MMMM YYYY');
};

export const generateMovie = () => {
  const genresCount = getRandomInteger(0, 3);

  return {
    poster: generatePoster(),
    title: generateTitle(),
    rating: generateRating(),
    releaseYear: getRandomInteger(1900, 1970),
    duration: generateDuration(),
    genre: generateGenre(),
    description: generateDescription(),
    commentsCount: getRandomInteger(0, 5),
    fullPoster: generatePoster(),
    originalTitle: generateTitle(),
    director: 'Robert B. Weide',
    writers: 'Anne Wigton, Heinz Herald, Richard Weil',
    actors: 'Erich von Stroheim, Mary Beth Hughes, Dan Duryea',
    releaseDate: generateDate(),
    country: 'USA',
    genres: new Array(genresCount).fill().map(generateGenre),
    fullDescription: 'The film opens following a murder at a cabaret in Mexico City in 1936, and then presents the events leading up to it in flashback. The Great Flamarion (Erich von Stroheim) is an arrogant, friendless, and misogynous marksman who displays his trick gunshot act in the vaudeville circuit. His show features a beautiful assistant, Connie (Mary Beth Hughes) and her drunken husband Al (Dan Duryea), Flamarion`s other assistant. Flamarion falls in love with Connie, the movie`s femme fatale, and is soon manipulated by her into killing her no good husband during one of their acts.',
    ageRating: getRandomInteger(0, 21),
    isToWatch: Boolean(getRandomInteger(0, 1)),
    isViewed: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
