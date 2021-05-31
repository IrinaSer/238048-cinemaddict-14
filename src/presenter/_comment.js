import CommentView from '../view/comment.js';
import {render, RenderPosition} from '../utils/render.js';
import {UserAction, UpdateType} from '../const.js';

export default class Comment {
  constructor(commentsContainer, commentsModel, changeData) {
    this._changeData = changeData;
    this._commentsContainer = commentsContainer;
    this._commentsModel = commentsModel;

    this._commentComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleDeleteButtonClick = this._handleDeleteButtonClick.bind(this);

    this._commentsModel.addObserver(this._handleModelEvent);
  }

  init(comment) {
    this._comment = comment;

    this._commentComponent = new CommentView(comment);
    this._commentComponent.setDeleteButtonClickHandler(this._handleDeleteButtonClick);

    render(this._commentsContainer, this._commentComponent, RenderPosition.BEFOREEND);
  }

  _handleModelEvent() {
    this.init();
  }

  _getComments() {
    return this._commentsModel.getComments();
  }

  _handleDeleteButtonClick(comment) {
    this._changeData(
      UserAction.DELETE_COMMENT,
      UpdateType.PATCH,
      comment,
    );
  }

  _clearComments() {

  }
}
