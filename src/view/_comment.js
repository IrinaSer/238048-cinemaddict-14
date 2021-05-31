import AbstractView from './abstract.js';

const createCommentTemplate = (_comment = {}) => {
  const {
    id,
    emotion,
    comment,
    author,
    date,
  } = _comment;
  return `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
            </span>
            <div>
              <p class="film-details__comment-text">${comment}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${author}</span>
                <span class="film-details__comment-day">${date}</span>
                <button class="film-details__comment-delete" data-comment="${id}">Delete</button>
              </p>
            </div>
          </li>`;
};

const createCommentsTemplate = (comments) => {
  const commentItemsTemplate = comments
    .map((comment) => createCommentTemplate(comment))
    .join('');

  return `<section class="film-details__comments-wrap">
  <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
  <ul class="film-details__comments-list">${commentItemsTemplate}</ul>
    ${createCommentFormTemplate()}
  </section>`;
};

const createCommentFormTemplate = () => {
  return `<div class="film-details__new-comment">
          <div class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>`;
};

export default class Comments extends AbstractView {
  constructor(comments) {
    super();
    this._comments = comments;

    this._deleteButtonClickHandler = this._deleteButtonClickHandler.bind(this);
  }

  getTemplate() {
    return createCommentsTemplate(this._comments);
  }

  _deleteButtonClickHandler(evt) {
    evt.preventDefault();
    const comment = this._comments.find((item) => item.id === evt.target.dataset.comment);
    this._callback.deleteButtonClick(comment);
  }

  setDeleteButtonClickHandler(callback) {
    this._callback.deleteButtonClick = callback;
    this.getElement()
      .querySelectorAll('.film-details__comment-delete')
      .forEach((item) => item.addEventListener('click', this._deleteButtonClickHandler));
  }
}
