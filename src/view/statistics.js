import AbstractView from './abstract.js';

const createStatisticsTemplate = (count) => {
  return `<section class="footer__statistics">
    <p>${count} movies inside</p>
  </section>`;
};

export default class Statistics extends AbstractView {
  constructor(count) {
    super();
    this._count = count;
  }

  getTemplate() {
    return createStatisticsTemplate(this._count);
  }
}
