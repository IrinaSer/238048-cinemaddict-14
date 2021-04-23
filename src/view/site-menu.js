const createFilterItemTemplate = (filter) => {
  const {filterName, count} = filter;
  const formatFilterName = (str) => {
    if (!str) return str;
    return str[0].toUpperCase() + str.slice(1);
  };

  return (
    `<a href="#${filterName}" class="main-navigation__item ${filterName === 'all' ? 'main-navigation__item--active' : ''}">
${filterName === 'all' ? 'All movies' : `${formatFilterName(filterName)}  <span class="main-navigation__item-count">${count}</span>`}</a>`
  );
};

export const createSiteMenuTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter))
    .join('');

  return `<nav class="main-navigation">
  <div class="main-navigation__items">
    ${filterItemsTemplate}
  </div>
  <a href="#stats" class="main-navigation__additional">Stats</a>
</nav>`;
};
