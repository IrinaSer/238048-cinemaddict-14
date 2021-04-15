import {createListMovieCardTemplate} from './list-movie-card.js';

export const createAllFilmsTemplate = () => {
  const MOVIE_COUNT = 5;
  const cards = [];

  for (let i = 0; i < MOVIE_COUNT; i++) {
    cards.push(createListMovieCardTemplate());
  }

  return `
  <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

      <div class="films-list__container">
        ${cards.join('')}
      </div>
  </section>`;
};
