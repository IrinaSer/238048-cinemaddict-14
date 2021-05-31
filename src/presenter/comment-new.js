import {nanoid} from 'nanoid';
import {remove, render, RenderPosition} from '../utils/render.js';
import {UserAction, UpdateType} from '../const.js';
import CommentAddFormView from '../view/coment-add-form';

export default class CommentNew {
  constructor(commentsContainer, changeData) {
    this._commentsContainer = commentsContainer;
    this._changeData = changeData;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  init() {
    if (this._taskEditComponent !== null) {
      return;
    }

    this._taskEditComponent = new CommentAddFormView();
    this._taskEditComponent.setFormSubmitHandler(this._handleFormSubmit);

    render(this._commentsContainer, this._taskEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  destroy() {
    if (this._taskEditComponent === null) {
      return;
    }

    remove(this._taskEditComponent);
    this._taskEditComponent = null;

    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _handleFormSubmit(task) {
    this._changeData(
      UserAction.ADD_COMMENT,
      UpdateType.MINOR,
      // Пока у нас нет сервера, который бы после сохранения
      // выдывал честный id задачи, нам нужно позаботиться об этом самим
      Object.assign({id: nanoid()}, task),
    );
    this.destroy();
  }
}
