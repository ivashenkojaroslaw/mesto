import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
    constructor({handleFormSubmit}, popupSelector){
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
    }   

    close(){
        super.close();
        this._popupForm.reset();
    }

    setEventListeners(){
        super.setEventListeners();
        this._popupForm = this.popup.querySelector('.popup__form');
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());            
            this.close();
        });        
    }

    fillForm({nameSelector, describeSelector}, {name, describe}){
        this.popup.querySelector(nameSelector).value = name; 
        this.popup.querySelector(describeSelector).value = describe;
    }

    _getInputValues() {  
        this._inputList = this._popupForm.querySelectorAll('.popup__input');    
        this._formValues = {};     
        this._inputList.forEach(input => {
          this._formValues[input.name] = input.value;
        });     

        return this._formValues;
      }
}