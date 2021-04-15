export const createFilmsTemplate = (allFilmsTemplate,
  topRatedTemplate,
  mostCommentedTemplate,
  showMoreBtn,
) => {
  return `<section class="films">
    ${allFilmsTemplate}
    ${showMoreBtn}
    ${topRatedTemplate}
    ${mostCommentedTemplate}
  </section>`;
};
