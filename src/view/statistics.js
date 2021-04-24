import {createElement} from '../utils.js';

const createStatisticsTemplate = (count) => {
  return `<section class="footer__statistics">
    <p>${count} movies inside</p>
  </section>`;
};

export default class Statistics {
  constructor(count) {
    this._element = null;
    this._count = count;
  }

  getTemplate() {
    return createStatisticsTemplate(this._count);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
