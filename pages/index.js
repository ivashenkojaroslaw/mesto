import Card from '../scripts/Card.js';
import FormValidator from '../scripts/FormValidator.js';

const settings = {  formSelector: '.popup__form',
                    fieldSelector: '.popup__set',
                    inputSelector: '.popup__input',
                    submitButtonSelector: '.popup__button',
                    inactiveButtonClass: 'popup__button_inactive',
                    inputErrorClass: 'popup__input_type_error',
                    errorClass: 'popup__error_active'
                }

const popupEdit = document.querySelector('.popup_edit');
const popupName = popupEdit.querySelector('.popup__input_form_name');
const popupDescribe = popupEdit.querySelector('.popup__input_form_describe');
const closeButtonPopupEdit= popupEdit.querySelector('.popup__close-btn');
const formEdit = document.querySelector('.popup__form_edit');


const popupAdd = document.querySelector('.popup_add');
const popupCardName = popupAdd.querySelector('.popup__input_form_card-name');
const popupCardLink = popupAdd.querySelector('.popup__input_form_card-link');
const closeButtonPopupAdd= popupAdd.querySelector('.popup__close-btn');
const formAdd = document.querySelector('.popup__form_add');

const popupPicture = document.querySelector('.popup-image');
const closeButtonPopupPicture = popupPicture.querySelector('.popup-image__close-btn');

const editButton= document.querySelector('.profile__button_type_edit');
const profileName = document.querySelector('.profile__name');
const profileDescribe = document.querySelector('.profile__describe');

const addButton = document.querySelector('.profile__button_type_add');
const placesSection = document.querySelector('.places');
const popups = document.querySelectorAll('.popup');

function openPopup(popup){
    popup.classList.add('popup_show');
}

function closePopup(popup){
    popup.classList.remove('popup_show'); 
}

function renderCard(data, wrap){
    const cardElement = new Card(data, '#places__card');
    wrap.prepend(cardElement.generateCard());
}

function initValidationForm(){
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    formList.forEach((formElement) => {       
        const validationForm = new FormValidator(settings, formElement);
        validationForm.enableValidation();
    });
}

function initPlaces(){
    initialCards.forEach(item => {
        renderCard(item,placesSection);
    });
}

function clearFormfromErrors(popupElement){
    const formElement = popupElement.querySelector(settings.formSelector);
    const validationForm = new FormValidator(settings, formElement);
    validationForm.clearFormfromErrors();
}

function handleChangeInfo(evt){
    evt.preventDefault();
    profileName.textContent = popupName.value;    
    profileDescribe.textContent = popupDescribe.value;
    closePopup(popupEdit);
}

function handleCreateNewCard(evt){
    evt.preventDefault();    
    renderCard({link:popupCardLink.value,name:popupCardName.value},placesSection)
    formAdd.reset();
    closePopup(popupAdd);
}

function handleClosePopupByEscape(evt){
    const currentOpenedPopup = document.querySelector('.popup_show');
    if (currentOpenedPopup){
        if(evt.key === 'Escape') { 
            closePopup(currentOpenedPopup)
        }
    }
}


document.addEventListener('keydown',handleClosePopupByEscape);

editButton.addEventListener('click',() => {    
    popupName.value = profileName.textContent;
    popupDescribe.value = profileDescribe.textContent;
    openPopup(popupEdit);
    clearFormfromErrors(popupEdit)
    
});

addButton.addEventListener('click',() => {
    openPopup(popupAdd)
    clearFormfromErrors(popupAdd)
});

formEdit.addEventListener('submit', handleChangeInfo);
formAdd.addEventListener('submit', handleCreateNewCard);

closeButtonPopupEdit.addEventListener('click', () => closePopup(popupEdit));
closeButtonPopupAdd.addEventListener('click', () => closePopup(popupAdd));
closeButtonPopupPicture.addEventListener('click', () => closePopup(popupPicture));

popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_show')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close')) {
          closePopup(popup)
        }     
    })
})

initPlaces();
initValidationForm();


