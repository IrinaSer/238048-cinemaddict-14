import {createListMovieCardTemplate} from './list-movie-card.js';

export const createExtraFilmsTemplate = (title) => {
  const MOVIE_COUNT = 2;
  const cards = [];

  for (let i = 0; i < MOVIE_COUNT; i++) {
    cards.push(createListMovieCardTemplate());
  }

  return `<section class="films-list films-list--extra">
      <h2 class="films-list__title">${title}</h2>

      <div class="films-list__container">
        ${cards.join('')}
      </div>
  </section>`;
};
