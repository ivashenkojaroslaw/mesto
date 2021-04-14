import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({ handleFormSubmit }, popupSelector) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this.popup.querySelector('.popup__form');
        this._inputList = this._popupForm.querySelectorAll('.popup__input');
    }

    close() {
        super.close();
        this._popupForm.reset();
    }

    setEventListeners() {
        super.setEventListeners();        
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.close();
        });
    }   

    _getInputValues() {        
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues;
    }
}