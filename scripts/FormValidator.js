class FormValidator{
    constructor(settings, validationForm){
        this._settings = settings;
        this._validationForm = validationForm;
    }

    _showInputError(inputElement, errorMessage){
        const errorElement = this._validationForm.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._settings.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._settings.errorClass);
    }

    _hideInputError(inputElement){
        const errorElement = this._validationForm.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._settings.inputErrorClass);
        errorElement.classList.remove(this._settings.errorClass);
        errorElement.textContent = '';
    }

    _hasInvalidInput(inputList){
        return inputList.some(inputElement => {
            return !inputElement.validity.valid
            })
    }

    _checkInputValidity(inputElement){
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }
    
    _toggleButtonState(inputList, buttonElement){
        if (this._hasInvalidInput(inputList)){
            buttonElement.classList.add(this._settings.inactiveButtonClass);
            buttonElement.disabled = true;
            }
        else{
            buttonElement.classList.remove(this._settings.inactiveButtonClass);
            buttonElement.disabled = false;
        }
    }

    _setEventListeners(){
        const inputList = Array.from(this._validationForm.querySelectorAll(this._settings.inputSelector));
        const buttonElement = this._validationForm.querySelector(this._settings.submitButtonSelector);
        this._toggleButtonState(inputList,buttonElement);
        inputList.forEach((inputElement) => {
            this._inputElement = inputElement;
            this._inputElement.addEventListener('input', () => {          
                this._checkInputValidity(this._inputElement);
                this._toggleButtonState(inputList,buttonElement)
            });
        }); 
    }

    enableValidation(){
        this._validationForm.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        const fieldsetList = Array.from(this._validationForm.querySelectorAll(this._settings.fieldSelector));
        fieldsetList.forEach(fieldset => {
            this._setEventListeners(fieldset);
        }); 
    }

    clearFormfromErrors(){
        const formButton = this._validationForm.querySelector(this._settings.submitButtonSelector);
        const inputList = Array.from(this._validationForm.querySelectorAll(this._settings.inputSelector));
        inputList.forEach(inputElement => {
            this._hideInputError(inputElement)
        })
        this._toggleButtonState(inputList,formButton);
    }
}

export default FormValidator;