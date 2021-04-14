import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
    constructor( popupSelector) {
      super(popupSelector);
      this._popupForm = this.popup.querySelector('.popup__form');
      this._handleSubmit = this._handleSubmit.bind(this);
  }

  setEventOnSubmit(handlers){
    this._handleFormSubmit = handlers.handlerFormSubmit;
    this._popupForm.addEventListener('submit', this._handleSubmit);
  }

  _handleSubmit(evt){
    evt.preventDefault();
    this._handleFormSubmit();
    this._popupForm.removeEventListener('submit', this._handleSubmit);
    this.close();
  }
}