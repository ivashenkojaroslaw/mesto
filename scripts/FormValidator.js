class FormValidator{
    constructor(settings, validationForm){
        this._settings = settings;
        this._validationForm = validationForm;
        this._inputList = Array.from(this._validationForm.querySelectorAll(this._settings.inputSelector));
        this._buttonElement = this._validationForm.querySelector(this._settings.submitButtonSelector);
        this._fieldset = this._validationForm.querySelector(this._settings.fieldSelector);
         
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
        this._toggleButtonState(this._inputList,this._buttonElement);
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {          
                this._checkInputValidity(inputElement);
                this._toggleButtonState(this._inputList,this._buttonElement)
            });
        }); 
    }

    enableValidation(){
        this._validationForm.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        this._setEventListeners(this._fieldset);

    }

    clearFormfromErrors(){   
        this._inputList.forEach(inputElement => {
            this._hideInputError(inputElement)
        })
        this._toggleButtonState(this._inputList,this._buttonElement);
    }
}

export default FormValidator;