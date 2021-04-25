import {createElement, formatName} from '../utils.js';

const createMenuItemTemplate = (item) => {
  const {name, count} = item;

  return (
    `<a href="#${name}" class="main-navigation__item ${name === 'all' ? 'main-navigation__item--active' : ''}">
${name === 'all' ? 'All movies' : `${formatName(name)}  <span class="main-navigation__item-count">${count}</span>`}</a>`
  );
};

const createSiteMenuTemplate = (filterItems) => {
  const menuItemsTemplate = filterItems
    .map((filter) => createMenuItemTemplate(filter))
    .join('');

  return `<nav class="main-navigation">
  <div class="main-navigation__items">
    ${menuItemsTemplate}
  </div>
  <a href="#stats" class="main-navigation__additional">Stats</a>
</nav>`;
};

export default class SiteMenu {
  constructor(items) {
    this._element = null;
    this._items = items;
  }

  getTemplate() {
    return createSiteMenuTemplate(this._items);
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
